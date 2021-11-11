import { Icon } from '@iconify/react';
import { useContext, useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
  Card,
  Typography,
  Grid
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';

import ChatContext from '../../../context/chat/chatContext';
import UserContext from '../../../context/user/userContext';
// ----------------------------------------------------------------------

export default function ChatMoreMenu({ chat }) {
  const chatContext = useContext(ChatContext);
  const userContext = useContext(UserContext);
  const { addToChat, deleteChatForAll, deleteChatForUser } = chatContext;
  const { user } = userContext;
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dialogViewOpen, setDialogViewOpen] = useState(false);
  const [dialogAddOpen, setDialogAddOpen] = useState(false);
  const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false);
  const [chatUsers, setChatUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const handleViewClose = () => {
    setDialogViewOpen(false);
  };

  const handleViewOpen = async () => {
    setDialogViewOpen(true);
    const res = await axios.get(`/chat/${chat.id}/users`);
    setChatUsers(res.data);
  };

  const handleAddClose = () => {
    setDialogAddOpen(false);
  };

  const handleAddOpen = async () => {
    setDialogAddOpen(true);
    const res = await axios.get('/user');
    setAllUsers(res.data);
  };

  const handleDeleteOpen = () => {
    setDialogDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDialogDeleteOpen(false);
  };

  const onDeleteUser = (e, chatUserId) => {
    deleteChatForUser(chat.id, chatUserId);
    setChatUsers([...chatUsers].filter((chatUser) => chatUser.id !== chatUserId));
  };

  const onAddUser = (e, user) => {
    addToChat(chat, user.id);
    user.chats.push(chat);
  };

  const onDeleteChat = () => {
    deleteChatForAll(chat.id, user.id);
  };

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
        {chat.ownerId === user.id && (
          <MenuItem onClick={handleDeleteOpen} sx={{ color: 'text.secondary' }}>
            <ListItemIcon>
              <Icon icon={trash2Outline} width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        )}

        <MenuItem onClick={handleViewOpen} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={peopleFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="View Users" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        {chat.ownerId === user.id && (
          <MenuItem onClick={handleAddOpen} sx={{ color: 'text.secondary' }}>
            <ListItemIcon>
              <Icon icon={personAddFill} width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Add User" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        )}
      </Menu>

      {/* delete chat dialog */}
      <Dialog open={dialogDeleteOpen} onClose={handleDeleteClose} fullWidth>
        <DialogTitle>Delete Chat</DialogTitle>

        <DialogContent>
          <DialogContentText>Are you sure you want to delete this chat?</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={onDeleteChat} color="error">
            Delete
          </Button>
          <Button onClick={handleDeleteClose}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* view users dialog */}
      <Dialog open={dialogViewOpen} onClose={handleViewClose} fullWidth>
        <DialogTitle>{chat.name}</DialogTitle>

        <DialogContent>
          <DialogContentText>View all users of the chat</DialogContentText>
          {chatUsers.map((chatUser) => (
            <Card key={chatUser.id} sx={{ padding: 3, margin: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={10}>
                  <Typography variant="h6">{chatUser.name}</Typography>
                  <Typography variant="caption" gutterBottom>
                    {chatUser.course}
                  </Typography>
                  <br />
                  <Typography variant="body">{chatUser.email}</Typography>
                </Grid>
                {chat.ownerId === user.id && chatUser.id !== user.id && (
                  <Grid item xs={2}>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={(e) => onDeleteUser(e, chatUser.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                )}
              </Grid>
            </Card>
          ))}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleViewClose}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* add user dialog */}
      <Dialog open={dialogAddOpen} onClose={handleAddClose} fullWidth>
        <DialogTitle>Add user to {chat.name}</DialogTitle>

        <DialogContent>
          <DialogContentText>Select user to add:</DialogContentText>
          {allUsers
            .filter((u) => u.id !== user.id)
            .map((u) => (
              <Card key={u.id} sx={{ padding: 3, margin: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={10}>
                    <Typography variant="h6">{u.name}</Typography>
                    <Typography variant="caption" gutterBottom>
                      {u.course}
                    </Typography>
                    <br />
                    <Typography variant="body">{u.email}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    {u.chats.filter((c) => c.id === chat.id).length > 0 ? (
                      'In chat already!'
                    ) : (
                      <IconButton aria-label="add" color="primary" onClick={(e) => onAddUser(e, u)}>
                        <PersonAddIcon />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
              </Card>
            ))}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleAddClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
