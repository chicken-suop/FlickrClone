import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

const Detail = ({ match }) => (
  <div>
    <h1>
      {`Detail ${match.params.id}`}
    </h1>
  </div>
);

Detail.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default Detail;
