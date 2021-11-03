import React, { useReducer } from 'react';
import LostAndFoundContext from './lostAndFoundContext';
import lostAndFoundReducer from './lostAndFoundReducer';
import {
    CREATE_LOSTFOUND,
    UPDATE_LOSTFOUND,
    DELETE_LOSTFOUND,
    SET_LOSTFOUND,
    GET_ALL_LOSTFOUNDS,
    LOSTFOUND_ERROR
} from '../types';

const LostAndFoundState = (props) => {
    const initialState = {
        lostFoundListing: null,
        lostFoundListings: null
    };

    const [state, dispatch] = useReducer(lostAndFoundReducer, initialState);

    const createLostFoundListing = async(formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/lostnfound', formData);
            dispatch({
                type: CREATE_LOSTFOUND,
                payload: res.data
            });
            getAllLostFoundListings();
        } catch (error) {
            dispatch({
                type: LOSTFOUND_ERROR,
                payload: error.response.data.error
            });
        }
    };

    const setLostFoundListing = (lostFoundListing) => {
        dispatch({
            type: SET_LOSTFOUND,
            payload: lostFoundListing
        });
    };

    const updateLostFoundListing = async (lostFoundListing) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }

    return (
        <LostAndFoundContext.Provider value={{}}>
            {props.children}
        </LostAndFoundContext.Provider>
    );
};

export default LostAndFoundState;
