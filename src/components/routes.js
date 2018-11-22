import Feed from './pages/Feed';
import Detail from './pages/Detail';
import FourOhFour from './pages/FourOhFour';

export default [
  {
    path: '/feed',
    exact: true,
    component: Feed,
  },
  {
    path: '/feed/:id',
    exact: true,
    component: Detail,
  },
  {
    component: FourOhFour,
  },
];
