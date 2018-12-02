import React from 'react';

const paginatedCondition = props => (
  !props.isLoading
  && props.isError
);

const withPaginated = Component => (props) => {
  const { getNewData } = props;
  return (
    <div>
      <Component {...props} />

      <div className="interactions">
        {paginatedCondition(props) && (
        <div>
          <div>
            Something went wrong...
          </div>
          <button
            type="button"
            onClick={getNewData}
          >
            Try Again
          </button>
        </div>
        )}
      </div>
    </div>
  );
};

export default withPaginated;
