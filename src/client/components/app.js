import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { matchPath } from 'react-router';
import routes from '../routes';
import { searchPhotos, getDetail } from '../helpers/fetch';
import preloadedDataPropType from '../helpers/preloadedDataPropType';

const Main = styled.div`
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

class AppContainer extends React.Component {
  static propTypes = {
    preloadedData: preloadedDataPropType.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { preloadedData: props.preloadedData };
  }

  // componentWillReceiveProps(nextProps) {
  //
  //   // If we change routes without SSR, clear old data
  //   const { location } = this.props;
  //   if (nextProps.location.pathname !== location.pathname) {
  //     const isFeed = nextProps.location.pathname === '/feed';
  //     const isDetail = !!matchPath(
  //       nextProps.location.pathname,
  //       '/feed/:id',
  //     );
  //
  //     if (isFeed) {
  //       searchPhotos({})
  //         .then(preloadedData => this.setState({ preloadedData }));
  //     } else if (isDetail) {
  //       const id = nextProps.location.pathname.match(/^\/feed\/(\d+)/)[1];
  //       getDetail(id)
  //         .then(preloadedData => this.setState({ preloadedData }));
  //     }
  //   }
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const { preloadedData } = this.state;
  //   return preloadedData.length !== nextState.preloadedData.length;
  // }

  render() {
    const { preloadedData } = this.state;
    const { location } = this.props;

    return (
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
    );
  }
}

const App = ({ preloadedData }) => (
  <Route render={({ location }) => (
    <AppContainer
      preloadedData={preloadedData}
      location={location}
    />
  )}
  />
);

App.propTypes = {
  preloadedData: preloadedDataPropType.isRequired,
};

export default App;
