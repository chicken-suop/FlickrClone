import React from 'react';
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
    // Unfound id's will be handled in Detail component (404 for example)
    const flickrPhotoId = pathname.match(/[^/]+\/([0-9]+)/);
    Handler = () => <Detail id={flickrPhotoId} />;
  }

  return <Handler />;
};

export default App;
