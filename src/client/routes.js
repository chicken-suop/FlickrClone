import Feed from './pages/Feed';
import Detail from './pages/Detail';
import FourOhFour from './pages/FourOhFour';
import { searchPhotos, getContext } from './helpers/fetch';

export default [
  {
    id: 0,
    path: '/feed',
    exact: true,
    component: Feed,
    fetchData: searchPhotos,
  },
  {
    id: 1,
    path: '/feed/:id',
    exact: true,
    component: Detail,
    fetchData: params => getContext(params.id),
  },
  {
    id: 2,
    component: FourOhFour,
  },
];
