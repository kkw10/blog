import {
  READ_POSTS_SUCCESS,
  READ_POSTS_FAILURE,
} from '../actions/posts';

const initialState = {
  result: null,
  lastPage: 1,
  postsError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_POSTS_SUCCESS:
      return {
        ...state,
        result: action.payload,
        lastPage: action.meta.headers['last-page'],
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
