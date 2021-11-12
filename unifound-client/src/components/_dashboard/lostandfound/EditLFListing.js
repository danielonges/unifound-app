/* eslint-disable prettier/prettier */
import { useContext, useEffect, useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import {
  Stack,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Autocomplete,
  Button
} from '@mui/material';
import nuslocation from '../../../_mocks_/nuslocation';
import categories from '../../../_mocks_/categories';
import UserContext from '../../../context/user/userContext';
import LostAndFoundContext from '../../../context/lostAndFound/lostAndFoundContext';

export default function EditLostFoundForm({ listing, handleClose }) {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const { user } = userContext;
  const lostAndFoundContext = useContext(LostAndFoundContext);
  const { updateLostFoundListing } = lostAndFoundContext;

  const formik = useFormik({
    initialValues: {
      name: listing.name,
      description: listing.description,
      location: listing.location,
      comments: listing.comments,
      type: listing.type,
      category: listing.category,
      user: listing.user,
      id: listing.id
    },
    // validationSchema: RegisterSchema,
    onSubmit: (value) => {
      updateLostFoundListing(value, listing.id);
      handleClose();
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Name"
            {...getFieldProps('name')}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />

          <TextField
            fullWidth
            label="Description"
            {...getFieldProps('description')}
            error={Boolean(touched.description && errors.description)}
            helperText={touched.description && errors.description}
          />

          <Autocomplete
            {...getFieldProps}
            disablePortal
            id="location"
            options={nuslocation}
            sx={{ width: 300 }}
            required
            value={formik.initialValues.location}
            onChange={(e, value) => {
              setFieldValue('location', value);
              console.log(value);
            }}
            renderInput={(params) => <TextField {...params} required label="Location" />}
          />

          <Autocomplete
            {...getFieldProps}
            disablePortal
            id="category"
            options={categories}
            sx={{ width: 300 }}
            required
            value={formik.initialValues.category}
            onChange={(e, value) => {
              setFieldValue('category', value);
              console.log(value);
            }}
            renderInput={(params) => <TextField {...params} required label="Category" />}
          />

          <TextField
            fullWidth
            label="Comments"
            {...getFieldProps('comments')}
            error={Boolean(touched.comments && errors.comments)}
            helperText={touched.comments && errors.comments}
          />

          <FormControl component="fieldset">
            <FormLabel component="legend">Type</FormLabel>
            <RadioGroup row aria-label="type" name="type" required {...getFieldProps('type')}>
              <FormControlLabel value="lost" control={<Radio />} label="Lost" />
              <FormControlLabel value="found" control={<Radio />} label="Found" />
            </RadioGroup>
          </FormControl>

          <Button fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Edit Lost And Found Listing
          </Button>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
