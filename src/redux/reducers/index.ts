import { combineReducers } from 'redux';
import { routerReducer } from 'connected-next-router';
import user from './user';
import songs from './songs';

const reducer = combineReducers({
  user,
  songs,
  router: routerReducer,
});

export default reducer;
