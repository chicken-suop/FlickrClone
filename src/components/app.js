import React from 'react';
import { renderRoutes } from 'react-router-config';
import styled from 'styled-components';
import routes from './routes';


const AppContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: #ff7657;
`;

export default () => (
  <AppContainer>
    {renderRoutes(routes)}
  </AppContainer>
);
