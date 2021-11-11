import { Icon } from '@iconify/react';
import React, { useRef, useState, useEffect, useContext } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import peopleOutline from '@iconify/icons-eva/people-outline';
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
  DialogActions,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody
} from '@mui/material';
import StudyBuddyContext from '../../../context/studyBuddy/studyBuddyContext';
import { EditStudyBuddy } from '../../authentication/register';
// ----------------------------------------------------------------------

export default function StudyBuddyMoreMenu({ listing }) {
  const [open, setOpen] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  const [openThird, setOpenThird] = useState(false);
  const studyBuddyContext = useContext(StudyBuddyContext);
  const { deleteStudyListing, leaveStudyListing } = studyBuddyContext;

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
        <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: 'text.secondary' }}
          onClick={() => setOpenThird(true)}
        >
          <ListItemIcon>
            <Icon icon={peopleOutline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="View Users" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <Dialog open={openThird} onClose={() => setOpenThird(false)} fullWidth>
          <DialogTitle>View Users</DialogTitle>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Academic Year</TableCell>
                  <TableCell align="left">Course</TableCell>
                  <TableCell align="left">Gender</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listing.users.map((user) => (
                  <TableRow
                    key={user.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="left">
                      {user.name}
                    </TableCell>
                    <TableCell align="left">{user.email}</TableCell>
                    <TableCell align="left">{user.academicYear}</TableCell>
                    <TableCell align="left">{user.course}</TableCell>
                    <TableCell align="left">{user.gender}</TableCell>
                    <TableCell align="left">
                      <Button
                        onClick={() => {
                          leaveStudyListing(listing, user);
                        }}
                      >
                        <Icon icon={trash2Outline} width={24} height={24} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <DialogActions>
            <Button onClick={() => setOpenThird(false)}>Close</Button>
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
      </Menu>
    </>
  );
}
