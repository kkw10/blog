import {
  TOGGLING
} from '../actions/toggle';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case TOGGLING:
      let prevState = state.activeToggle;
      prevState ? prevState = "" : prevState = action.payload  

      return {
        ...state,
        activeToggle: prevState
      }
    default:
      return state; 
  }
}

export default reducer;