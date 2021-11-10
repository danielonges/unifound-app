/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
// material
import React from 'react'
import { MenuItem, Box, TextField, Autocomplete, InputAdornment, Stack } from '@mui/material';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';

// ----------------------------------------------------------------------

const FILTER_OPTIONS = [
  { value: 'lost', label: 'Lost' },
  { value: 'found', label: 'Found' }
];

const SEARCHFIELD_OPTIONS = [
  { value: 'name', label: 'Name' },
  { value: 'category', label: 'Category' }
];

export default function LostFoundFilter({ dataList, filter, setFilter }) {

  const getUniqueListOptionsBy = (arr, key) => [...new Map(arr.map((item) => [item[key], item])).values()].map(e => e[key]);
  const uniqueDataListOptions = {
    'name': getUniqueListOptionsBy(dataList, 'name'),
    'category': getUniqueListOptionsBy(dataList, 'category')
  };

  const onFilterChange = (e) => {
    setFilter({
      ...filter,
      'filterType': e.target.value
    })
  };

  const onSearchValueChange = (newValue) => {
    setFilter({
      ...filter,
      'searchValue': newValue
    })
  }

  const onSearchFieldChange = (e) => {
    setFilter({
      ...filter,
      'searchField': e.target.value
    })
  }

  console.log(uniqueDataListOptions);

  return (
    <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">

      <Autocomplete
      size="small"
      disablePortal
      style={{ width: 300 }}
      popupIcon={null}
      options={uniqueDataListOptions[filter.searchField]}
      getOptionLabel={(option) => option}
      onChange={(e, value) => onSearchValueChange(e.target.innerHTML)}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search listings..."
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <>
                <InputAdornment position="start">
                  <Box
                    component={Icon}
                    icon={searchFill}
                    sx={{
                      ml: 1,
                      width: 20,
                      height: 20,
                      color: 'text.disabled'
                    }}
                  />
                </InputAdornment>
                {params.InputProps.startAdornment}
              </>
            )
          }}
        />
      )}
      />

      <TextField select size="small" value={filter.searchField} onChange={onSearchFieldChange}>
        {SEARCHFIELD_OPTIONS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
        
      <TextField select size="small" value={filter.filterType} onChange={onFilterChange}>
        {FILTER_OPTIONS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

    </Stack>
  );
}