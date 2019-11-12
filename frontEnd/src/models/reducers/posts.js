import {
  READ_POSTS_SUCCESS,
  READ_POSTS_FAILURE,
} from '../actions/posts';

const initialState = {
  result: null,
  postsError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_POSTS_SUCCESS:
      return {
        ...state,
        result: action.payload,
        postsError: null,
      };
    case READ_POSTS_FAILURE:
      return {
        ...state,
        result: null,
        postsError: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
