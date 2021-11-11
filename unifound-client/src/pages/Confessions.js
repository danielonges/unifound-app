/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import { Container, Button, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Stack } from '@mui/material';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import CreateConfession from '../components/_dashboard/confessions/CreateConfession';
import Page from '../components/Page';
import AnnouncementContext from '../context/announcement/announcementContext';
import Confessions from '../components/_dashboard/confessions/Confessions';

export default function ConfessionDashboard() {
  const [open, setOpen] = React.useState(false);

  const announcementContext = useContext(AnnouncementContext);
  const { announcements, getAnnouncements } = announcementContext;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Page title="Unifound: Dashboard">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Whispers
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            onClick={handleClickOpen}
          >
            Post something here!
          </Button>
        </Stack>
        <Stack>
          <Typography variant="subtitle2" sx={{ mb: 5 }}>
            A space for you to share anything annonymously.
          </Typography>
        </Stack>
        <Stack>
          <div>
            <Dialog open={open} onClose={handleClose} fullWidth>
              <DialogTitle>Have something to share?</DialogTitle>

              <DialogContent>
                <DialogContentText>It's completely annonymous but please be nice!</DialogContentText>
                <CreateConfession handleClose={handleClose} />
              </DialogContent>

              <DialogActions>
                <Button onClick={handleClose}>Close</Button>
              </DialogActions>
            </Dialog>
          </div>
        </Stack>

        <Confessions />
      </Container>
    </Page>
  );
}