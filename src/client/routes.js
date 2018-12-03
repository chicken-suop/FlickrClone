import Feed from './pages/Feed';
import Detail from './pages/Detail';
import FourOhFour from './pages/FourOhFour';
import { searchPhotos, getDetail } from './helpers/fetch';

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
    fetchData: params => getDetail(parseInt(params[0].split('feed/')[1], 10)),
  },
  {
    id: 2,
    component: FourOhFour,
  },
];
