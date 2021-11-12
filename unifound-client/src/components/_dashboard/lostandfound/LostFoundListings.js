/* eslint-disable react/jsx-fragments */
/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from 'react';
import { Grid, Stack } from '@mui/material';
import LostFoundCard from './LostFoundCard';
import lostAndFoundContext from '../../../context/lostAndFound/lostAndFoundContext';
import LostFoundFilter from './LostFoundFilter';

const LostFoundListings = (props) => {
  const lostFoundContext = useContext(lostAndFoundContext);
  const [LFFilter, setLFFilter] = useState({
    searchValue: '',
    searchField: 'name',
    filterType: 'lost'
  });

  const { getAllLostFoundListings, lostFoundListings } = lostFoundContext;

  useEffect(() => {
    getAllLostFoundListings();
  }, []);

  return (
    <React.Fragment>
      <LostFoundFilter dataList={lostFoundListings} filter={LFFilter} setFilter={setLFFilter} />
      <Grid container spacing={3}>
        {lostFoundContext.lostFoundListings.map((listing) => {
          console.log(LFFilter.searchValue)
          if (
            listing.type === LFFilter.filterType &&
            (LFFilter.searchValue === '' || 
            LFFilter.searchValue === '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>' ||
              (LFFilter.searchField === 'name' &&
                listing.name.indexOf(LFFilter.searchValue) >= 0) ||
              (LFFilter.searchField === 'category' &&
                listing.category.indexOf(LFFilter.searchValue) >= 0))
          ) {
            return (
              <Grid key={listing.id} item xs={12} sm={5} md={3}>
                <LostFoundCard lostFoundItem={listing} />
              </Grid>
            );
          }
          return <></>;
        })}
      </Grid>
    </React.Fragment>
  );
};

export default LostFoundListings;
