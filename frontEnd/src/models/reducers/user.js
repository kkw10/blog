import {
  TEMP_SET_USER,
  CHECK_SUCCESS,
  CHECK_FAILURE,
  LOGOUT,
  UPLOAD_PROFILE_SUCCESS,
  UPLOAD_PROFILE_FAILURE,
  GET_TARGET_PROFILE_SUCCESS,
  GET_TARGET_PROFILE_FAILURE,
  RESET_STRANGER_PROFILE,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
} from '../actions/user';

const initialState = {
  user: null,
  profile: null,
  stranger: null,
  checkError: null,
  profileError: null,
  followError: null,
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
        profile: {
          ...state.profile,
          ...action.payload,
        },
        profileError: null,
      };
    case UPLOAD_PROFILE_FAILURE:
      return {
        ...state,
        profileError: action.payload,
      };
    case GET_TARGET_PROFILE_SUCCESS:
      return {
        ...state,
        stranger: action.payload,
        profileError: null,
      };
    case GET_TARGET_PROFILE_FAILURE:
      return {
        ...state,
        profileError: action.payload,
      };
    case RESET_STRANGER_PROFILE:
      return {
        ...state,
        stranger: null,
      };
    case FOLLOW_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          Followings: [
            ...state.profile.Followings,
            action.payload.targetUser,
          ],
        },
        stranger: {
          ...state.stranger,
          Followers: [
            ...state.stranger.Followers,
            action.payload.me,
          ],
        },
      };
    case UNFOLLOW_SUCCESS: {
      const newFollowings = [...state.profile.Followings]
        .filter((v) => v.id !== action.payload.targetUser.id);
      const newStrangerFollowers = [...state.stranger.Followers]
        .filter((v) => v.id !== action.payload.me.id);

      return {
        ...state,
        profile: {
          ...state.profile,
          Followings: newFollowings,
        },
        stranger: {
          ...state.stranger,
          Followers: newStrangerFollowers,
        },
      };
    }
    case FOLLOW_FAILURE:
    case UNFOLLOW_FAILURE:
      return {
        ...state,
        followError: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
