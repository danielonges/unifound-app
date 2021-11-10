import { Card, Typography } from '@mui/material';
import React from 'react';

const ChatArea = ({ chat }) => (
  <div>
    {chat != null &&
      chat.map((msg) => (
        <Card key={msg.id}>
          <Typography variant="h6" gutterBottom>
            {msg.username}
          </Typography>
          <Typography variant="body">{msg.messageBody}</Typography>
        </Card>
      ))}
  </div>
);
export default ChatArea;
