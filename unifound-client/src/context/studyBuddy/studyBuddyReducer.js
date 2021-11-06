import { GET_STUDY_LISTINGS, CREATE_ERROR, CREATE_FAIL, CREATE_SUCCESS } from '../types';

const studyBuddyReducer = (state, action) => {
  switch (action.type) {
    case CREATE_SUCCESS:
      return {
        ...state,
        studyBuddyListings: [action.payload, ...state.studyBuddyListings]
      };
    default:
      return {
        ...state
      };
  }
};

export default studyBuddyReducer;
