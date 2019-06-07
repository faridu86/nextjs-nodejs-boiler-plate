import {
  get, post,
} from './defaults';

export const signIn = ({ username, password }) => post('/api/login', { username, password });

export const userContext = () => get('/api/user-context');

export const signOutMe = () => post('/api/logout', {});
