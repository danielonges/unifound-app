import { Icon } from '@iconify/react';
import React, { useRef, useState, useEffect, useContext } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';

// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import StudyBuddyContext from '../../../context/studyBuddy/studyBuddyContext';
import { EditStudyBuddy } from '../../authentication/register';
// ----------------------------------------------------------------------

export default function StudyBuddyMoreMenu({ listing }) {
  const [open, setOpen] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  const studyBuddyContext = useContext(StudyBuddyContext);
  const { deleteStudyListing } = studyBuddyContext;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }} onClick={() => setOpenSecond(true)}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <Dialog open={openSecond} onClose={() => setOpenSecond(false)}>
          <DialogTitle>Confirm Delete?</DialogTitle>

          <DialogActions>
            {' '}
            <Button
              onClick={() => {
                deleteStudyListing(listing.id);
                setOpenSecond(false);
              }}
            >
              Yes
            </Button>
            <Button onClick={() => setOpenSecond(false)}>No</Button>
          </DialogActions>
        </Dialog>

        <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: 'text.secondary' }}
          onClick={handleClickOpen}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <Dialog open={open} onClose={handleClose} fullWidth>
          <DialogTitle>Edit Study Buddy Listing</DialogTitle>

          <DialogContent>
            <EditStudyBuddy handleClose={handleClose} listing={listing} />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Menu>
    </>
  );
}
