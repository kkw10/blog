import {
  INITIALIZE,
  CHANGE_FIELD,
} from '../actions/write';

const initialState = {
  title: '',
  contents: '',
  hashTags: [],
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
    default:
      return state;
  }
};

export default reducer;
