import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  CLEAR_PROFILE,
  CLEAR_ARTICLES,
  AUTH_ERROR,
} from './types';
import setAuthToken from '../../utils/setAuthToken';
import { URL_PROD } from '../../utils/backend';

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    console.log(1)
    const res = await axios.get(`${URL_PROD}/users/me`);
    console.log(2)
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
    console.log(3)
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Register User
export const registerUser =
  ({ username, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ username, email, password });
    console.log(body);

    try {
      const res = await axios.post(`${URL_PROD}/users/register`, body, config);
      console.log(res);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      // dispatch(loadUser());
    } catch (err) {
      console.log('err', err);
      dispatch({ type: REGISTER_FAIL });
    }
  };

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(`${URL_PROD}/users/login`, body, config);

    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    // dispatch(loadUser());
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

// Logout user
export const logout = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: CLEAR_ARTICLES });
  dispatch({ type: LOGOUT });
};
