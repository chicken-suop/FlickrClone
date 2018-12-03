import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { compose } from 'recompose';
import { searchPhotos } from '../helpers/fetch';
import SearchBar from '../components/SearchBar';
import withInfiniteScroll from '../components/withInfiniteScroll';
import withPaginated from '../components/withPaginated';
import withLoading from '../components/withLoading';
import List from '../components/List';

const searchPhotosDebounced = AwesomeDebouncePromise(searchPhotos, 300);

const ListWithoutInfiniteScroll = compose(
  withPaginated,
  withLoading,
)(List);

const ListWithInfiniteScroll = compose(
  withPaginated,
  withInfiniteScroll,
  withLoading,
)(List);

const FeedContainer = styled.div`
  padding: ${props => props.padding};
  margin-top: ${props => props.topMargin};
`;

export default class Feed extends React.Component {
  static propTypes = {
    preloadedData: PropTypes.shape({}),
    showSearch: PropTypes.bool,
    infiniteScroll: PropTypes.bool,
    shouldClearPreloadedData: PropTypes.bool,
    feedItemBackground: PropTypes.string,
    topMargin: PropTypes.string,
    padding: PropTypes.string,
  }

  static defaultProps = {
    preloadedData: { photo: [] },
    showSearch: true,
    infiniteScroll: true,
    shouldClearPreloadedData: true,
    feedItemBackground: '#ffba5a',
    topMargin: '6rem',
    padding: '1.2rem',
  }

  constructor(props) {
    super(props);
    const { preloadedData } = props;
    this.state = {
      feedData: preloadedData.photo,
      page: 1,
      isLoading: false,
      isError: false,
    };
  }

  handleTextChange = async (text) => {
    this.prevText = text;
    this.setState({ isLoading: true });
    searchPhotosDebounced({ text, page: 1 })
      .then(result => this.setResult(result.photo, 1))
      .catch(this.setError);
  }

  getNewData = () => {
    const { page } = this.state;
    this.fetchPhotos(this.prevText, page + 1);
  }

  fetchPhotos = (text, page) => {
    this.setState({ isLoading: true });
    searchPhotos({ text, page })
      .then(result => this.setResult(result.photo, page))
      .catch(this.setError);
  }

  filterFeed = async ({
    text,
    userId,
    filter,
    isBad,
  }) => {
    this.setState({ isLoading: true });
    const sameTitle = await searchPhotos({ text, userId })
      .then(result => result.photo.filter(filter))
      .catch(this.setError);

    if (isBad(sameTitle, text)) {
      const allUserPhotos = await searchPhotos({ text: '', userId })
        .then(result => result.photo.filter(filter))
        .catch(this.setError);

      this.setResult(allUserPhotos, 1);
    } else {
      this.setResult(sameTitle, 1);
    }
  }

  setResult = (result, page) => (
    page === 1
      ? this.setState(() => ({
        feedData: result,
        page,
        isError: false,
        isLoading: false,
      }))
      : this.setState(prevState => ({
        feedData: [...prevState.feedData, ...result],
        page,
        isError: false,
        isLoading: false,
      }))
  )

  setError = () => this.setState({
    isError: true,
    isLoading: false,
  });

  render() {
    const {
      feedItemBackground,
      topMargin,
      padding,
      showSearch,
      infiniteScroll,
      shouldClearPreloadedData,
    } = this.props;
    const {
      feedData,
      isError,
      isLoading,
    } = this.state;

    return (
      <FeedContainer topMargin={topMargin} padding={padding}>
        {showSearch && (
          <SearchBar onInput={this.handleTextChange} />
        )}
        {infiniteScroll ? (
          <ListWithInfiniteScroll
            feedData={feedData}
            feedItemBackground={feedItemBackground}
            isError={isError}
            isLoading={isLoading}
            getNewData={this.getNewData}
            shouldClearPreloadedData={shouldClearPreloadedData}
          />
        ) : (
          <ListWithoutInfiniteScroll
            feedData={feedData}
            feedItemBackground={feedItemBackground}
            isError={isError}
            isLoading={isLoading}
            shouldClearPreloadedData={shouldClearPreloadedData}
          />
        )}
      </FeedContainer>
    );
  }
}
