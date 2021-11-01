import React, { useReducer } from 'react';
import LostAndFoundContext from './lostAndFoundContext';
import lostAndFoundReducer from './lostAndFoundReducer';

const LostAndFoundState = (props) => {
    const initialState = [];

    const [state, dispatch] = useReducer(lostAndFoundReducer, initialState);

    return (
        <LostAndFoundContext.Provider value={{}}>
            {props.children}
        </LostAndFoundContext.Provider>
    );
};

export default LostAndFoundState;
