/* eslint-disable prettier/prettier */
import * as Yup from 'yup';
import { useState, useContext, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { LoadingButton } from '@mui/lab';

// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  Button
} from '@mui/material';
import UserContext from '../../../context/user/userContext';
import AlertContext from '../../../context/alert/alertContext';
import AlertBar from '../../AlertBar';
// ----------------------------------------------------------------------

export default function LoginForm(props) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [displayMessage, setDisplayMessage] = useState('');
  const userContext = useContext(UserContext);
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const { error, login, isAuthenticated, clearErrors } = userContext;

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
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

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
      // remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: (user) => {
      login(user);

      // navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      {' '}
      <AlertBar />
      <br />
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            name="email"
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
            name="password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Button
          sx={{ mt: 3 }}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          // loading={isSubmitting}
        >
          Login
        </Button>
      </Form>
    </FormikProvider>
  );
}
