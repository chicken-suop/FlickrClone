import React from 'react';

const loadingCondition = props => props.isLoading;

const withLoading = Component => props => (
  <div>
    <Component {...props} />
    <div className="interactions">
      {loadingCondition(props) && <span>Loading...</span>}
    </div>
  </div>
);

export default withLoading;
