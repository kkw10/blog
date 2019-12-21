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
  UNFOLLOW_FROM_LIST_SUCCESS,
  UNFOLLOW_FROM_LIST_FAILURE,
  READ_FOLLOW_LIST_SUCCESS,
  READ_FOLLOW_LIST_FAILURE,
  CLEAR_FOLLOW_LIST,
} from '../actions/user';

const initialState = {
  user: null,
  profile: null,
  stranger: null,
  FollowersList: [],
  FollowingsList: [],
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // ETC
    case TEMP_SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...initialState,
      };
    case RESET_STRANGER_PROFILE:
      return {
        ...state,
        stranger: null,
      };
    case CLEAR_FOLLOW_LIST:
      return {
        ...state,
        FollowersList: [],
        FollowingsList: [],
      };
    // SUCCESS
    case CHECK_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        profile: action.payload.profile,
        error: null,
      };
    case GET_TARGET_PROFILE_SUCCESS:
      return {
        ...state,
        stranger: action.payload,
        error: null,
      };
    case UPLOAD_PROFILE_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.payload,
        },
        error: null,
      };
    case READ_FOLLOW_LIST_SUCCESS: {
      let targetList = '';
      if (action.payload.type === 'followers') {
        targetList = 'FollowersList';
      } else {
        targetList = 'FollowingsList';
      }
      return {
        ...state,
        [targetList]: action.payload.list,
        error: null,
      };
    }
    case FOLLOW_SUCCESS: { // follow, unfollow => usercard
      let newCounts = state.profile.followings;
      if (action.payload.type === 'follow') {
        newCounts = (newCounts || 0) + 1;
      } else {
        newCounts = (newCounts || 0) - 1;
      }
      return {
        ...state,
        profile: {
          ...state.profile,
          followings: newCounts,
        },
        stranger: {
          ...state.stranger,
          followers: action.payload.targetUser.followers,
          isFollowed: action.payload.targetUser.isFollowed,
        },
        error: null,
      };
    }
    case UNFOLLOW_FROM_LIST_SUCCESS: { // unfonllow, unfollowing => profilePage array list
      let newList = [];
      let target = '';
      let targetList = '';

      if (action.payload.type === 'unfollow') {
        newList = [...state.FollowingsList];
        target = 'followings';
        targetList = 'FollowingsList';
      } else {
        newList = [...state.FollowersList];
        target = 'followers';
        targetList = 'FollowersList';
      }
      newList = newList.filter((user) => {
        return user.id !== action.payload.targetUser.id;
      });

      return {
        ...state,
        profile: {
          ...state.profile,
          [target]: (state.profile[target] || 0) - 1,
        },
        [targetList]: newList,
        error: null,
      };
    }
    // FAIURE
    case CHECK_FAILURE:
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    case UPLOAD_PROFILE_FAILURE:
    case GET_TARGET_PROFILE_FAILURE:
    case FOLLOW_FAILURE:
    case UNFOLLOW_FROM_LIST_FAILURE:
    case READ_FOLLOW_LIST_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
