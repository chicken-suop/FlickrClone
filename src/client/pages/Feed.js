import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { searchPhotos } from '../helpers/fetch';
import unixTimestampParse from '../helpers/unixTimestampParse';
import SearchBar from '../components/SearchBar';
import LazyLoadedImage from '../components/LazyLoadedImage';
import theme from '../helpers/styledComponentsConfig';

const FeedContainer = styled.div`
  padding: 1.2rem;
  margin-top: 6rem;
`;

const FeedItem = styled.div`
  box-shadow: ${props => props.theme.boxShadow};
  background: #ffba5a;
  padding: 1rem;
  padding-bottom: 0;
  border-radius: 8px;
  margin: 0 auto;
  margin-bottom: 1rem;
`;

FeedItem.defaultProps = { theme: { boxShadow: theme.boxShadow } };

const Footer = styled.div`
  padding: 3rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FooterText = styled.span`
  font-size: ${props => (props.smaller ? '1.3rem' : '1.6rem')};
  color: ${props => props.theme.color};
`;

FooterText.defaultProps = { theme: { color: theme.color } };

export default class Feed extends React.Component {
  fetchData = searchPhotos

  constructor(props) {
    super(props);
    const { preloadedData } = props;
    this.state = { preloadedData };
  }

  componentDidMount() {
    window.addEventListener('lazyload', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('lazyload', this.handleScroll);
  }

  handleScroll = (e) => {
    e.target.parentNode.classList.add('image-loaded');
    e.target.parentNode.classList.remove('loading');
  }

  render() {
    const { preloadedData } = this.state;

    return (
      <FeedContainer>
        <SearchBar onInput={() => {}} />
        {preloadedData.photos.photo.map((photo) => {
          const name = photo.realname || photo.ownername;
          return (
            <FeedItem key={photo.id}>
              <LazyLoadedImage
                urlT={photo.url_t} // 100px
                tHeight={parseInt(photo.height_t, 10)}
                tWidth={parseInt(photo.width_t, 10)}
                urlN={photo.url_n} // 320px
                nHeight={parseInt(photo.height_n, 10)}
                nWidth={parseInt(photo.width_n, 10)}
                urlZ={photo.url_z} // 640px
                zHeight={parseInt(photo.height_z, 10)}
                zWidth={parseInt(photo.width_z, 10)}
                alt={`${photo.title} by ${name}`}
              />
              <Footer>
                <FooterText>{name}</FooterText>
                <FooterText smaller>{unixTimestampParse(photo.dateupload)}</FooterText>
              </Footer>
            </FeedItem>
          );
        })}
      </FeedContainer>
    );
  }
}

Feed.propTypes = {
  preloadedData: PropTypes.shape({}).isRequired,
};
