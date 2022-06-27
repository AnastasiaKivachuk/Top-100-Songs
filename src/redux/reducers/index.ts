import { combineReducers } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';
import user from '@redux/reducers/user';
import songs from './songs';
import errors from './errors';
import loader from './loader';

// export const history = createBrowserHistory();

const reducer = combineReducers({
  user,
  songs,
  errors,
  loader,
  // router: connectRouter(history),
});

export default reducer;
