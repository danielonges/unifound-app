import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useEffect, useState, useContext } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField
} from '@mui/material';
// components
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import AlertContext from '../context/alert/alertContext';
import ChatContext from '../context/chat/chatContext';
import UserContext from '../context/user/userContext';

import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import {
  ChatArea,
  ChatAreaToolbar,
  ChatListHead,
  ChatListToolbar,
  ChatMoreMenu,
  ChatReplyBar
} from '../components/_dashboard/chat';

import USERLIST from '../_mocks_/user';

const TableRowStyle = styled(TableRow)(({ theme }) => ({
  height: 96,
  padding: theme.spacing(0, 1, 0, 3)
}));

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Chats() {
  const alertContext = useContext(AlertContext);
  const chatContext = useContext(ChatContext);
  const userContext = useContext(UserContext);

  const { setAlert } = alertContext;
  const { chats, createChat, getUserChats } = chatContext;
  const { user } = userContext;

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currChat, setCurrChat] = useState(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(null);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  useEffect(() => {
    const refreshChats = setInterval(async () => {
      console.log('Got my chats');
      await getUserChats(user.id);
      //   if (currChat !== null) {
      //     setCurrChat(chats.find((chat) => chat.id === currChat.id));
      //   }
    }, 3000);
    return () => clearInterval(refreshChats);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getUserChats(user.id);
    if (currChat) {
      setCurrChat(chats.find((chat) => chat.id === currChat.id));
    }
    // eslint-disable-next-line
  }, [JSON.stringify(chats)]);

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (e) => {
    setFilterName(e.target.value);
  };

  const onClickChat = (e, row) => {
    e.preventDefault();
    setCurrChat(row);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onCreateChat = () => {
    if (name === null || name === '') {
      setAlert('Chat title must be provided!', 'error');
    } else {
      const chat = {
        name
      };
      createChat(chat, user.id);
    }
  };

  const onChatNameChange = (e) => {
    setName(e.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Chats | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Chats
          </Typography>
          <Button variant="contained" onClick={handleOpen} startIcon={<Icon icon={plusFill} />}>
            New Chat
          </Button>
        </Stack>

        <Card>
          <Grid container spacing={2}>
            <Grid item xs={4} sx={{ padding: 2, borderRight: '1px solid lightgray' }}>
              <ChatListToolbar
                numSelected={selected.length}
                filterName={filterName}
                onFilterName={handleFilterByName}
              />
              <Typography variant="h5" gutterBottom ml={3}>
                All Chats
              </Typography>
              <Divider />
              <Scrollbar>
                <TableContainer>
                  <Table>
                    <TableBody>
                      {chats !== null &&
                        chats
                          .filter((row) =>
                            filterName.length > 0 ? row.name.startsWith(filterName) : true
                          )
                          .sort((a, b) => a.id - b.id)
                          .map((row) => {
                            const { id, name } = row;
                            const isItemSelected = selected.indexOf(name) !== -1;

                            return (
                              <TableRowStyle
                                hover
                                key={id}
                                tabIndex={-1}
                                role="checkbox"
                                selected={isItemSelected}
                                aria-checked={isItemSelected}
                                onClick={(e) => onClickChat(e, row)}
                              >
                                <TableCell padding="checkbox">
                                  <ChatBubbleOutlineIcon sx={{ margin: 2 }} />
                                </TableCell>
                                <TableCell align="left">{name}</TableCell>
                              </TableRowStyle>
                            );
                          })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>
            </Grid>
            <Grid item xs={8}>
              <ChatAreaToolbar chat={currChat && currChat} />
              <ChatArea chat={currChat ? currChat.messages : null} />
              {currChat && <ChatReplyBar userId={user.id} chatId={currChat.id} />}
            </Grid>
          </Grid>
        </Card>
        {/* create chat dialog */}
        <Dialog open={open} onClose={handleClose} fullWidth>
          <DialogTitle>New Chat</DialogTitle>

          <Box component="form" onSubmit={onCreateChat}>
            <DialogContent>
              <DialogContentText>Create new chat</DialogContentText>
              <TextField
                fullWidth
                name="name"
                label="Chat Title"
                id="name"
                required
                onChange={onChatNameChange}
                sx={{ mt: 3 }}
              />
            </DialogContent>

            <DialogActions>
              <Button type="submit">Create</Button>
              <Button onClick={handleClose} color="error">
                Close
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </Container>
    </Page>
  );
}
