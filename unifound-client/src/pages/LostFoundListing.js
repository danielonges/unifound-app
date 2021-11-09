/* eslint-disable react/jsx-fragments */
/* eslint-disable prettier/prettier */
import React, { useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
import CreateLostFoundForm from '../components/_dashboard/lostandfound/CreateLFListing';
import lostAndFoundContext from '../context/lostAndFound/lostAndFoundContext';
import userContext from '../context/user/userContext';

export const LostFoundListing = (props) => {
  const [open, setOpen] = React.useState(false);
  const { id } = useParams();
  const lostFoundContext = useContext(lostAndFoundContext);
  const { getLostFoundListing } = lostFoundContext;
  const { user } = userContext;
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getLostFoundListing(id);
  }, []);

  if (!lostFoundContext.lostFoundListing) {
    return <></>
  }
  return (
    <React.Fragment>
      {(lostFoundContext.lostFoundListing.user.id === JSON.parse(localStorage.getItem("user")).id) ?
      <Button
        variant="contained"
        component={Link}
        to="#"
        startIcon={<Icon icon={editFill} />}
        onClick={handleClickOpen}
      >
        Edit Listing
      </Button> : ''}
      <h1>{lostFoundContext.lostFoundListing.name}</h1>

      {JSON.stringify(lostFoundContext.lostFoundListing)}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Edit a Lost And Found Listing</DialogTitle>

        <DialogContent>
          <DialogContentText>
            {' '}
            Please provide more details on the item that you have lost or found.{' '}
          </DialogContentText>
          <CreateLostFoundForm listingId={id} handleClose={handleClose} />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default LostFoundListing;
