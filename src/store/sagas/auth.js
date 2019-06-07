import {
  all, fork, put, takeEvery,
} from 'redux-saga/effects';
import { polyfill } from 'es6-promise';

import * as authService from '../../services/auth';

import { SIGNIN_USER, SIGNOUT_USER } from '../constants/auth';
import {
  userSignInSuccess, userSignOutSuccess, hideAuthLoader, showAuthLoader,
} from '../actions/auth';

polyfill();

function* getUserContext() {
  const result = yield authService.userContext();
  yield put(userSignInSuccess(result));
}

function* signInUser({ payload }) {
  try {
    yield put(showAuthLoader());
    const result = yield authService.signIn(payload);
    yield put(userSignInSuccess(result));
  } catch (error) {
    yield put(hideAuthLoader());
  }
}

function* signOutUser() {
  try {
    yield put(showAuthLoader());
    const result = yield authService.signOutMe();
    yield put(userSignOutSuccess(result));
  } catch (error) {
    yield put(hideAuthLoader());
  }
}

export function* signIn() {
  yield takeEvery(SIGNIN_USER, signInUser);
}

export function* signOut() {
  yield takeEvery(SIGNOUT_USER, signOutUser);
}

export default function* saga() {
  yield all([
    fork(signIn),
    fork(signOut),
    getUserContext(),
  ]);
}
