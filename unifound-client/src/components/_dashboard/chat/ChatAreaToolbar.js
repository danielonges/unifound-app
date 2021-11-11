import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import roundFilterList from '@iconify/icons-ic/round-filter-list';
// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment
} from '@mui/material';
import { ChatMoreMenu } from '.';

import UserContext from '../../../context/user/userContext';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 3, 0, 3),
  borderBottom: '1px solid lightGrey'
}));

export default function ChatAreaToolbar({ chat }) {
  const userContext = useContext(UserContext);
  const { user } = userContext;
  const [numUsers, setNumUsers] = useState(1);

  useEffect(async () => {
    if (chat) {
      const res = await axios.get(`/chat/${chat.id}/users`);
      setNumUsers(res.data.length);
    }
  }, [chat]);
  return (
    <RootStyle>
      {chat && (
        <>
          <Typography variant="body">
            {numUsers} member{numUsers > 1 ? 's' : ''}
          </Typography>
          <div style={{ textAlign: 'center' }}>
            <Typography variant="h6">{chat.name}</Typography>
            {chat.ownerId === user.id && <Typography variant="caption">Owner</Typography>}
          </div>

          <ChatMoreMenu chat={chat} />
        </>
      )}
    </RootStyle>
  );
}
