import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import unixTimestampParse from '../helpers/unixTimestampParse';
import LazyLoadedImage from './LazyLoadedImage';
import theme from '../helpers/styledComponentsConfig';

const FeedItem = styled.div`
  box-shadow: ${theme.boxShadow};
  background: ${props => props.feedItemBackground};
  padding: 1rem;
  padding-bottom: 0;
  border-radius: 8px;
  margin: 0 auto;
  margin-bottom: 1rem;
`;

const Footer = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FooterText = styled.span`
  font-size: ${props => (props.smaller ? '1.3rem' : '1.6rem')};
  color: ${theme.color};
`;

const ErrorText = styled.p`
  font-size: 9rem;
  font-weight: 600;
  margin: 1rem;
  color: ${theme.color};
`;

const LinkText = styled.u`
  font-size: 1.8rem;
  color: ${theme.whiteColor};
`;

const propsToCheck = [
  'url_t',
  'height_t',
  'width_t',
  'url_n',
  'height_n',
  'width_n',
  'url_o',
  'height_o',
  'width_o',
  'title',
];

const hasAllProps = photo => (
  propsToCheck.every(prop => (
    Object.prototype.hasOwnProperty.call(photo, prop)
  ))
);

const List = ({ feedData, feedItemBackground }) => {
  const data = feedData.filter(hasAllProps);
  return (
    data.length
      ? data.map((photo) => {
        const name = photo.realname || photo.ownername;
        return (
          <Link to={`/feed/${photo.id}`} key={photo.id}>
            <FeedItem feedItemBackground={feedItemBackground}>
              <LazyLoadedImage
                urlT={photo.url_t} // 100px
                tHeight={parseInt(photo.height_t, 10)}
                tWidth={parseInt(photo.width_t, 10)}
                urlN={photo.url_n} // 320px
                nHeight={parseInt(photo.height_n, 10)}
                nWidth={parseInt(photo.width_n, 10)}
                urlO={photo.url_o} // 640px
                oHeight={parseInt(photo.height_o, 10)}
                oWidth={parseInt(photo.width_o, 10)}
                alt={`${photo.title} by ${name}`}
              />
              <Footer>
                <FooterText>{name}</FooterText>
                <FooterText smaller>{unixTimestampParse(photo.dateupload)}</FooterText>
              </Footer>
            </FeedItem>
          </Link>
        );
      })
      : [
        <ErrorText>
          Diddly squat.
        </ErrorText>,
        <LinkText>
          Clear filters?
        </LinkText>,
      ]
  );
};

export default List;
