import React, { useReducer } from 'react';
import axios from 'axios';
import StudyBuddyContext from './studyBuddyContext';
import studyBuddyReducer from './studyBuddyReducer';

import { GET_STUDY_LISTINGS, CREATE_ERROR, CREATE_FAIL, CREATE_SUCCESS } from '../types';

const StudyBuddyState = (props) => {
  const initialState = {
    studyBuddyListings: []
  };

  const [state, dispatch] = useReducer(studyBuddyReducer, initialState);

  // Get All Study Listings
  const getStudyListings = async () => {
    try {
      const res = await axios.get('/studybuddy');

      dispatch({
        type: GET_STUDY_LISTINGS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: CREATE_ERROR,
        payload: err.response.data.error
      });
    }
  };

  // Get Study Listing by searching module
  const getStudyListingByModule = async (obj) => {
    try {
      const res = await axios.get(`/studybuddy/search/${obj.module}`);

      dispatch({
        type: GET_STUDY_LISTINGS,
        payload: res.data
      });
      console.log(obj);
    } catch (err) {
      dispatch({
        type: CREATE_ERROR,
        payload: err.response.data.error
      });
    }
  };

  // Create Study Listing
  const createStudyListing = async (value, user) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    console.log(value);
    try {
      const res = await axios.post(`/studybuddy/${user.id}`, value, config);

      dispatch({
        type: CREATE_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: CREATE_FAIL,
        payload: err.response.data.error
      });
    }
  };

  return (
    <StudyBuddyContext.Provider
      value={{
        studyBuddyListings: state.studyBuddyListings,
        createStudyListing,
        getStudyListings,
        getStudyListingByModule
      }}
    >
      {props.children}
    </StudyBuddyContext.Provider>
  );
};

export default StudyBuddyState;
