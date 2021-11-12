/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import React, { useReducer } from 'react';
import axios from 'axios';
import AnnouncementContext from './announcementContext';
import announcementReducer from './announcementReducer';
import {
  GET_ALL_ANNOUNCEMENTS,
  CREATE_ANNOUNCEMENT,
  DELETE_ANNOUNCEMENT,
  LIKE_ANNOUNCEMENT,
  GET_ANNOUNCEMENT,
  LISTING_ERROR
} from '../types';

const AnnouncementState = (props) => {
  const initialState = {
    announcement: null,
    announcements: []
  };

  const [state, dispatch] = useReducer(announcementReducer, initialState);

  const getAllAnnouncements = async () => {
    const res = await axios.get('/announcement/announcements');
    dispatch({
      type: GET_ALL_ANNOUNCEMENTS,
      payload: res.data
    });
  };

  const createAnnouncement = async (value) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    console.log(value);
    try {
      const res = await axios.post(`/announcement/create`, value, config);

      dispatch({
        type: CREATE_ANNOUNCEMENT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: LISTING_ERROR,
        payload: err.response.data.error
      });
    }
  };

  const getAnnouncement = async (announcementId) => {
    try {
      const res = await axios.get(`/announcement/${announcementId}`);
      dispatch({
        type: GET_ANNOUNCEMENT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: LISTING_ERROR,
        payload: err.response.error
      })
    }
  }

  const likeAnnouncement = async (postId, user) => {
    const config = {
      headers: {
        'Context-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post(`/announcement/like/${postId}/${user.id}`, config);
      dispatch({
        type: GET_ALL_ANNOUNCEMENTS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: LISTING_ERROR,
        // payload: err.response.data.error
      });
    }
  }

  const deleteAnnouncement = async (listingId) => {
    try {
      const res = await axios.delete(`/announcement/delete/${listingId}`);
      dispatch({
        type: DELETE_ANNOUNCEMENT,
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
    <AnnouncementContext.Provider
      value={{
        announcement: state.announcement,
        announcements: state.announcements,
        getAllAnnouncements,
        createAnnouncement,
        deleteAnnouncement,
        likeAnnouncement,
        getAnnouncement
      }}
    >
      {props.children}
    </AnnouncementContext.Provider>
  );
};

export default AnnouncementState;
