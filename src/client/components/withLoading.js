import React from 'react';

const withLoading = Component => props => (
  <div>
    <Component {...props} />
    <div className="interactions">
      {props.isLoading && <span>Loading...</span>}
    </div>
  </div>
);

export default withLoading;
