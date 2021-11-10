/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// import React, { useReducer } from 'react';
// import axios from 'axios';
// import AnnouncementContext from './announcementContext';
// import announcementReducer from './announcementReducer';
// import {
//   GET_ALL_ANNOUNCEMENTS,
//   GET_ANNOUNCEMENT,
//   CREATE_ANNOUNCEMENT,
//   UPDATE_ANNOUNCEMENT,
//   DELETE_ANNOUNCEMENT
// } from '../types';

// const AnnouncementState = (props) => {
//   const initialState = {
//     announcement: null,
//     announcements: []
//   };

//   const [state, dispatch] = useReducer(announcementReducer, initialState);

//   const getAllAnnouncements = async () => {
//     const res = await axios.get('/announcement/announcements');
//     dispatch({
//       type: GET_ALL_ANNOUNCEMENTS,
//       payload: res.data
//     });
//   };

//   const createAnnouncement = async (value, user) => {
//     const config = {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     };
//     console.log(value);
//     try {
//       const res = await axios.post(`/announcement/create/${user.id}`, value, config);

//       dispatch({
//         type: CREATE_ANNOUNCEMENT,
//         payload: res.data
//       });
//     } catch (err) {
//       dispatch({
//         type: CREATE_ANNOUNCEMENT,
//         payload: err.response.data.error
//       });
//     }
//   };

//   const getAnnouncement = async (announcementId) => {
//     const res = await axios.get(`/lostnfound/${announcementId}`);
//     dispatch({
//       type: GET_ANNOUNCEMENT,
//       payload: res.data
//     });
//   }

//   const updateAnnouncement = async (announcement, announcementId) => {
//     try {
//       const res = await axios.put(`/announcement/edit/${announcementId}`, announcement, {
//         headers: { 'Content-Type': 'application/json' }
//       });
//       dispatch({
//         type: UPDATE_ANNOUNCEMENT,
//         payload: res.data
//       });
//       getAnnouncement(announcementId);
//     } catch (err) {
//       dispatch({
//         type: UPDATE_ANNOUNCEMENT,
//         payload: err.response.data.error
//       });
//     }
//   };

//   const deleteAnnouncement = async (announcementId) => {
//     try {
//       const res = await axios.delete(`/lostnfound/delete/${announcementId}`);
//       dispatch({
//         type: DELETE_ANNOUNCEMENT,
//         payload: res.data
//       });
//     } catch (err) {
//       dispatch({
//         type: DELETE_ANNOUNCEMENT,
//         payload: err.response.data.error
//       });
//     }
//   };

//   return (
//     <AnnouncementContext.Provider
//       value={{
//         announcement: state.announcement,
//         announcements: state.announcements,
//         getAllAnnouncements,
//         createAnnouncement,
//         getAnnouncement,
//         updateAnnouncement,
//         deleteAnnouncement
//       }}
//     >
//       {props.children}
//     </AnnouncementContext.Provider>
//   );
// };

// export default AnnouncementState;