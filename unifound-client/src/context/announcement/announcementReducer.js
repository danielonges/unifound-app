/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
import {
  CREATE_ANNOUNCEMENT,
  DELETE_ANNOUNCEMENT,
  GET_ALL_ANNOUNCEMENTS,
  GET_ANNOUNCEMENT
} from '../types';

const announcementReducer = (state, action) => {
  switch (action.type) {
    case CREATE_ANNOUNCEMENT:
      return {
        ...state,
        announcements: [action.payload, ...state.announcements]
      };
    case DELETE_ANNOUNCEMENT:
      return {
        ...state,
        announcements: state.announcements.filter(
          (announcement) => announcement.id !== action.payload
        )
      };
    case GET_ALL_ANNOUNCEMENTS:
      return {
        ...state,
        announcements: action.payload
      };
    case GET_ANNOUNCEMENT:
      return {
        ...state,
        announcement: action.payload
      };
    default:
      return state;
  }
};

export default announcementReducer;
