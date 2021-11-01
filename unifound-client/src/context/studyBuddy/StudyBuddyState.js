import React, { useReducer } from 'react';
import StudyBuddyContext from './studyBuddyContext';
import studyBuddyReducer from './studyBuddyReducer';

const StudyBuddyState = (props) => {
    const initialState = [];

    const [state, dispatch] = useReducer(studyBuddyReducer, initialState);

    return (
        <StudyBuddyContext.Provider value={{}}>
            {props.children}
        </StudyBuddyContext.Provider>
    );
};

export default StudyBuddyState;
