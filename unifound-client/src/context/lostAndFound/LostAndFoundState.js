/* eslint-disable prettier/prettier */
import React, { useReducer } from 'react';
import axios from 'axios';
import LostAndFoundContext from './lostAndFoundContext';
import lostAndFoundReducer from './lostAndFoundReducer';
import {
    GET_ALL_LOSTFOUNDS
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

    // const createLostFoundListing = async (formData) => {
    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     };

    //     try {
    //         const res = await axios.post('/lostnfound', formData);
    //         dispatch({
    //             type: CREATE_LOSTFOUND,
    //             payload: res.data
    //         });
    //         getAllLostFoundListings();
    //     } catch (error) {
    //         dispatch({
    //             type: LOSTFOUND_ERROR,
    //             payload: error.response.data.error
    //         });
    //     }
    // };

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
            getAllLostFoundListings
            // createLostFoundListing,
            // updateLostFoundListing,
            // setLostFoundListing
        }}>
            {props.children}
        </LostAndFoundContext.Provider>
    );
};

export default LostAndFoundState;