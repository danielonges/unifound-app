import React, { useReducer } from 'react';
import axios from 'axios';
import UserContext from './userContext';
import userReducer from './userReducer';

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  GET_USER,
  EDIT_USER,
  CREATE_USER,
  CREATE_USER_FAIL,
  CLEAR_ERRORS
} from '../types';

const UserState = (props) => {
  const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || {},
    isAuthenticated: false,
    error: null
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  const login = async (user) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/user/login', user, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.error
      });
    }
  };

  // clear errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  const createUser = async (user) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/user/register', user, config);

      dispatch({
        type: CREATE_USER,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: CREATE_USER_FAIL,
        payload: err.response.data.error
      });
    }
  };

  const editUser = async (user) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.put(`/user/${user.id}`, user, config);
      dispatch({
        type: EDIT_USER,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.error
      });
    }
  };

  const logout = () => dispatch({ type: LOGOUT });

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        error: state.error,
        login,
        logout,
        editUser,
        createUser,
        clearErrors
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
