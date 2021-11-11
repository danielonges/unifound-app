/* eslint-disable react/jsx-fragments */
/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from 'react';
import { Grid, Stack } from '@mui/material';
import ConfessionCard from './ConfessionCard';
import AnnouncementContext from '../../../context/announcement/announcementContext';

const Confessions = (props) => {
    const announcementContext = useContext(AnnouncementContext);

    const { getAllAnnouncements } = announcementContext;

    useEffect(() => {
        getAllAnnouncements();
    }, []);

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                {announcementContext.announcements.map((listing) => (
                    <Grid key={listing.id} item xs={12} sm={5} md={3}>
                        <ConfessionCard post={listing} />
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    );
};

export default Confessions;
