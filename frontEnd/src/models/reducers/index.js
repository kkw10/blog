import { combineReducers } from 'redux';
import auth from './auth';
import toggle from './toggle';

const rootReducer = combineReducers({
  auth,
  toggle
})

export default rootReducer;