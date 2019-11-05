import { combineReducers } from 'redux';
import auth from './auth';
import toggle from './toggle';
import loading from './loading';

const rootReducer = combineReducers({
  auth,
  toggle,
  loading,
})

export default rootReducer;