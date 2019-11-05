import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../actions/loading';

export const createRequestActionTypes = (type) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function*(action) {
    yield put(startLoading(type));

    try {
      const res = yield call(request, action.payload);
      console.log(res);
      yield put({
        type: SUCCESS,
        payload: res.data,
      })

    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        isError: true
      })
    }

    yield put(finishLoading(type));
  }
}