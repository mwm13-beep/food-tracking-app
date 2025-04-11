// src/apiConfig.js

// const LOCAL = 'http://127.0.0.1:8000';
const PROD = 'https://food-tracking-app.onrender.com';

//const BASE_URL = process.env.NODE_ENV === 'development' ? LOCAL : PROD;
const BASE_URL = PROD;

export const API = {
  dashboard: `${BASE_URL}/dashboard`,
  history: `${BASE_URL}/history`,
  log: `${BASE_URL}/log`,
  profile: `${BASE_URL}/profile`
};
