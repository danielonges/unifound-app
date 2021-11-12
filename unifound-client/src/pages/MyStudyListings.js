import React, { useState, useEffect, useContext } from 'react';
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
// components
import PersistentDrawerRight from '../components/_dashboard/profile/PersistentDrawerRight';
import CreateLostFoundForm from '../components/_dashboard/lostandfound/CreateLFListing';
import LostAndFoundContext from '../context/lostAndFound/lostAndFoundContext';
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
import StudyBuddyMoreMenu from '../components/_dashboard/profile/StudyBuddyMoreMenu';
//
import StudyBuddyContext from '../context/studyBuddy/studyBuddyContext';
import UserContext from '../context/user/userContext';
import { StudyBuddyForm } from '../components/authentication/register';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'location', label: 'Location', alignRight: false },
  { id: 'course', label: 'Course', alignRight: false },
  { id: 'module', label: 'Module', alignRight: false },
  { id: 'yearOfStudy', label: 'Year of Study', alignRight: false },
  { id: 'groupsize', label: 'Group Size', alignRight: false },
  { id: 'gender', label: 'Gender', alignRight: false }
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

export default function MyStudyListings() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('location');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const userContext = useContext(UserContext);
  const { user } = userContext;
  const studyBuddyContext = useContext(StudyBuddyContext);
  const { getStudyListingOfUser, studyBuddyListings } = studyBuddyContext;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  useEffect(() => {
    getStudyListingOfUser(user.id);
  }, []);
  useEffect(() => {
    getStudyListingOfUser(user.id);
  }, []);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = studyBuddyListings.map((n) => n.location);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, location) => {
    const selectedIndex = selected.indexOf(location);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, location);
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

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - studyBuddyListings.length) : 0;

  const filteredUsers = applySortFilter(
    studyBuddyListings,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="User | Minimal-UI">
      <Container sx={{ display: 'flex', flexDirection: 'row' }}>
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Study Buddy Listings
            </Typography>
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
              <DialogTitle>Create a Study Buddy Listing</DialogTitle>

              <DialogContent>
                <DialogContentText> Preferred Study Buddy Details </DialogContentText>
                <StudyBuddyForm handleClose={handleClose} />
              </DialogContent>

              <DialogActions>
                <Button onClick={handleClose}>Close</Button>
              </DialogActions>
            </Dialog>
          </Stack>

          <Card>
            <UserListToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={studyBuddyListings.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {studyBuddyListings
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        const { id, location, course, module, yearOfStudy, groupsize, gender } =
                          row;
                        const isItemSelected = selected.indexOf(location) !== -1;

                        return (
                          <TableRow
                            hover
                            key={location}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                onChange={(event) => handleClick(event, id)}
                              />
                            </TableCell>

                            <TableCell align="left">{location}</TableCell>
                            <TableCell align="left">{course}</TableCell>
                            <TableCell align="left">{module}</TableCell>
                            <TableCell align="left">{yearOfStudy}</TableCell>
                            <TableCell align="left">{groupsize}</TableCell>
                            <TableCell align="left">{gender}</TableCell>
                            <TableCell align="right">
                              <StudyBuddyMoreMenu listing={row} />
                            </TableCell>
                          </TableRow>
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
              count={studyBuddyListings.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
        <PersistentDrawerRight />
      </Container>
    </Page>
  );
}
