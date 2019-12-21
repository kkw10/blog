import {
  READ_POSTS_SUCCESS,
  READ_POSTS_FAILURE,
  CLEAR_POSTS,
} from '../actions/posts';

const initialState = {
  result: null,
  lastPage: 1,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_POSTS:
      return {
        ...initialState,
      };
    case READ_POSTS_SUCCESS:
      return {
        ...state,
        result: action.payload,
        lastPage: action.meta.headers['last-page'],
        error: null,
      };
    case READ_POSTS_FAILURE:
      return {
        ...state,
        result: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
