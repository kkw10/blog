import {
  INITIALIZE,
  CHANGE_FIELD,
  POSTING,
  POSTING_SUCCESS,
  POSTING_FAILURE,
  SET_ORIGINAL_POST,
  UPDATE_SUCCESS,
  UPDATE_FAILURE,
  COMMENTING_SUCCESS,
  COMMENTING_FAILURE,
} from '../actions/write';

const initialState = {
  title: '',
  contents: '',
  hashTags: [],
  comment: '',
  result: null,
  postingError: null,
  editingPostId: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        ...initialState,
      };
    case CHANGE_FIELD:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case POSTING:
      return {
        ...state,
        result: null,
        postingError: null,
      };
    case POSTING_SUCCESS:
      return {
        ...state,
        result: action.payload,
        postingError: null,
      };
    case POSTING_FAILURE:
      return {
        ...state,
        result: null,
        postingError: action.payload,
      };
    case COMMENTING_SUCCESS:
      return {
        ...state,
      };
    case COMMENTING_FAILURE:
      return {
        ...state,
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        postingError: null,
      };
    case UPDATE_FAILURE:
      return {
        ...state,
        postingError: action.payload,
      };
    case SET_ORIGINAL_POST:
      return {
        ...state,
        title: action.payload.title,
        contents: action.payload.contents,
        hashTags: action.payload.hashTags,
        editingPostId: action.payload.postId,
      };
    default:
      return state;
  }
};

export default reducer;
