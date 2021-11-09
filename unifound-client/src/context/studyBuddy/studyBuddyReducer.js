import {
  GET_STUDY_LISTINGS,
  LISTING_ERROR,
  CREATE_SUCCESS,
  DELETE_STUDY_LISTING,
  EDIT_STUDY_LISTING,
  JOIN_LISTING
} from '../types';

const studyBuddyReducer = (state, action) => {
  switch (action.type) {
    case CREATE_SUCCESS:
      return {
        ...state,
        studyBuddyListings: [action.payload, ...state.studyBuddyListings]
      };
    case GET_STUDY_LISTINGS:
      return {
        ...state,
        studyBuddyListings: action.payload
      };
    case DELETE_STUDY_LISTING:
      return {
        ...state,
        studyBuddyListings: state.studyBuddyListings.filter(
          (listing) => listing.id !== action.payload
        )
      };
    case JOIN_LISTING:
    case EDIT_STUDY_LISTING:
      return {
        ...state,
        studyBuddyListings: state.studyBuddyListings.map((listing) =>
          listing.id === action.payload.id ? action.payload : listing
        )
      };

    case LISTING_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return {
        ...state
      };
  }
};

export default studyBuddyReducer;
