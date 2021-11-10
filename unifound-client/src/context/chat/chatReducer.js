import { CHAT_ERROR, GET_USER_CHATS } from '../types';

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
    default:
      return state;
  }
};

export default chatReducer;
