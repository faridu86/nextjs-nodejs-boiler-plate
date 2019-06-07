import { all } from 'redux-saga/effects';
import 'isomorphic-unfetch';
import authSaga from './auth';

function* rootSaga() {
  yield all([authSaga()]);
}

export default rootSaga;
