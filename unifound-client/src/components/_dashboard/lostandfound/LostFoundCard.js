/* eslint-disable prefer-template */
/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import { useContext, useState } from 'react'
import { DialogActions, DialogTitle, Card, Link, Typography, Stack, Button, Dialog, DialogContent, DialogContentText } from '@mui/material';
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
import trashFill from '@iconify/icons-eva/trash-2-fill';
import { styled } from '@mui/material/styles';
import lostAndFoundContext from '../../../context/lostAndFound/lostAndFoundContext';
import userContext from '../../../context/user/userContext';
import EditLostFoundForm from './EditLFListing';

LostFoundCard.propTypes = {
  lostFoundItem: PropTypes.object
};

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%'
}));

export default function LostFoundCard({ lostFoundItem }) {

  const lostFoundContext = useContext(lostAndFoundContext);
  const { deleteLostFoundListing } = lostFoundContext;
  const { currentUser } = useContext(userContext);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleClickOpenEdit = () => setEditOpen(true);
  const handleCloseEdit = () => setEditOpen(false);
  const handleCancel = () => setDeleteOpen(false);

  const { id, name, description, location, comments, type, user } = lostFoundItem;
  return (
    <SectionStyle>
      <Stack spacing={2} sx={{ p: 3 }}>
        {/* <Link to={{ pathname: "/dashboard/viewlostfound/" + id }} color="inherit" underline="hover" component={RouterLink}> */}
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>
        {/* </Link> */}

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}
          {description}
          <Typography variant="subtitle1">
            &nbsp;
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}
          Location: {location}
          <Typography variant="subtitle1">
            &nbsp;
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}
          {comments}
          <Typography variant="subtitle1">
            &nbsp;
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}
          Posted by: {user.name}
          {/* {JSON.stringify(user)} */}
          <Typography variant="subtitle3">
            &nbsp;
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}
          <Typography variant="subtitle3">
            {type.toUpperCase()}
            &nbsp;
          </Typography>
        </Stack>

        {(lostFoundItem.user.id === JSON.parse(localStorage.getItem("user")).id) ?
          <Stack>
            <Button
              variant="contained"
              component={Link}
              to="#"
              startIcon={<Icon icon={editFill} />}
              onClick={handleClickOpenEdit}
            >
              Edit Listing
            </Button>
            <Dialog open={editOpen} onClose={handleCloseEdit} fullWidth>
              <DialogTitle>Edit a Lost And Found Listing</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {' '}
                  Please provide more details on the item that you have lost or found.{' '}
                </DialogContentText>
                <EditLostFoundForm listing={lostFoundItem} handleClose={handleCloseEdit} />
              </DialogContent>

              <DialogActions>
                <Button onClick={handleCloseEdit}>Close</Button>
              </DialogActions>
            </Dialog>
          </Stack>
          : ''}

        {(lostFoundItem.user.id === JSON.parse(localStorage.getItem("user")).id) ?
          <Stack>
            <Button
              variant="contained"
              startIcon={<Icon icon={trashFill} />}
              style={{ backgroundColor: '#FF0000', color: '#FFFFFF' }}
              onClick={() => { setDeleteOpen(true) }}>
              Delete
            </Button>
            {/* : ''} */}
            {/* </Stack> */}
            <Dialog open={deleteOpen} onClose={handleCancel}>
              <DialogTitle>Confirm Delete?</DialogTitle>

              <DialogActions>
                {' '}
                <Button
                  onClick={() => {
                    deleteLostFoundListing(lostFoundItem.id);
                    setDeleteOpen(false);
                  }}
                >
                  Yes
                </Button>
                <Button onClick={handleCancel}>No</Button>
              </DialogActions>
            </Dialog>{' '}
          </Stack>
          : ''}
      </Stack>
    </SectionStyle>
  );
}