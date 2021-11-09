import * as Yup from 'yup';
import { useState, useContext } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Autocomplete,
  Button
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import modules from '../../../_mocks_/modules';
import course from '../../../_mocks_/course';
import yearOfStudy from '../../../_mocks_/yearOfStudy';
import location from '../../../_mocks_/location';
import UserContext from '../../../context/user/userContext';
import StudyBuddyContext from '../../../context/studyBuddy/studyBuddyContext';
// ----------------------------------------------------------------------

export default function EditStudyBuddy({ handleClose, listing }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const userContext = useContext(UserContext);
  const { user } = userContext;
  const studyBuddyContext = useContext(StudyBuddyContext);

  const { editStudyListing } = studyBuddyContext;

  const RegisterSchema = Yup.object().shape({
    gender: Yup.string().required('Gender is required'),
    groupsize: Yup.number().integer().min(2).required('Group Size is required')
  });

  const formik = useFormik({
    initialValues: {
      gender: listing.gender,
      module: listing.module,
      course: listing.course,
      yearOfStudy: listing.yearOfStudy,
      location: listing.location,
      groupsize: listing.groupsize,
      id: listing.id,
      users: listing.users
    },
    validationSchema: RegisterSchema,
    onSubmit: (value) => {
      console.log(value);
      editStudyListing(value);
      handleClose();
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Autocomplete
            disablePortal
            id="course"
            options={course}
            sx={{ width: 300 }}
            required
            value={formik.initialValues.course}
            onChange={(e, value) => setFieldValue('course', value)}
            renderInput={(params) => <TextField {...params} required label="Course" />}
          />

          <Autocomplete
            disablePortal
            id="module"
            options={modules}
            sx={{ width: 300 }}
            required
            value={formik.initialValues.module}
            onChange={(e, value) => setFieldValue('module', value)}
            renderInput={(params) => <TextField {...params} required label="Module" />}
          />

          <Autocomplete
            disablePortal
            id="yearOfStudy"
            options={yearOfStudy}
            sx={{ width: 300 }}
            required
            value={formik.initialValues.yearOfStudy}
            onChange={(e, value) => setFieldValue('yearOfStudy', value)}
            renderInput={(params) => <TextField {...params} required label="Year Of Study" />}
          />

          <Autocomplete
            {...getFieldProps}
            disablePortal
            id="location"
            options={location}
            sx={{ width: 300 }}
            required
            value={formik.initialValues.location}
            onChange={(e, value) => setFieldValue('location', value)}
            renderInput={(params) => <TextField {...params} required label="Location" />}
          />

          <TextField
            fullWidth
            label="Group Size"
            {...getFieldProps('groupsize')}
            error={Boolean(touched.groupsize && errors.groupsize)}
            helperText={touched.groupsize && errors.groupsize}
          />

          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup row aria-label="gender" name="gender" required {...getFieldProps('gender')}>
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
            </RadioGroup>
          </FormControl>

          <Button fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Edit Listing
          </Button>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
