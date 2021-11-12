import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import {
  Link,
  Card,
  Grid,
  Avatar,
  Typography,
  CardContent,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import trashFill from '@iconify/icons-eva/trash-2-fill';
import plusFill from '@iconify/icons-eva/plus-fill';
import logoutFill from '@iconify/icons-eva/log-out-fill';
import edit2Fill from '@iconify/icons-eva/edit-2-fill';
import { EditStudyBuddy } from '../../authentication/register/editStudyBuddy';
import UserContext from '../../../context/user/userContext';
import StudyBuddyContext from '../../../context/studyBuddy/studyBuddyContext';
import SvgIconStyle from '../../SvgIconStyle';

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
});

const TitleStyle = styled(Link)({
  height: 50,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2)
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled
}));

const InfoStyleSecond = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text
}));

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

StudyBuddyCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number
};

export default function StudyBuddyCard({ listing, index }) {
  const { course, gender, module, yearOfStudy, location, groupsize, users, studyListingOwner } =
    listing;

  const userContext = useContext(UserContext);
  const studyBuddyContext = useContext(StudyBuddyContext);
  const { deleteStudyListing, joinStudyListing, leaveStudyListing } = studyBuddyContext;
  const { user } = userContext;
  const latestPostLarge = index === 1000000;
  const latestPost = index === 100000 || index === 20000;

  const [open, setOpen] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <Flippy flipOnHover>
        <FrontSide>
          <Card sx={{ position: 'relative' }}>
            <CardMediaStyle
              sx={{
                ...((latestPostLarge || latestPost) && {
                  pt: 'calc(100% * 4 / 3)',
                  '&:after': {
                    top: 0,
                    content: "''",
                    width: '100%',
                    height: '100%',
                    position: 'absolute'
                    // bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
                  }
                }),
                ...(latestPostLarge && {
                  pt: {
                    xs: 'calc(100% * 4 / 3)',
                    sm: 'calc(100% * 3 / 4.66)'
                  }
                })
              }}
            >
              <SvgIconStyle
                color="paper"
                src="/static/icons/shape-avatar.svg"
                sx={{
                  width: 80,
                  height: 36,
                  zIndex: 9,
                  bottom: -15,
                  position: 'absolute',
                  ...((latestPostLarge || latestPost) && { display: 'none' })
                }}
              />
              <AvatarStyle
                // alt={userEntity.name}
                // src="https://www.comp.nus.edu.sg/images/resources/content/mapsvenues/COM1_new.jpg"
                sx={{
                  ...((latestPostLarge || latestPost) && {
                    zIndex: 9,
                    top: 24,
                    left: 24,
                    width: 40,
                    height: 40
                  })
                }}
              />
              {location === 'CLB' && (
                <CoverImgStyle
                  alt={location}
                  src="https://blog.nus.edu.sg/linus/files/2021/02/photomania-630f01939d1f02bbefa829f2847238c1-1.jpg"
                />
              )}
              {location === 'COM1' && (
                <CoverImgStyle
                  alt={location}
                  src="https://www.comp.nus.edu.sg/images/resources/content/mapsvenues/COM1_new.jpg"
                />
              )}
              {location === 'UTOWN' && (
                <CoverImgStyle
                  alt={location}
                  src="https://uci.nus.edu.sg/suu/wp-content/uploads/sites/5/2019/11/ERC-Panorama-01-credit-to-Mun-Wai-Custom-Large.jpg"
                />
              )}
              {location === 'ICUBE' && (
                <CoverImgStyle
                  alt={location}
                  src="https://www.comp.nus.edu.sg/images/resources/content/mapsvenues/ICUBE.jpg"
                />
              )}
              {location === 'SCIENCE LIBRARY' && (
                <CoverImgStyle
                  alt={location}
                  src="https://www.streetdirectory.com/stock_images/travel/simg_show/12849533630807/259871_1024/faculty_of_science_s6_national_university_of_singapore_nus/"
                />
              )}
              {location === 'COM2' && (
                <CoverImgStyle
                  alt={location}
                  src="https://www.comp.nus.edu.sg/images/resources/content/mapsvenues/COM2_new.jpg"
                />
              )}
              {location === 'TECHNO EDGE' && (
                <CoverImgStyle
                  alt={location}
                  src="https://nus.edu.sg/alumnet/images/librariesprovider2/mcalumnihappeningsubmissionimages/seat-11-27-2021-3-46-22-pm.png?sfvrsn=3e3ee824_2"
                />
              )}
              {location === 'MOCHTAR RIADY BUILDING' && (
                <CoverImgStyle
                  alt={location}
                  src="http://bschool.nus.edu.sg/wp-content/uploads/2018/09/mrb-1-900x450.jpg"
                />
              )}
              {location === 'HSSML' && (
                <CoverImgStyle
                  alt={location}
                  src="https://libportal.nus.edu.sg/media/ms_teli/HSSML.png"
                />
              )}
            </CardMediaStyle>

            <CardContent
              sx={{
                pt: 4,
                ...((latestPostLarge || latestPost) && {
                  bottom: 0,
                  width: '100%',
                  position: 'absolute'
                })
              }}
            >
              <Typography
                gutterBottom
                variant="caption"
                sx={{ color: 'text.disabled', display: 'block' }}
              >
                Listed By: {users !== undefined && studyListingOwner.name}
              </Typography>
              <TitleStyle
                to="#"
                color="inherit"
                variant="subtitle3"
                underline="hover"
                component={RouterLink}
              >
                {module} Study Group <br />
                Currently: {users.length + 1} / {groupsize}
              </TitleStyle>{' '}
              <InfoStyle> {location}</InfoStyle>
              {user.id === studyListingOwner.id && (
                <Label variant="ghost" color="warning">
                  Owner
                </Label>
              )}
              {user.id !== studyListingOwner.id &&
                users.find((value) => value.id === user.id) === undefined && (
                  <Label variant="ghost" color="success">
                    Open
                  </Label>
                )}
              {users.find((value) => value.id === user.id) !== undefined && (
                <Label variant="ghost" color="error">
                  Joined
                </Label>
              )}
            </CardContent>
          </Card>
        </FrontSide>
        <BackSide>
          <Card sx={{ position: 'relative' }}>
            <CardContent sx={{ color: 'text.primary', fontSize: 12 }}>
              <Typography sx={{ fontWeight: 'bold' }}> Preferences </Typography>
              Module: {module} <br />
              Academic Year: {yearOfStudy} <br />
              Course: {course} <br />
              Group Size: {groupsize} <br />
              Location: {location} <br />
              Gender: {gender} <br />
              <Typography
                gutterBottom
                variant="caption"
                sx={{ color: 'text.disabled', display: 'block' }}
              >
                <br />
                Listed by: {studyListingOwner.name} <br />
                Course: {studyListingOwner.course} <br />
                Academic Year: {studyListingOwner.academicYear} <br />
                Gender: {studyListingOwner.gender}
              </Typography>
              {user !== null && user.id === studyListingOwner.id && (
                <Stack>
                  <Button
                    variant="contained"
                    color="info"
                    startIcon={<Icon icon={edit2Fill} />}
                    onClick={() => setOpenSecond(true)}
                  >
                    Edit
                  </Button>
                  <Dialog open={openSecond} onClose={() => setOpenSecond(false)} fullWidth>
                    <DialogTitle>Edit Study Buddy Listing</DialogTitle>

                    <DialogContent>
                      <EditStudyBuddy handleClose={() => setOpenSecond(false)} listing={listing} />
                    </DialogContent>

                    <DialogActions>
                      <Button onClick={() => setOpenSecond(false)}>Close</Button>
                    </DialogActions>
                  </Dialog>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<Icon icon={trashFill} />}
                    onClick={handleClickOpen}
                  >
                    Delete
                  </Button>
                  <Dialog open={open} onClose={handleCancel}>
                    <DialogTitle>Confirm Delete?</DialogTitle>

                    <DialogActions>
                      {' '}
                      <Button
                        onClick={() => {
                          deleteStudyListing(listing.id);
                          setOpen(false);
                        }}
                      >
                        Yes
                      </Button>
                      <Button onClick={handleCancel}>No</Button>
                    </DialogActions>
                  </Dialog>{' '}
                </Stack>
              )}{' '}
              {user.id !== studyListingOwner.id &&
                users.find((value) => value.id === user.id) === undefined && (
                  <Stack>
                    <Button
                      variant="contained"
                      startIcon={<Icon icon={plusFill} />}
                      onClick={handleClickOpen}
                    >
                      Sign Up Now!
                    </Button>
                    <Dialog open={open} onClose={handleCancel}>
                      <DialogTitle>Apply to {module} study group</DialogTitle>

                      <DialogActions>
                        {' '}
                        <Button
                          onClick={() => {
                            joinStudyListing(listing, user);
                            setOpen(false);
                          }}
                        >
                          Yes
                        </Button>
                        <Button onClick={handleCancel}>No</Button>
                      </DialogActions>
                    </Dialog>{' '}
                  </Stack>
                )}
              {user.id !== studyListingOwner.id &&
                users.find((value) => value.id === user.id) !== undefined && (
                  <Stack>
                    <Button
                      variant="contained"
                      startIcon={<Icon icon={logoutFill} />}
                      onClick={handleClickOpen}
                      color="warning"
                    >
                      Leave Study Group
                    </Button>
                    <Dialog open={open} onClose={handleCancel}>
                      <DialogTitle>Leave {module} study group</DialogTitle>

                      <DialogActions>
                        {' '}
                        <Button
                          onClick={() => {
                            leaveStudyListing(listing, user);
                            setOpen(false);
                          }}
                        >
                          Yes
                        </Button>
                        <Button onClick={handleCancel}>No</Button>
                      </DialogActions>
                    </Dialog>{' '}
                  </Stack>
                )}
            </CardContent>
          </Card>
        </BackSide>
      </Flippy>
    </Grid>
  );
}
