import { createRequestActionTypes } from '../sagas/createRequestSaga';

export const INITIALIZE = 'write/INITIALIZE';
export const CHANGE_FIELD = 'write/CHANGE_FIELD';

export const initialize = () => ({
  type: INITIALIZE,
});

export const changeField = ({ key, value }) => ({
  type: CHANGE_FIELD,
  payload: {
    key,
    value,
  },
});
