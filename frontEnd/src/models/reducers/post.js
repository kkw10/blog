import {
  READ_POST,
  READ_POST_SUCCESS,
  READ_POST_FAILURE,
} from '../actions/post';

const initialState = {
  result: null,
  postError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_POST:
      return {
        ...initialState,
      };
    case READ_POST_SUCCESS:
      return {
        ...state,
        result: action.payload,
        postError: null,
      };
    case READ_POST_FAILURE:
      return {
        ...state,
        result: null,
        postError: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
