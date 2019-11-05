import {
  CHANGE_FIELD,
  INITIALIZE_FORM,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from '../actions/auth';

const initialState = {
  register: {
    email: '',
    nickname: '',
    password: '',
    passwordConfirm: ''
  },
  login: {
    email: '',
    password: ''
  },
  result: null,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_FIELD: 
      return {
        ...state,
        [action.payload.form]: {
          ...state[action.payload.form],
          [action.payload.key]: action.payload.value
        }
      }
    case INITIALIZE_FORM:
      return {
        ...state,
        [action.payload.form]: initialState[action.payload.form]
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        result: action.payload,
        error: null
      }
    case REGISTER_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}

export default reducer;