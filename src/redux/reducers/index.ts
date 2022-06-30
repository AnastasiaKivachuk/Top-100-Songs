import { combineReducers } from 'redux';
import { routerReducer } from 'connected-next-router';
import user from '@redux/reducers/user';
import songs from './songs';
import errors from './errors';
import loader from './loader';

const reducer = combineReducers({
  user,
  songs,
  errors,
  loader,
  router: routerReducer,
});

export default reducer;
