/* eslint-disable react/jsx-fragments */
/* eslint-disable prettier/prettier */
import React, { useContext, useEffect } from 'react';
import { Grid } from '@mui/material';
import LostFoundCard from './LostFoundCard';
import lostAndFoundContext from '../../../context/lostAndFound/lostAndFoundContext';

export const LostFoundListings = (props) => {
  const lostFoundContext = useContext(lostAndFoundContext);
  const { getAllLostFoundListings } = lostFoundContext;

  useEffect(() => {
    getAllLostFoundListings();
  }, []);

  useEffect(() => {
    getAllLostFoundListings();
  }, []);

  return (
    <Grid container spacing={3}>
      {lostFoundContext.lostFoundListings.map((listing) => (
        <Grid key={listing.id} item xs={12} sm={5} md={3}>
          <LostFoundCard lostFoundItem={listing} />
        </Grid>
      ))}
    </Grid>
  );
};

export default LostFoundListings;
