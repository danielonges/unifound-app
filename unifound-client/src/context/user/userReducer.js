import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, GET_USER, EDIT_USER } from '../types';

const userReducer = (state, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false
      };
    case LOGIN_FAIL:
      return {
        error: action.payload
      };
    case LOGOUT:
      localStorage.removeItem('user');
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      };
    case EDIT_USER:
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default userReducer;
