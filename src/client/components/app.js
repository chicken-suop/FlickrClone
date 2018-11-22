import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import styled from 'styled-components';
import routes from '../routes';

const AppContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: #ff7657;
`;

const App = ({ preloadedData }) => (
  <AppContainer>
    {renderRoutes(routes, { preloadedData })}
  </AppContainer>
);

App.propTypes = {
  preloadedData: PropTypes.shape({}).isRequired,
};

export default App;
