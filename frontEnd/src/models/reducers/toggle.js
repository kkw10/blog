import {
  TOGGLING,
  CLEAR_TOGGLE,
} from '../actions/toggle';

const reducer = (state = {}, action) => {
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
    case CLEAR_TOGGLE:
      return {};
    default:
      return state;
  }
}

export default reducer;