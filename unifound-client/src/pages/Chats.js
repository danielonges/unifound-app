import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
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
  Divider
} from '@mui/material';
// components
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import {
  ChatArea,
  ChatAreaToolbar,
  ChatListHead,
  ChatListToolbar,
  ChatMoreMenu
} from '../components/_dashboard/chat';

import USERLIST from '../_mocks_/user';

const TableRowStyle = styled(TableRow)(({ theme }) => ({
  height: 96,
  padding: theme.spacing(0, 1, 0, 3)
}));

const MESSAGES_1 = [
  {
    messageBody: 'Hello!1',
    username: 'John'
  },
  {
    messageBody: 'Bye1!',
    username: 'Peter'
  },
  {
    messageBody: 'What?1',
    username: 'Bob'
  }
];

const MESSAGES_2 = [
  {
    messageBody: 'Hello2!',
    username: 'John'
  },
  {
    messageBody: 'Bye2!',
    username: 'Peter'
  },
  {
    messageBody: 'What2?',
    username: 'Bob'
  }
];

const MESSAGES_3 = [
  {
    messageBody: 'Hello3!',
    username: 'John'
  },
  {
    messageBody: 'Bye3!',
    username: 'Peter'
  },
  {
    messageBody: 'What3?',
    username: 'Bob'
  }
];

const CHATS = [
  {
    id: 1,
    name: 'Chat 1',
    messages: MESSAGES_1
  },
  {
    id: 2,
    name: 'Chat 2',
    messages: MESSAGES_2
  },
  {
    id: 3,
    name: 'Chat 3',
    messages: MESSAGES_3
  }
];

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
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currChat, setCurrChat] = useState(null);

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

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const onClickChat = (e, row) => {
    e.preventDefault();
    console.log('hi');
    setCurrChat(row);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="User | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Chats
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
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
                      {CHATS.map((row) => {
                        const { id, name, messages } = row;
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
                              <Checkbox
                                checked={isItemSelected}
                                onChange={(event) => handleClick(event, name)}
                              />
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
                    {isUserNotFound && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                            <SearchNotFound searchQuery={filterName} />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Scrollbar>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={USERLIST.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Grid>
            <Grid item xs={8}>
              <ChatAreaToolbar />
              <ChatArea chat={currChat === null ? null : currChat.messages} />
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Page>
  );
}
