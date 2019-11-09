import {
  INITIALIZE,
  CHANGE_FIELD,
  POSTING,
  POSTING_SUCCESS,
  POSTING_FAILURE,
} from '../actions/write';

const initialState = {
  title: '',
  contents: '',
  hashTags: [],
  result: null,
  postingError: null,
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
    default:
      return state;
  }
};

export default reducer;
