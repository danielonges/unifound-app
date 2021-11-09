/* eslint-disable prettier/prettier */
import {
  CREATE_LOSTFOUND,
  SET_LOSTFOUND,
  UPDATE_LOSTFOUND,
  DELETE_LOSTFOUND,
  GET_ALL_LOSTFOUNDS,
  GET_LOSTFOUND
} from '../types';

const lostAndFoundReducer = (state, action) => {
  switch (action.type) {
    case CREATE_LOSTFOUND:
      return {
        ...state,
        lostFoundListings: [action.payload, ...state.lostFoundListings]
      };
    case UPDATE_LOSTFOUND:
    case SET_LOSTFOUND:
      return {
        ...state,
        lostFoundListing: action.payload
      };
    case DELETE_LOSTFOUND:
      return {
        ...state,
        lostFoundListings: state.lostFoundListings.filter(
          (listing) => listing.id !== action.payload
        )
      };
    case GET_ALL_LOSTFOUNDS:
      return {
        ...state,
        lostFoundListings: action.payload
      };
    case GET_LOSTFOUND:
      return {
        ...state,
        lostFoundListing: action.payload
      };
    default:
      return state;
  }
};

export default lostAndFoundReducer;
