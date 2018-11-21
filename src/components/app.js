import React from 'react';
import PropTypes from 'prop-types';
import Feed from './pages/Feed';
import Detail from './pages/Detail';

const App = () => {
  let Handler;
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  if (pathname === '/') {
    // '/' – Feed list
    Handler = Feed;
  } else {
    // '/:id' – Feed detail
    // Very basic, so '/[anything]/[more]' will also work
    const flickrPhotoId = pathname.match(/[^\/]+\/([0-9]+)/);
    Handler = () => <Detail id={flickrPhotoId} />;
  };

  return <Handler />;
};

export default App;
