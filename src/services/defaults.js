import fetch from 'isomorphic-unfetch';

const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
const baseUrl = 'http://localhost:8000';

export const get = url => fetch(`${baseUrl}${url}`, { headers }).then(res => res.json());

export const post = (url, data) => fetch(`${baseUrl}${url}`, {
  method: 'post',
  body: JSON.stringify(data),
  headers,
}).then(res => res.json());
