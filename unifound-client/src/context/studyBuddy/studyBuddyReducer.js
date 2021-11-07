import { GET_STUDY_LISTINGS, CREATE_ERROR, CREATE_FAIL, CREATE_SUCCESS } from '../types';

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
    default:
      return {
        ...state
      };
  }
};

export default studyBuddyReducer;
