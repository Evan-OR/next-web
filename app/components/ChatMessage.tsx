import React from 'react';
import { Typography, Box, styled } from '@mui/material';
import { Message } from '../types/types';

type UsernameStyledProps = { colour?: string };
const UsernameStyled = styled(Typography)<UsernameStyledProps>(({ theme, colour }) => ({
  color: colour ? colour : theme.palette.common.white,
  fontWeight: 'bold',
  minWidth: 'fit-content',
  marginLeft: theme.spacing(1),
}));

const MessageStyled = styled(Typography)(({ theme }) => ({
  wordBreak: 'break-word',
  marginLeft: theme.spacing(1),
}));

const insertImageTags = (msg: string) => {
  const urlRegex =
    /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))/g;
  return msg.replace(urlRegex, replacementFunction);
};

const replacementFunction = (match: string) => {
  return `<img src="${match}" width="100%" />`;
};

const ChatMessage = ({ timestamp, username, msg, type, colour }: Message) => {
  const user = username ? username : 'You';

  // const time = timestamp ? new Date(timestamp).toLocaleTimeString() : new Date().toLocaleTimeString();

  const formattedMsg = insertImageTags(msg);

  return type !== 'host' ? (
    <Box display={'flex'}>
      {/* <TimeStyled>{formattedTime}</TimeStyled> */}
      <UsernameStyled colour={colour}>{user}: </UsernameStyled>
      <MessageStyled dangerouslySetInnerHTML={{ __html: formattedMsg }}></MessageStyled>
    </Box>
  ) : (
    <Box>
      <Typography>{msg}</Typography>
    </Box>
  );
};

export default ChatMessage;
