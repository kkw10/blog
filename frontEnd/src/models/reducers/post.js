import {
  READ_POST,
  READ_POST_SUCCESS,
  READ_POST_FAILURE,
  READ_COMMENTS_SUCCESS,
  READ_COMMENTS_FAILURE,
  CLEAR_FORM,
  THUMBS_UP_SUCCESS,
  THUMBS_UP_FAILURE,
  THUMBS_DOWN_SUCCESS,
  THUMBS_DOWN_FAILURE,
} from '../actions/post';

const initialState = {
  postResult: null,
  commentsResult: null,
  postError: null,
  commentError: null,
  thumbsError: null,
  clearedForm: false,
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
        postResult: action.payload.post,
        commentsResult: action.payload.comments,
        postError: null,
      };
    case READ_POST_FAILURE:
      return {
        ...state,
        postResult: null,
        commentsResult: null,
        postError: action.payload,
      };
    case READ_COMMENTS_SUCCESS:
      return {
        ...state,
        commentsResult: action.payload,
        commentError: null,
      };
    case READ_COMMENTS_FAILURE:
      return {
        ...state,
        commentsResult: null,
        commentError: action.payload,
      };
    case CLEAR_FORM:
      return {
        ...state,
        clearedForm: !state.clearedForm,
      };
    case THUMBS_UP_SUCCESS: {
      const newResult = [
        ...state.commentsResult,
      ];
      const targetIndex = state.commentsResult.findIndex((v) => (
        v.id === action.payload.id
      ));

      newResult[targetIndex] = action.payload;

      return {
        ...state,
        commentsResult: newResult,
        thumbsError: null,
      };
    }
    case THUMBS_DOWN_SUCCESS: {
      const newResult = [
        ...state.commentsResult,
      ];
      const targetIndex = state.commentsResult.findIndex((v) => (
        v.id === action.payload.id
      ));

      newResult[targetIndex] = action.payload;

      return {
        ...state,
        commentsResult: newResult,
        thumbsError: null,
      };
    }
    case THUMBS_UP_FAILURE:
      return {
        ...state,
        thumbsError: action.payload,
      };
    case THUMBS_DOWN_FAILURE:
      return {
        ...state,
        thumbsError: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
