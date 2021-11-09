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
import plusFill from '@iconify/icons-eva/plus-fill';
import CreateLostFoundForm from '../components/_dashboard/lostandfound/CreateLFListing';
import lostAndFoundContext from '../context/lostAndFound/lostAndFoundContext';

export const LostFoundListing = (props) => {
  const [open, setOpen] = React.useState(false);
  const { id } = useParams();
  const lostFoundContext = useContext(lostAndFoundContext);
  const { getLostFoundListing } = lostFoundContext;
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getLostFoundListing(id);
    console.log(getLostFoundListing(id));
  }, []);

  return (
    <React.Fragment>
      <Button
        variant="contained"
        component={Link}
        to="#"
        startIcon={<Icon icon={plusFill} />}
        onClick={handleClickOpen}
      >
        Edit Listing
      </Button>
      <h1>{JSON.stringify(getLostFoundListing)}</h1>

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
