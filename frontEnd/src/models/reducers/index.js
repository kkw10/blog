import { combineReducers } from 'redux';
import auth from './auth';
import toggle from './toggle';
import loading from './loading';
import user from './user';
import write from './write';

const rootReducer = combineReducers({
  auth,
  toggle,
  loading,
  user,
  write,
})

export default rootReducer;