import {
  HIDE_MESSAGE,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  SIGNIN_USER,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER,
  SIGNOUT_USER_SUCCESS,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
} from '../constants/auth';

export const userSignUp = user => ({
  type: SIGNUP_USER,
  payload: user,
});

export const userSignIn = user => ({
  type: SIGNIN_USER,
  payload: user,
});

export const userSignOut = () => ({
  type: SIGNOUT_USER,
});

export const userSignUpSuccess = authUser => ({
  type: SIGNUP_USER_SUCCESS,
  payload: authUser,
});

export const userSignInSuccess = authUser => ({
  type: SIGNIN_USER_SUCCESS,
  payload: authUser,
});

export const userSignOutSuccess = () => ({
  type: SIGNOUT_USER_SUCCESS,
});

export const showAuthMessage = message => ({
  type: SHOW_MESSAGE,
  payload: message,
});

export const showAuthLoader = () => ({
  type: ON_SHOW_LOADER,
});

export const hideMessage = () => ({
  type: HIDE_MESSAGE,
});

export const hideAuthLoader = () => ({
  type: ON_HIDE_LOADER,
});
