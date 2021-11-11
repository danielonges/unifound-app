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

export default function CreateLostFoundForm({ handleClose }) {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const { user } = userContext;
  const lostAndFoundContext = useContext(LostAndFoundContext);

  const { createLostFoundListing } = lostAndFoundContext;

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      location: '',
      comments: '',
      type: '',
      category: ''
    },
    // validationSchema: RegisterSchema,
    onSubmit: (value) => {
      // if (!listingId) {
      createLostFoundListing(value, user);
      // } else {
      //     console.log(listingId);
      //     console.log(lostAndFoundContext.lostFoundListing);
      //     updateLostFoundListing(value, listingId);
      // }
      handleClose();
    }
  });

    const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  // useEffect(() => {
  //     if (!listingId) return;
  //     if (!lostAndFoundContext.lostFoundListing) {
  //         return <></>;
  //     }
  //     setFieldValue('name', lostAndFoundContext.lostFoundListing.name);
  //     setFieldValue('description', lostAndFoundContext.lostFoundListing.description);
  //     setFieldValue('location', lostAndFoundContext.lostFoundListing.location);
  //     setFieldValue('comments', lostAndFoundContext.lostFoundListing.comments);
  //     setFieldValue('type', lostAndFoundContext.lostFoundListing.type);
  //     setFieldValue('category', lostAndFoundContext.lostFoundListing.category);
  // }, [])

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        label="Name"
                        {...getFieldProps('name')}
                        required
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                    />

                    <TextField
                        fullWidth
                        label="Description"
                        required
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
          <FormControl component="fieldset" required>
            <FormLabel component="legend">Type</FormLabel>
            <RadioGroup row aria-label="type" name="type" required {...getFieldProps('type')}>
              <FormControlLabel value="lost" control={<Radio />} label="Lost" />
              <FormControlLabel value="found" control={<Radio />} label="Found" />
            </RadioGroup>
          </FormControl>

          <Button fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Create Lost And Found Listing
          </Button>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
