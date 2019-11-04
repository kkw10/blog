import {
  TEST
} from '../actions/auth';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TEST:
      return {
        ...state
      } 
    default:
      return state;
  }
}

export default reducer;