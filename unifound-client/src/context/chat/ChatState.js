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

  //   const user = JSON.parse(localStorage.getItem('user'));
  //   if (user !== null) {
  //     // setInterval(() => {
  //     // getUserChats(user.id);
  //     // console.log('Got it!');
  //     // }, 5000);
  //   }

  return (
    <ChatContext.Provider
      value={{
        chats: state.chats,
        error: state.error,
        getUserChats
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatState;
