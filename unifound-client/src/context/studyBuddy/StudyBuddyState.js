import React, { useReducer } from 'react';
import axios from 'axios';
import StudyBuddyContext from './studyBuddyContext';
import studyBuddyReducer from './studyBuddyReducer';

import {
  GET_STUDY_LISTINGS,
  LISTING_ERROR,
  CREATE_SUCCESS,
  DELETE_STUDY_LISTING,
  EDIT_STUDY_LISTING,
  JOIN_LISTING
} from '../types';

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
        type: LISTING_ERROR,
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
        type: LISTING_ERROR,
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

    try {
      const res = await axios.post(`/studybuddy/${user.id}`, value, config);

      dispatch({
        type: CREATE_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: LISTING_ERROR,
        payload: err.response.data.error
      });
    }
  };

  // Delete Study Buddy Listing
  const deleteStudyListing = async (id) => {
    try {
      await axios.delete(`/studybuddy/${id}`);

      dispatch({
        type: DELETE_STUDY_LISTING,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: LISTING_ERROR,
        payload: err.response.data.error
      });
    }
  };

  // Edit Study Listing
  const editStudyListing = async (listing) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/studybuddy/${listing.id}`, listing, config);

      dispatch({
        type: EDIT_STUDY_LISTING,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: LISTING_ERROR,
        payload: err.response.data.error
      });
    }
  };

  // Join Study Listing
  const joinStudyListing = async (listing, user) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/studybuddy/${listing.id}/addUser/${user.id}`, listing, config);

      dispatch({
        type: JOIN_LISTING,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: LISTING_ERROR,
        payload: err.response.data.error
      });
    }
  };

  // Leave Study Listing
  const leaveStudyListing = async (listing, user) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `/studybuddy/${listing.id}/removeUser/${user.id}`,
        listing,
        config
      );

      dispatch({
        type: EDIT_STUDY_LISTING,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: LISTING_ERROR,
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
        getStudyListingByModule,
        deleteStudyListing,
        joinStudyListing,
        leaveStudyListing,
        editStudyListing
      }}
    >
      {props.children}
    </StudyBuddyContext.Provider>
  );
};

export default StudyBuddyState;
