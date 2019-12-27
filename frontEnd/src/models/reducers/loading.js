import {
  START_LOADING,
  FINISH_LOADING,
  CLEAR_LOADING,
} from '../actions/loading';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        [action.payload]: true,
      };
    case FINISH_LOADING:
      return {
        ...state,
        [action.payload]: false,
      };
    case CLEAR_LOADING:
      return {};
    default:
      return state;
  }
};

export default reducer;