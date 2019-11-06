import { combineReducers } from 'redux';
import auth from './auth';
import toggle from './toggle';
import loading from './loading';
import user from './user';

const rootReducer = combineReducers({
  auth,
  toggle,
  loading,
  user,
})

export default rootReducer;