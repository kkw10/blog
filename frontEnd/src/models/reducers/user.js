import {
  TEMP_SET_USER,
  CHECK_SUCCESS,
  CHECK_FAILURE,
} from '../actions/user';

const initialState = {
  user: null,
  checkError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TEMP_SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case CHECK_SUCCESS:
      return {
        ...state,
        user: action.payload,
        checkError: null,
      };
    case CHECK_FAILURE:
      return {
        ...state,
        user: null,
        checkError: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
