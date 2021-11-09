/* eslint-disable prettier/prettier */
import React, { useReducer } from 'react';
import axios from 'axios';
import TextbookContext from './textbookContext';
import textbookReducer from './textbookReducer';
import {
  GET_ALL_TEXTBOOKS,
  GET_TEXTBOOK,
  CREATE_TEXTBOOK,
  UPDATE_TEXTBOOK,
  DELETE_TEXTBOOK
} from '../types';

const TextbookState = (props) => {
  const initialState = {
    textbook: null,
    textbooks: []
  };

  const [state, dispatch] = useReducer(textbookReducer, initialState);

  const getAllTextbooks = async () => {
    const res = await axios.get('/oldtextbook/alltextbooks');
    dispatch({
      type: GET_ALL_TEXTBOOKS,
      payload: res.data
    });
  };

  const createTextbook = async (value, user) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    console.log(value);
    try {
      const res = await axios.post(`/oldtextbook/create/${user.id}`, value, config);

      dispatch({
        type: CREATE_TEXTBOOK,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: CREATE_TEXTBOOK,
        payload: err.response.data.error
      });
    }
  };

  const getTextbook = async (textbookId) => {
    const res = await axios.get(`/oldtextbook/${textbookId}`);
    dispatch({
      type: GET_TEXTBOOK,
      payload: res.data
    });
  }

  const updateTextbook = async (textbook, textbookId) => {
    try {
      const res = await axios.put(`/oldtextbook/edit/${textbookId}`, textbook, {
        headers: { 'Content-Type': 'application/json' }
      });
      dispatch({
        type: UPDATE_TEXTBOOK,
        payload: res.data
      });
      getTextbook(textbookId);
    } catch (err) {
      dispatch({
        type: UPDATE_TEXTBOOK,
        payload: err.response.data.error
      });
    }
  };

//   const getTextbookListingsByNameOrCategory = async (obj) => {
//     try {
//       const res = await axios.get(`/lostnfound/search/${obj.name}`);
//       dispatch({
//         type: GET_ALL_TEXTBOOKS,
//         payload: res.data
//       });
//       console.log(obj);
//     } catch (err) {
//       dispatch({
//         type: GET_ALL_TEXTBOOKS,
//         payload: err.response.data.error
//       });
//     }
//   };

  const deleteTextbook = async (textbookId) => {
    try {
      const res = await axios.delete(`/oldtextbook/delete/${textbookId}`);
      dispatch({
        type: DELETE_TEXTBOOK,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: DELETE_TEXTBOOK,
        payload: err.response.data.error
      });
    }
  };

  return (
    <TextbookContext.Provider
      value={{
        textbook: state.textbook,
        textbooks: state.textbooks,
        getAllTextbooks,
        createTextbook,
        getTextbook,
        updateTextbook,
        deleteTextbook,
        // getLostFoundListingsByNameOrCategory
      }}
    >
      {props.children}
    </TextbookContext.Provider>
  );
};

export default TextbookState;