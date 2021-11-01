import React, { useReducer } from 'react';
import UserContext from './userContext';
import userReducer from './userReducer';

const UserState = (props) => {
    const initialState = [];

    const [state, dispatch] = useReducer(userReducer, initialState);

    return (
        <UserContext.Provider value={{}}>{props.children}</UserContext.Provider>
    );
};

export default UserState;
