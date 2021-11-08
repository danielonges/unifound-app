/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Container,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';

import CreateLostFoundForm from '../components/_dashboard/lostandfound/CreateLFListing';
import Page from '../components/Page';
import { LostFoundListings } from '../components/_dashboard/lostandfound';

export default function Chats() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const [openFilter, setOpenFilter] = useState(false);

  // const formik = useFormik({
  //   initialValues: {
  //     gender: '',
  //     category: '',
  //     colors: '',
  //     priceRange: '',
  //     rating: ''
  //   },
  //   onSubmit: () => {
  //     setOpenFilter(false);
  //   }
  // });

  // const { resetForm, handleSubmit } = formik;

  // const handleOpenFilter = () => {
  //   setOpenFilter(true);
  // };

  // const handleCloseFilter = () => {
  //   setOpenFilter(false);
  // };

  // const handleResetFilter = () => {
  //   handleSubmit();
  //   resetForm();
  // };

  return (
    <Page title="Dashboard: Products | Minimal-UI">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Chats
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
            <DialogTitle>Create a Lost And Found Listing</DialogTitle>

            <DialogContent>
              <DialogContentText>
                {' '}
                Please provide more details on the item that you have lost or found.{' '}
              </DialogContentText>
              <CreateLostFoundForm listingId={null} handleClose={handleClose} />
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>

        <LostFoundListings />
      </Container>
    </Page>
  );
}
