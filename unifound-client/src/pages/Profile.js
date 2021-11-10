import React, { useState, useEffect, useContext, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import {
  Box,
  Card,
  Link,
  Container,
  Typography,
  CardContent,
  Button,
  CardActions,
  Avatar,
  IconButton,
  InputAdornment
} from '@mui/material';
import { green } from '@mui/material/colors';
import PersistentDrawerRight from '../components/_dashboard/profile/PersistentDrawerRight';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
// import { RegisterForm } from '../components/authentication/register';
import AuthSocial from '../components/authentication/AuthSocial';
import UserContext from '../context/user/userContext';

// ----------------------------------------------------------------------

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5'
  }
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.success.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center'
  // padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Profile() {
  const userContext = useContext(UserContext);
  const { user, editUser } = userContext;

  const [disabled, setDisable] = useState(true);
  const handleEdit = (event) => {
    event.preventDefault();
    setDisable(false);
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setDisable(true);
    setShowPassword(false);
  };

  const handleConfirm = (event) => {
    event.preventDefault();
    editUser(tempUser);
    setDisable(true);
    setShowPassword(false);
  };

  const [tempUser, setUser] = useState(user);
  const { name, email, password } = tempUser;
  const onChange = (event) => setUser({ ...tempUser, [event.target.name]: event.target.value });

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <Page title="Dashboard: Blog | Minimal-UI">
      {' '}
      <Container sx={{ display: 'flex', flexDirection: 'row' }}>
        <Container>
          <ContentStyle>
            <Avatar sx={{ m: 1, bgcolor: green[500] }} style={{ alignSelf: 'center' }} />
            <Typography component="h1" variant="h5" style={{ alignSelf: 'center' }}>
              My Profile
            </Typography>
            <br />
            <TextField
              fullWidth
              label="Name"
              disabled={disabled}
              defaultValue={user.name}
              onChange={onChange}
              name="name"
              value={name}
              style={{ alignSelf: 'center' }}
            />{' '}
            <br />
            {/* <label for="email"> Email </label> */}
            <TextField
              fullWidth
              disabled={disabled}
              label="Email"
              defaultValue={user.email}
              onChange={onChange}
              name="email"
              value={email}
              style={{ alignSelf: 'center' }}
            />
            <br />
            <TextField
              fullWidth
              disabled={disabled}
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password}
              defaultValue={user.password}
              onChange={onChange}
              style={{ alignSelf: 'center' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <br />
            {/* <label for="gender"> Gender </label> */}
            <TextField
              fullWidth
              disabled
              label="Gender"
              defaultValue={user.gender}
              style={{ alignSelf: 'center' }}
            />
            <br />
            {/* <label for="academicYear"> Gender </label> */}
            <TextField
              fullWidth
              disabled
              label="Academic Year"
              defaultValue={user.academicYear}
              style={{ alignSelf: 'center' }}
            />
            <br />
            <TextField
              fullWidth
              disabled
              label="Course"
              defaultValue={user.course}
              style={{ alignSelf: 'center' }}
            />
            <br />
            {disabled && (
              <Button variant="contained" onClick={handleEdit}>
                {' '}
                Edit profile
              </Button>
            )}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {!disabled && (
                <Button variant="contained" onClick={handleConfirm}>
                  {' '}
                  Confirm
                </Button>
              )}
              {!disabled && (
                <Button variant="contained" onClick={handleCancel} color="error">
                  Cancel
                </Button>
              )}
            </div>
          </ContentStyle>
        </Container>
        <PersistentDrawerRight />
      </Container>
    </Page>
  );
}
