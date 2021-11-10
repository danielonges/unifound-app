import React, { useReducer } from 'react';
import axios from 'axios';
import UserContext from './userContext';
import userReducer from './userReducer';

import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, GET_USER, EDIT_USER } from '../types';

const UserState = (props) => {
  const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || {},
    isAuthenticated: false
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
        payload: err.response.data.msg
      });
    }
  };

  const editUser = async (user) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.put(`/user/${user.id}`, user, config);
    dispatch({
      type: EDIT_USER,
      payload: res.data
    });
  };

  const logout = () => dispatch({ type: LOGOUT });

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        login,
        logout,
        editUser
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
