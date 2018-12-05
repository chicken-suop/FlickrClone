import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { compose } from 'recompose';
import { searchPhotos } from '../helpers/fetch';
import SearchBar from '../components/SearchBar';
import WithInfiniteScroll from '../components/WithInfiniteScroll';
import WithPaginated from '../components/WithPaginated';
import WithLoading from '../components/WithLoading';
import List from '../components/List';
import FiltersOverlay from '../components/FiltersOverlay';
import FiltersButton from '../components/FiltersButton';

const searchPhotosDebounced = AwesomeDebouncePromise(searchPhotos, 300);

const ListWithoutInfiniteScroll = compose(
  WithPaginated,
  WithLoading,
)(List);

const ListWithInfiniteScroll = compose(
  WithPaginated,
  WithInfiniteScroll,
  WithLoading,
)(List);

const FeedContainer = styled.div`
  padding: ${props => props.padding};
  padding-top: ${props => props.topPadding};
`;

export default class Feed extends React.Component {
  static propTypes = {
    preloadedData: PropTypes.shape({}),
    showSearch: PropTypes.bool,
    infiniteScroll: PropTypes.bool,
    shouldClearPreloadedData: PropTypes.bool,
    feedItemBackground: PropTypes.string,
    topPadding: PropTypes.string,
    padding: PropTypes.string,
  }

  static defaultProps = {
    preloadedData: { photo: [] },
    showSearch: true,
    infiniteScroll: true,
    shouldClearPreloadedData: true,
    feedItemBackground: '#ffba5a',
    topPadding: '7.2rem',
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
      showingFiltersOverlay: false,
    };
    this.filters = {};
    this.filtersOverlay = React.createRef();
    this.searchBar = React.createRef();
  }

  componentDidMount() {
    // Set background color
    document.body.style.background = '#ff7657';
  }

  handleTextChange = async (text) => {
    this.prevText = text;
    this.setState({ isLoading: true });
    searchPhotosDebounced({ text, page: 1, ...this.filters })
      .then(result => this.setResult(result.photo, 1))
      .catch(this.setError);
  }

  getNewData = () => {
    const { page } = this.state;
    this.fetchPhotos(this.prevText, page + 1);
  }

  clearFilters = () => {
    this.filters = {};
    this.filtersOverlay.current.clearFilters();
    this.fetchPhotos('', 1);
  }

  fetchPhotos = (text, page) => {
    this.setState({ isLoading: true });
    searchPhotos({ text, page, ...this.filters })
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

  toggleFiltersOverlay = () => {
    this.setState(prevState => ({ showingFiltersOverlay: !prevState.showingFiltersOverlay }));
  };

  render() {
    const {
      feedItemBackground,
      topPadding,
      padding,
      showSearch,
      infiniteScroll,
      shouldClearPreloadedData,
    } = this.props;
    const {
      feedData,
      isError,
      isLoading,
      showingFiltersOverlay,
    } = this.state;

    return (
      <>
        <FiltersButton
          handleClick={this.toggleFiltersOverlay}
          move={showingFiltersOverlay}
        />
        <FiltersOverlay
          ref={this.filtersOverlay}
          showing={showingFiltersOverlay}
          handleClose={this.hideFiltersOverlay}
          handleNewFilters={(filters) => {
            this.filters = filters;
            this.fetchPhotos(this.prevText, 1);
          }}
        />
        <FeedContainer topPadding={topPadding} padding={padding}>
          {(showSearch || showingFiltersOverlay) && (
            <SearchBar ref={this.searchBar} onInput={this.handleTextChange} />
          )}
          {infiniteScroll ? (
            <ListWithInfiniteScroll
              feedData={feedData}
              feedItemBackground={feedItemBackground}
              isError={isError}
              isLoading={isLoading}
              getNewData={this.getNewData}
              clearFilters={this.clearFilters}
              shouldClearPreloadedData={shouldClearPreloadedData}
            />
          ) : (
            <ListWithoutInfiniteScroll
              feedData={feedData}
              feedItemBackground={feedItemBackground}
              isError={isError}
              isLoading={isLoading}
              shouldClearPreloadedData={shouldClearPreloadedData}
              clearFilters={this.clearFilters}
            />
          )}
        </FeedContainer>
      </>
    );
  }
}
