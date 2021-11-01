import React, { useReducer } from 'react';
import AnnouncementContext from './announcementContext';
import announcementReducer from './announcementReducer';

const AnnouncementState = (props) => {
    const initialState = [];

    const [state, dispatch] = useReducer(announcementReducer, initialState);

    return (
        <AnnouncementContext.Provider value={{}}>
            {props.children}
        </AnnouncementContext.Provider>
    );
};

export default AnnouncementState;
