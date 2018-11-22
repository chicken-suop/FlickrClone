import Feed from './pages/Feed';
import Detail from './pages/Detail';
import FourOhFour from './pages/FourOhFour';
import { searchPhotos, getContext } from './helpers/fetch';

export default [
  {
    path: '/feed',
    exact: true,
    component: Feed,
    fetchData: searchPhotos,
  },
  {
    path: '/feed/:id',
    exact: true,
    component: Detail,
    fetchData: params => getContext(params.id),
  },
  {
    component: FourOhFour,
  },
];
