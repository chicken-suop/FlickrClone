import React from 'react';
import PropTypes from 'prop-types';
import Feed from './pages/Feed';
import Detail from './pages/Detail';
import FourOhFour from './pages/FourOhFour';

const PAGES = {
  '/': Feed,
  '/:id': Detail,
};

const App = ({ pathname }) => {
  const Handler = PAGES[pathname] || FourOhFour;

  return <Handler />;
};

App.propTypes = {
  pathname: PropTypes.oneOf(Object.keys(PAGES)).isRequired,
};

export default App;
