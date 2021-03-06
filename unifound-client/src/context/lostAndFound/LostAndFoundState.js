/* eslint-disable prettier/prettier */
import React, { useReducer } from 'react';
import axios from 'axios';
import LostAndFoundContext from './lostAndFoundContext';
import lostAndFoundReducer from './lostAndFoundReducer';
import {
  GET_ALL_LOSTFOUNDS,
  GET_LOSTFOUND,
  CREATE_LOSTFOUND,
  UPDATE_LOSTFOUND,
  DELETE_LOSTFOUND,
  LISTING_ERROR
} from '../types';

const LostAndFoundState = (props) => {
  const initialState = {
    lostFoundListing: null,
    lostFoundListings: [],
    error: null
  };

  const [state, dispatch] = useReducer(lostAndFoundReducer, initialState);

  const getAllLostFoundListings = async () => {
    try {
      const res = await axios.get('/lostnfound/allLFlistings');
      dispatch({
        type: GET_ALL_LOSTFOUNDS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: LISTING_ERROR,
        payload: err.response.error
      });
    }
  };

  const getLostFoundListingOfUser = async (userId) => {
    try {
      const res = await axios.get(`/lostnfound/allLFlistings/${userId}/user`);
      dispatch({
        type: GET_ALL_LOSTFOUNDS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: LISTING_ERROR,
        payload: err.response.data.error
      });
    }
  };

  const createLostFoundListing = async (value, user) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    console.log(value);
    try {
      const res = await axios.post(`/lostnfound/create/${user.id}`, value, config);

      dispatch({
        type: CREATE_LOSTFOUND,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: LISTING_ERROR,
        payload: err.response.data.error
      });
    }
  };

  const getLostFoundListing = async (listingId) => {
    try {
      const res = await axios.get(`/lostnfound/${listingId}`);
      dispatch({
        type: GET_LOSTFOUND,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: LISTING_ERROR,
        payload: err.response.error
      })
    }
  }

  const updateLostFoundListing = async (lostFoundListing, listingId) => {
    try {
      const res = await axios.put(`/lostnfound/edit/${listingId}`, lostFoundListing, {
        headers: { 'Content-Type': 'application/json' }
      });
      dispatch({
        type: UPDATE_LOSTFOUND,
        payload: res.data
      });
      getLostFoundListing(listingId);
    } catch (err) {
      dispatch({
        type: LISTING_ERROR,
        payload: err.response.data.error
      });
    }
  };

  const getLostFoundListingsByNameOrCategory = async (obj) => {
    try {
      const res = await axios.get(`/lostnfound/search/${obj.name}`);
      dispatch({
        type: GET_ALL_LOSTFOUNDS,
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

  const deleteLostFoundListing = async (listingId) => {
    try {
      const res = await axios.delete(`/lostnfound/delete/${listingId}`);
      dispatch({
        type: DELETE_LOSTFOUND,
        payload: listingId
      });
    } catch (err) {
      dispatch({
        type: LISTING_ERROR,
        payload: err.response.data.error
      });
    }
  };

  return (
    <LostAndFoundContext.Provider
      value={{
        lostFoundListing: state.lostFoundListing,
        lostFoundListings: state.lostFoundListings,
        getAllLostFoundListings,
        createLostFoundListing,
        getLostFoundListing,
        updateLostFoundListing,
        deleteLostFoundListing,
        getLostFoundListingOfUser,
        getLostFoundListingsByNameOrCategory
      }}
    >
      {props.children}
    </LostAndFoundContext.Provider>
  );
};

export default LostAndFoundState;
