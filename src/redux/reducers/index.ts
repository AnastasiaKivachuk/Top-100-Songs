import { combineReducers } from 'redux';
import { routerReducer } from 'connected-next-router';
import userReducer from '@redux/reducers/userReducer';
import songsReducer from './songsReducer';
import errorsReducer from './errorsReducer';
import loaderReducer from './loaderReducer';

const reducer = combineReducers({
  userReducer,
  songsReducer,
  errorsReducer,
  loaderReducer,
  router: routerReducer,
});

export default reducer;
