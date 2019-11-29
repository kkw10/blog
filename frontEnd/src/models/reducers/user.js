import {
  TEMP_SET_USER,
  CHECK_SUCCESS,
  CHECK_FAILURE,
  LOGOUT,
  UPLOAD_PROFILE_SUCCESS,
  UPLOAD_PROFILE_FAILURE,
} from '../actions/user';

const initialState = {
  user: null,
  profile: null,
  checkError: null,
  profileError: null,
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
        user: action.payload.user,
        profile: action.payload.profile,
        checkError: null,
      };
    case CHECK_FAILURE:
      return {
        ...state,
        user: null,
        checkError: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    case UPLOAD_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        profileError: null,
      };
    case UPLOAD_PROFILE_FAILURE:
      return {
        ...state,
        profileError: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
