import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import { Form, useFormik, FormikProvider } from 'formik';
// material
import { styled } from '@mui/material/styles';
import { Box, TextField, Autocomplete, InputAdornment } from '@mui/material';
import { handleBreakpoints } from '@mui/system';
// context
import StudyBuddyContext from '../../../context/studyBuddy/studyBuddyContext';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  '& .MuiAutocomplete-root': {
    width: 200,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    }),
    '&.Mui-focused': {
      width: 240,
      '& .MuiAutocomplete-inputRoot': {
        boxShadow: theme.customShadows.z12
      }
    }
  },
  '& .MuiAutocomplete-inputRoot': {
    '& fieldset': {
      borderWidth: `1px !important`,
      borderColor: `${theme.palette.grey[500_32]} !important`
    }
  },
  '& .MuiAutocomplete-option': {
    '&:not(:last-child)': {
      borderBottom: `solid 1px ${theme.palette.divider}`
    }
  }
}));

// ----------------------------------------------------------------------

BlogPostsSearch.propTypes = {
  posts: PropTypes.array.isRequired
};

export default function BlogPostsSearch({ listing }) {
  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }
  const studyBuddyContext = useContext(StudyBuddyContext);
  const { getStudyListingByModule } = studyBuddyContext;

  const formik = useFormik({
    initialValues: {
      module: ''
    },

    onSubmit: (value) => {
      console.log(value);
      getStudyListingByModule(value);
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  const optionsUnique = getUniqueListBy(listing, 'module');

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <RootStyle>
          <Autocomplete
            size="small"
            disablePortal
            popupIcon={null}
            options={optionsUnique}
            getOptionLabel={(option) => option.module}
            onChange={(e, value) => setFieldValue('module', value.module)}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search modules..."
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
        </RootStyle>
      </Form>
    </FormikProvider>
  );
}
