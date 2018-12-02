import PropTypes from 'prop-types';

const preloadedDataPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.arrayOf(PropTypes.shape({})),
  ])),
  PropTypes.arrayOf(PropTypes.shape({})),
]);

export default preloadedDataPropType;
