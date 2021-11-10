import { useContext, useState } from 'react';
import { Icon } from '@iconify/react';
import messageOutline from '@iconify/icons-eva/message-circle-outline';
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
  InputAdornment,
  Button
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import ChatContext from '../../../context/chat/chatContext';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 3, 0, 3)
}));

const ReplyStyle = styled(OutlinedInput)(({ theme }) => ({
  marginRight: 20,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

// ----------------------------------------------------------------------

export default function ChatReplyBar({ userId, chatId }) {
  const chatContext = useContext(ChatContext);
  const { sendMessage } = chatContext;

  const [reply, setReply] = useState('');

  const onSendHandler = () => {
    if (reply.length > 0) {
      sendMessage(
        userId,
        {
          messageBody: reply
        },
        chatId
      );
      setReply('');
    }
  };

  const onChange = (e) => {
    setReply(e.target.value);
  };

  return (
    <RootStyle>
      <ReplyStyle
        fullWidth
        placeholder="Reply"
        onChange={onChange}
        value={reply}
        startAdornment={
          <InputAdornment position="start">
            <Box component={Icon} icon={messageOutline} sx={{ color: 'text.disabled' }} />
          </InputAdornment>
        }
      />

      <Button
        variant="contained"
        startIcon={<SendIcon />}
        sx={{ padding: 2 }}
        disabled={reply.length === 0}
        onClick={onSendHandler}
      >
        Reply
      </Button>
    </RootStyle>
  );
}
