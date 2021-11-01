import React, { useReducer } from 'react';
import TextbookContext from './textbookContext';
import textbookReducer from './textbookReducer';

const TextbookState = (props) => {
    const initialState = [];

    const [state, dispatch] = useReducer(textbookReducer, initialState);

    return (
        <TextbookContext.Provider value={{}}>
            {props.children}
        </TextbookContext.Provider>
    );
};

export default TextbookState;
