import {
  TOGGLING,
  STRICT_TOGGLING,
  CLEAR_TOGGLE,
  OVERLAY_TOGGLE,
} from '../actions/toggle';

const initialState = {
  activeToggle: null,
  activeStricToggle: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLING: {
      let newState = action.payload;
      const prevState = state.activeToggle;

      if (newState === prevState) {
        newState = null;
      }

      return {
        ...state,
        activeToggle: newState,
      };
    }
    case STRICT_TOGGLING: {
      let newState = action.payload;
      const prevState = state.activeStrictToggle;

      if (newState === prevState) {
        newState = null;
      }

      return {
        ...state,
        activeStrictToggle: newState,
      };
    }
    case CLEAR_TOGGLE:
      return {
        activeToggle: null,
        activeStricToggle: null,
      };
    case OVERLAY_TOGGLE:
      return {
        ...state,
        activeToggle: null,
      };
    default:
      return state;
  }
}

export default reducer;