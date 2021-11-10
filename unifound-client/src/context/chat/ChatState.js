import axios from 'axios';
import React, { useReducer } from 'react';
import { CHAT_ERROR, GET_USER_CHATS } from '../types';
import ChatContext from './chatContext';
import chatReducer from './chatReducer';

const ChatState = (props) => {
  const initialState = {
    chats: null,
    error: null
  };

  const [state, dispatch] = useReducer(chatReducer, initialState);

  // retrieve chats from user every 5 seconds
  if (localStorage.getItem('user') !== null) {
    console.log('Hello');
  }
  //   setInterval(() => {
  //     console.log('Hello');
  //   }, 3000);
  const getUserChats = async (userId) => {
    try {
      const res = await axios.get(`/chat/user/${userId}`);
      dispatch({
        type: GET_USER_CHATS,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: CHAT_ERROR,
        payload: error.response.data.error
      });
    }
  };

  return <ChatContext.Provider value={{}}>{props.children}</ChatContext.Provider>;
};

export default ChatState;
