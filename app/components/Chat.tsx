'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Box, styled, Paper } from '@mui/material';
import { ClientToServerEvents, Message, ServerToClientEvents, TimerMessage } from '../types/types';
import ChatMessage from './ChatMessage';
import { ChatInput } from './ChatInput';
import { CountDown } from './CountDown';
import Cookies from 'js-cookie';
import { USER_COOKIE, USER_HEADERS } from '@/auth/constants';

const SOCKET_SERVER_URL = 'http://localhost:3001';

const PaperStyled = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: 'fit-content',
  position: 'relative',
  padding: theme.spacing(2),
  color: theme.palette.common.white,
}));

const ScrollerStyled = styled(Box)({
  overflow: 'auto',
  display: 'flex',
  flex: '1', // makes sure the chat section fills height
  flexDirection: 'column-reverse',
  overflowAnchor: 'auto',
  width: '100vw',
  maxWidth: '350px',
  height: '100%',
});

const ScrollerContentStyled = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

export const Chat = () => {
  const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const [timerData, setTimerData] = useState<TimerMessage | null>(null);

  useEffect(() => {
    // YIKES. REDO THIS!!!!
    const authToken = Cookies.get(USER_COOKIE.RestAuth);
    const userData = Cookies.get(USER_COOKIE.Data);

    const socketIo: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_SERVER_URL, {
      ...(authToken && {
        extraHeaders: {
          'X-auth-token': authToken,
          ...(userData && { [USER_HEADERS.X_Data]: userData }),
        },
      }),
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log('connected');
      });

      socket.on('message', (message: Message) => {
        setMessages((prevMessages) => {
          const messages = [...prevMessages, message];
          console.log(messages);
          return messages;
        });
      });

      socket.on('startTimer', (timerMessage: TimerMessage) => {
        console.log(timerMessage);
        setTimerData(timerMessage);
      });
    }

    return () => {
      if (socket) {
        socket.off('message');
      }
    };
  }, [socket]);

  return (
    <PaperStyled>
      {timerData && <CountDown {...timerData} socket={socket} />}

      <ScrollerStyled>
        <ScrollerContentStyled className="scroller-content">
          {messages.map((msg) => (
            <ChatMessage key={msg.timestamp} {...msg} />
          ))}
        </ScrollerContentStyled>
      </ScrollerStyled>

      <ChatInput socket={socket} setMessages={setMessages} />
    </PaperStyled>
  );
};

export default Chat;
