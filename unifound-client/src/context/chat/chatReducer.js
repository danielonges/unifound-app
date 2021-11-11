import {
  CHAT_ERROR,
  GET_USER_CHATS,
  SEND_MESSAGE,
  CREATE_CHAT,
  ADD_TO_CHAT,
  DELETE_CHAT
} from '../types';

const chatReducer = (state, action) => {
  switch (action.type) {
    case CHAT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case GET_USER_CHATS:
      return {
        ...state,
        chats: action.payload
      };
    case SEND_MESSAGE: {
      const updatedChat = state.chats.find((chat) => chat.id === action.payload.chatId);
      updatedChat.messages.push(action.payload.msg);
      return {
        ...state,
        chats: state.chats.map((chat) => (chat.id === action.payload.chatId ? updatedChat : chat))
      };
    }
    case CREATE_CHAT:
    case ADD_TO_CHAT:
      return {
        ...state,
        chats: [...state.chats, action.payload]
      };
    case DELETE_CHAT:
      return {
        ...state,
        chats: state.chats.filter((chat) => chat.id !== action.payload)
      };
    default:
      return state;
  }
};

export default chatReducer;
