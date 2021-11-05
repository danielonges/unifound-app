import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../types';

const userReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      //   localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false
      };
    case LOGIN_FAIL:
    case LOGOUT:
      //   localStorage.removeItem('token');
      return {
        ...state,
        // token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
