import React, { createRef, useContext, useEffect } from 'react';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';

// material
import {
  Grid,
  Button,
  Container,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';

import StudyBuddyContext from '../context/studyBuddy/studyBuddyContext';
import Page from '../components/Page';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../components/_dashboard/studybuddy';
import { StudyBuddyForm } from '../components/authentication/register';

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

export default function StudyBuddy(props) {
  const [open, setOpen] = React.useState(false);

  const studyBuddyContext = useContext(StudyBuddyContext);
  const { studyBuddyListings, getStudyListings } = studyBuddyContext;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getStudyListings();
  }, []);

  return (
    <Page title="Unifound: Study Buddy">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Find your study buddy
          </Typography>

          <div>
            <Button
              variant="contained"
              component={RouterLink}
              to="#"
              startIcon={<Icon icon={plusFill} />}
              onClick={handleClickOpen}
            >
              New Listing
            </Button>

            <Dialog open={open} onClose={handleClose} fullWidth>
              <DialogTitle>Create a Study Buddy Listing</DialogTitle>

              <DialogContent>
                <DialogContentText> Preferred Study Buddy Details </DialogContentText>
                <StudyBuddyForm handleClose={handleClose} />
              </DialogContent>

              <DialogActions>
                <Button onClick={handleClose}>Close</Button>
              </DialogActions>
            </Dialog>
          </div>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch listing={studyBuddyListings} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>

        <Grid container spacing={3}>
          {studyBuddyListings.map((listing, index) => (
            <BlogPostCard key={listing.id} listing={listing} index={index} />
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
