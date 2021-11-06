/* eslint-disable prettier/prettier */
import React, { useReducer } from 'react';
import axios from 'axios';
import LostAndFoundContext from './lostAndFoundContext';
import lostAndFoundReducer from './lostAndFoundReducer';
import {
    GET_ALL_LOSTFOUNDS,
    CREATE_SUCCESS,
    CREATE_FAIL
} from '../types';

const LostAndFoundState = (props) => {
    const initialState = {
        lostFoundListing: null,
        lostFoundListings: []
    };

    const [state, dispatch] = useReducer(lostAndFoundReducer, initialState);

    const getAllLostFoundListings = async () => {
        const res = await axios.get('/lostnfound/allLFlistings');
        console.log(res.data);
        dispatch({
            type: GET_ALL_LOSTFOUNDS,
            payload: res.data
        });
    };

    // Create Lost And Found Listing
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

    // const setLostFoundListing = (lostFoundListing) => {
    //     dispatch({
    //         type: SET_LOSTFOUND,
    //         payload: lostFoundListing
    //     });
    // };

    // const updateLostFoundListing = async (lostFoundListing) => {
    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     };
    // }

    return (
        <LostAndFoundContext.Provider value={{
            lostFoundListing: state.lostFoundListing,
            lostFoundListings: state.lostFoundListings,
            getAllLostFoundListings,
            createLostFoundListing
            // updateLostFoundListing,
            // setLostFoundListing
        }}>
            {props.children}
        </LostAndFoundContext.Provider>
    );
};

export default LostAndFoundState;