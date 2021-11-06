/* eslint-disable react/jsx-fragments */
/* eslint-disable prettier/prettier */
import React, { useContext, useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import LostFoundCard from './LostFoundCard';
import lostAndFoundContext from '../../../context/lostAndFound/lostAndFoundContext';

export const LostFoundListings = (props) => {
  const lostFoundContext = useContext(lostAndFoundContext);
  const { lostFoundListings, getAllLostFoundListings } = lostFoundContext;

  useEffect(() => {
    getAllLostFoundListings();
  }, []);

  return (
      <Grid container spacing={3}>
        {lostFoundListings.map((listing) => (
          <Grid key={listing.id} item xs={12} sm={5} md={3}>
            <LostFoundCard params={listing} />
          </Grid>
        ))}
      </Grid>
  );
}

export default LostFoundListings;