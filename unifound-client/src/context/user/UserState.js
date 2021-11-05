import React, { useReducer } from 'react';
import axios from 'axios';
import UserContext from './userContext';
import userReducer from './userReducer';

import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../types';

const UserState = (props) => {
  const initialState = {
    user: {},
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

  const logout = () => dispatch({ type: LOGOUT });

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        login,
        logout
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
