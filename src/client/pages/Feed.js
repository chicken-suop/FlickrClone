import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { searchPhotos } from '../helpers/fetch';

const FeedContainer = styled.div`
  flex: 1
`;

export default class Feed extends React.Component {
  fetchData = searchPhotos

  constructor(props) {
    super(props);
    const { preloadedData } = props;
    this.state = { preloadedData };
  }

  render() {
    const { preloadedData } = this.state;

    return (
      <FeedContainer>
        {preloadedData.photos.photo.map(photo => (
          <h2 key={photo.id}>{photo.id}</h2>
        ))}
      </FeedContainer>
    );
  }
}

Feed.propTypes = {
  preloadedData: PropTypes.shape({}).isRequired,
};
