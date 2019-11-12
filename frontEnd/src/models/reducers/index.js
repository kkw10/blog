import { combineReducers } from 'redux';
import auth from './auth';
import toggle from './toggle';
import loading from './loading';
import user from './user';
import write from './write';
import post from './post';
import posts from './posts';

const rootReducer = combineReducers({
  auth,
  toggle,
  loading,
  user,
  write,
  post,
  posts,
});

export default rootReducer;
