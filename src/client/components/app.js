import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import routes from '../routes';
import preloadedDataPropType from '../helpers/preloadedDataPropType';

const Main = styled.div`
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
  <Route render={({ location }) => (
    <Main>
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
    </Main>
  )}
  />
);

App.propTypes = {
  preloadedData: preloadedDataPropType.isRequired,
};

export default App;
