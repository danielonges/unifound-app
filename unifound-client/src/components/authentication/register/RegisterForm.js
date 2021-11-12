import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Autocomplete,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import course from '../../../_mocks_/course';
import yearOfStudy from '../../../_mocks_/yearOfStudy';
import UserContext from '../../../context/user/userContext';
import AlertContext from '../../../context/alert/alertContext';
import AlertBar from '../../AlertBar';

// ----------------------------------------------------------------------

export default function RegisterForm(props) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const userContext = useContext(UserContext);
  const { error, createUser, isAuthenticated, clearErrors } = userContext;
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      gender: '',
      course: '',
      academicYear: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (value) => {
      createUser(value);
    }
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard/app', { replace: true });
    }

    if (error) {
      setAlert(error, 'error');
      clearErrors();
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  return (
    <FormikProvider value={formik}>
      <AlertBar />
      <br />
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
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <Autocomplete
            disablePortal
            id="academicYear"
            options={yearOfStudy}
            sx={{ width: 300 }}
            required
            onChange={(e, value) => setFieldValue('academicYear', value)}
            renderInput={(params) => <TextField {...params} required label="Year Of Study" />}
          />
          <Autocomplete
            disablePortal
            id="course"
            options={course}
            sx={{ width: 300 }}
            required
            onChange={(e, value) => setFieldValue('course', value)}
            renderInput={(params) => <TextField {...params} required label="Course" />}
          />

          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup row aria-label="gender" name="gender" required {...getFieldProps('gender')}>
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
            </RadioGroup>
          </FormControl>

          <Button fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Register
          </Button>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
