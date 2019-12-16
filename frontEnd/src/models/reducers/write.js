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
  COMMENTING_SUCCESS,
  COMMENTING_FAILURE,
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
  postingError: null,
  commentingError: null,
  editingPostId: null,
  editingCommentId: null,
  userProfileError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        ...initialState,
        search_type: state.search_type,
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
        result: action.payload,
        commentingError: null,
      };
    case COMMENTING_FAILURE:
      return {
        ...state,
        result: null,
        commentingError: action.payload,
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        result: action.payload,
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
      }
    case UPLOAD_PORTRAIT_SUCCESS:
      return {
        ...state,
        user_portrait: action.payload,
        userProfileError: null,
      };
    case UPLOAD_PORTRAIT_FAILURE:
      return {
        ...state,
        userProfileError: action.payload,
      };
    case CHANGE_SEARCH_TYPE:
      return {
        ...state,
        search_type: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
