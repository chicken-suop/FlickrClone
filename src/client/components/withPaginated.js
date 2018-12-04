import React from 'react';
import styled from 'styled-components';
import theme from '../helpers/styledComponentsConfig';

const paginatedCondition = props => (
  (
    !props.isLoading
    && props.isError
  ) || (
    !props.isLoading
    && !props.isError
    && props.feedData.length === 0
  )
);

const ErrorText = styled.p`
  font-size: 9rem;
  font-weight: 600;
  margin: 1rem;
  color: ${theme.color};
`;

const LinkText = styled.u`
  font-size: 1.8rem;
  color: ${theme.whiteColor};
`;

const withPaginated = Component => (props) => {
  const { clearFilters } = props;
  return (
    <div>
      <Component {...props} />
      {paginatedCondition(props) && (
        <>
          <ErrorText>
            Diddly squat.
          </ErrorText>
          <button
            type="button"
            onClick={clearFilters}
          >
            <LinkText>
              Clear filters?
            </LinkText>
          </button>
        </>
      )}
    </div>
  );
};

export default withPaginated;
