import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import routes from '../routes';

const AppContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: #ff7657;
  font-family: 'Source Sans Pro', sans-serif;
  overflow-y: auto;
  min-height: 0px;

  a {
    color: inherit;
    cursor: pointer;
    text-decoration: inherit;
  }

  .fade-enter {
    opacity: 0.01;
  }
  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 300ms ease-in;
  }
  .fade-exit {
    opacity: 1;
  }
  .fade-exit.fade-exit-active {
    opacity: 0.01;
    transition: opacity 300ms ease-in;
  }
`;

const App = ({ preloadedData }) => (
  <>
    <Route
      render={({ location }) => (
        <AppContainer>
          <Switch location={location}>
            {routes.map(route => (
              <Route
                key={route.id}
                path={route.path}
                component={props => (
                  <route.component
                    preloadedData={preloadedData}
                    {...props}
                  />
                )}
                exact
              />
            ))}
          </Switch>
        </AppContainer>
      )
      }
    />
  </>
);

App.propTypes = {
  preloadedData: PropTypes.shape({}).isRequired,
};

export default App;
