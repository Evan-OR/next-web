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

type ChatPropsType = {
  streamId: string;
};

export const Chat = ({ streamId }: ChatPropsType) => {
  const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const [timerData, setTimerData] = useState<TimerMessage | null>(null);
  const [timerFinished, setTimerFinished] = useState(false);

  const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_URL!;
  console.log('WEBSOCKE_ULR : ', SOCKET_SERVER_URL);

  useEffect(() => {
    // YIKES. REDO THIS!!!!
    const authToken = Cookies.get(USER_COOKIE.RestAuth);
    const userData = Cookies.get(USER_COOKIE.Data);

    const socketUrlWithParam = SOCKET_SERVER_URL + `?streamId=${streamId}`;
    console.log(socketUrlWithParam);

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
        setTimerFinished(false);
        setTimerData(timerMessage);
      });

      socket.on('timerComplete', (data) => {
        console.log(data);
        setTimerFinished(true);
        setTimeout(() => {
          setTimerData(null);
        }, 5000);
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
      {timerData && <CountDown {...timerData} socket={socket} timerFinished={timerFinished} />}

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
