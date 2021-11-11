import { Card, Container, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import Moment from 'react-moment';

const ChatArea = ({ chat }) => {
  const messagesEnd = useRef(null);

  return (
    <Container sx={{ height: 400, borderBottom: '1px solid lightGrey' }}>
      <ScrollableFeed>
        {chat != null &&
          chat
            .sort((a, b) => a.id - b.id)
            .map((msg) => (
              <Card key={msg.id} sx={{ padding: 3, margin: 3 }}>
                <Typography variant="h6">{msg.username}</Typography>
                <Typography variant="caption" gutterBottom>
                  <Moment format="DD MMM YYYY, h:mma">
                    {msg.dateCreated.substring(0, msg.dateCreated.length - 5)}
                  </Moment>
                </Typography>
                <br />
                <Typography variant="body" sx={{ mt: 1 }}>
                  {msg.messageBody}
                </Typography>
              </Card>
            ))}
      </ScrollableFeed>
    </Container>
  );
};
export default ChatArea;
