/* eslint-disable prettier/prettier */
import {
    CREATE_TEXTBOOK,
    UPDATE_TEXTBOOK,
    DELETE_TEXTBOOK,
    GET_ALL_TEXTBOOKS,
    GET_TEXTBOOK
  } from '../types';
  
  const textbookReducer = (state, action) => {
    switch (action.type) {
      case CREATE_TEXTBOOK:
        return {
          ...state,
          textbooks: [action.payload, ...state.textbooks]
        };
      case UPDATE_TEXTBOOK:
        return {
          ...state,
          textbook: action.payload
        };
      case DELETE_TEXTBOOK:
        return {
          ...state,
          textbooks: state.textbooks.filter(
            (textbook) => textbook.id !== action.payload
          )
        };
      case GET_ALL_TEXTBOOKS:
        return {
          ...state,
          textbooks: action.payload
        };
      case GET_TEXTBOOK:
        return {
          ...state,
          textbook: action.payload
        };
      default:
        return state;
    }
  };
  
  export default textbookReducer;  