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

export default function MyLostFoundListings() {
  const userContext = useContext(UserContext);
  const { user, editUser } = userContext;

  return (
    <Page title="Dashboard: Blog | Minimal-UI">
      {' '}
      <Container sx={{ display: 'flex', flexDirection: 'row' }}>
        <Container />
        <PersistentDrawerRight />
      </Container>
    </Page>
  );
}
