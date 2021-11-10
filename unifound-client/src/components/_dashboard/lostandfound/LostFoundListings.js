/* eslint-disable react/jsx-fragments */
/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from 'react';
import { Grid, Stack } from '@mui/material';
import LostFoundCard from './LostFoundCard';
import lostAndFoundContext from '../../../context/lostAndFound/lostAndFoundContext';
import LostFoundFilter from './LostFoundFilter';


export const LostFoundListings = (props) => {
  const lostFoundContext = useContext(lostAndFoundContext);
  const [LFFilter, setLFFilter] = useState({ searchValue: '', searchField: 'name', filterType: 'lost'});
  
  const { getAllLostFoundListings, lostFoundListings } = lostFoundContext;

  useEffect(() => {
    getAllLostFoundListings();
  }, []);

  return (
    <React.Fragment>
      <LostFoundFilter dataList={lostFoundListings} filter={LFFilter} setFilter={setLFFilter} />
      <Grid container spacing={3}>
        {lostFoundContext.lostFoundListings.map((listing) => {
            if (listing.type === LFFilter.filterType &&
                (LFFilter.searchValue === '' ||
                 (LFFilter.searchField === 'name' && listing.name.indexOf(LFFilter.searchValue) >= 0) ||
                 (LFFilter.searchField === 'category' && listing.category.indexOf(LFFilter.searchValue) >= 0))) {
              return (<Grid key={listing.id} item xs={12} sm={5} md={3}>
                <LostFoundCard lostFoundItem={listing} />
              </Grid>)
            }
            return (<></>);
        })}
      </Grid>
    </React.Fragment>
  );
}

export default LostFoundListings;