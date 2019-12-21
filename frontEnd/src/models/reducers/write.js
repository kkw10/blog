import {
  INITIALIZE,
  CHANGE_FIELD,
  POSTING,
  POSTING_SUCCESS,
  POSTING_FAILURE,
  SET_ORIGINAL_POST,
  SET_ORIGINAL_COMMENT,
  SET_ORIGINAL_PROFILE,
  UPDATE_SUCCESS,
  UPDATE_FAILURE,
  UPLOAD_PORTRAIT_SUCCESS,
  UPLOAD_PORTRAIT_FAILURE,
  CHANGE_SEARCH_TYPE,
} from '../actions/write';

const initialState = {
  title: '',
  contents: '',
  hashTags: [],
  comment: '',
  user_portrait: '',
  user_background: '',
  user_title: '',
  user_description: '',
  user_location: '',
  user_favorite: '',
  user_contact: '',
  search_type: 'tag',
  search_query: '',
  result: null,
  editingPostId: null,
  editingCommentId: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        ...initialState,
        search_type: state.search_type,
        error: state.error,
      };
    case CHANGE_FIELD:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case SET_ORIGINAL_POST:
      return {
        ...state,
        title: action.payload.title,
        contents: action.payload.contents,
        hashTags: action.payload.hashTags,
        editingPostId: action.payload.postId,
      };
    case SET_ORIGINAL_COMMENT:
      return {
        ...state,
        comment: action.payload.contents,
        editingCommentId: action.payload.id,
      };
    case SET_ORIGINAL_PROFILE:
      return {
        ...state,
        user_portrait: action.payload.portrait,
        user_title: action.payload.title,
        user_description: action.payload.descript,
        user_location: action.payload.location,
        user_favorite: action.payload.favorite,
        user_contact: action.payload.contact,
      };
    case CHANGE_SEARCH_TYPE:
      return {
        ...state,
        search_type: action.payload,
      };
    // SUCCESS
    case POSTING:
      return {
        ...state,
        result: null,
        error: null,
      };
    case POSTING_SUCCESS:
    case UPDATE_SUCCESS:
      return {
        ...state,
        result: action.payload,
        error: null,
      };
    case UPLOAD_PORTRAIT_SUCCESS:
      return {
        ...state,
        user_portrait: action.payload,
        error: null,
      };
    // FAILURE
    case POSTING_FAILURE:
      return {
        ...state,
        result: null,
        error: action.payload,
      };
    case UPDATE_FAILURE:
    case UPLOAD_PORTRAIT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
