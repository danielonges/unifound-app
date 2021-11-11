import axios from 'axios';
import React, { useReducer } from 'react';
import { CHAT_ERROR, CREATE_CHAT, DELETE_CHAT, GET_USER_CHATS, SEND_MESSAGE } from '../types';
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
      await getUserChats(userId);
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

  // you create the chat
  const createChat = async (chat, userId) => {
    const config = {
      headers: {
        userId
      }
    };
    try {
      const res = await axios.post(`/chat/create`, chat, config);
      dispatch({
        type: CREATE_CHAT,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: CHAT_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // add someone to an existing chat
  const addToChat = async (chat, userId) => {
    const config = {
      headers: {
        userId
      }
    };
    try {
      await axios.put(`/chat/add`, chat, config);
      //   dispatch({
      //     type: CREATE_CHAT,
      //     payload: chat
      //   });
    } catch (error) {
      dispatch({
        type: CHAT_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // delete chat for another person
  const deleteChatForUser = async (chatId, userId) => {
    const config = {
      headers: {
        userId
      }
    };
    try {
      await axios.delete(`/chat/delete-user/${chatId}`, config);
      //   await getUserChats(userId);
    } catch (error) {
      dispatch({
        type: CHAT_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // deletes everyone that belongs to the chat including yourself, and then proceeds to delete the chat itself
  // userId is your own userId
  const deleteChatForAll = async (chatId, userId) => {
    try {
      await axios.delete(`/chat/delete-all/${chatId}`);
      await getUserChats(userId);
      dispatch({
        type: DELETE_CHAT,
        payload: chatId
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
        sendMessage,
        createChat,
        addToChat,
        deleteChatForUser,
        deleteChatForAll
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatState;
