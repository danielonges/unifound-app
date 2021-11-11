import axios from 'axios';
import React, { useReducer } from 'react';
import { CHAT_ERROR, GET_USER_CHATS, SEND_MESSAGE } from '../types';
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

  const sendMessage = async (userId, message, chatId) => {
    try {
      const res = await axios.post(`/message/${userId}/${chatId}`, message);
      dispatch({
        type: SEND_MESSAGE,
        payload: {
          chatId,
          msg: res.data
        }
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
        getUserChats,
        sendMessage
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatState;
