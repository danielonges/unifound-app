import React, { useState, useEffect, useContext, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  Card,
  Link,
  Container,
  Typography,
  CardContent,
  Button,
  CardActions,
  Avatar
} from '@mui/material';
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
  };

  const handleConfirm = (event) => {
    event.preventDefault();
    editUser(tempUser);
    setDisable(true);
  };

  const [tempUser, setUser] = useState(user);
  const { name, email, password } = tempUser;
  const onChange = (event) => setUser({ ...tempUser, [event.target.name]: event.target.value });

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Page title="Dashboard: Blog | Minimal-UI">
      <Container>
        <ContentStyle>
          {/*  <div>
          <Button
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            <MenuIcon />
          </Button>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem>
              <ListItemIcon>
                <SendIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="View profile" />
            </StyledMenuItem>
            <StyledMenuItem>
              <ListItemIcon>
                <DraftsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="My lost and found listings" />
            </StyledMenuItem>
            <StyledMenuItem>
              <ListItemIcon>
                <InboxIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="My study buddies listings" />
            </StyledMenuItem>
          </StyledMenu>
        </div> */}
          <Avatar sx={{ m: 1, bgcolor: 'forestgreen' }} style={{ alignSelf: 'center' }}>
            <AccountCircleOutlinedIcon />
          </Avatar>
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
            name="password"
            value={password}
            defaultValue={user.password}
            onChange={onChange}
            style={{ alignSelf: 'center' }}
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
          {!disabled && (
            <Button variant="contained" onClick={handleConfirm}>
              {' '}
              Confirm
            </Button>
          )}
          <br />
          {!disabled && (
            <Button variant="contained" onClick={handleCancel}>
              Cancel
            </Button>
          )}
        </ContentStyle>
      </Container>
    </Page>
  );
}
