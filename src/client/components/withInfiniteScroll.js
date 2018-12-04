import React from 'react';

const withInfiniteScroll = Component => (
  class WithInfiniteScroll extends React.Component {
    componentDidMount() {
      // Document and window are undefined in SSR
      this.document = typeof document !== 'undefined' ? document.body : null;
      this.window = typeof window !== 'undefined' ? window : null;

      // Only check every 250ms, instead of on each scroll event
      this.interval = setInterval(this.handleScroll, 250);
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    infiniteScrollCondition = () => {
      const { feedData, isLoading, isError } = this.props;
      const fromBottom = (this.document.scrollHeight - this.document.offsetHeight) - (typeof window !== 'undefined' ? window.scrollTop : 0);
      return (
        (fromBottom <= this.document.offsetHeight * 2)
        && feedData.length
        && !isLoading
        && !isError
      );
    };

    handleScroll = () => {
      // If we're close to the bottom of the page, update feedData
      const { getNewData } = this.props;
      return this.infiniteScrollCondition() && getNewData();
    }

    render() {
      return <Component {...this.props} />;
    }
  }
);

export default withInfiniteScroll;
