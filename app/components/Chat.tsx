'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Box, styled, Paper } from '@mui/material';
import { ClientToServerEvents, Message, ServerToClientEvents, TimerMessage } from '../types/types';
import ChatMessage from './ChatMessage';
import { ChatInput } from './ChatInput';
import { CountDown } from './CountDown';

const SOCKET_SERVER_URL = 'http://localhost:3001';

const PaperStyled = styled(Paper)(({ theme }) => ({
    width: 'fit-content',
    position: 'relative',
    padding: theme.spacing(2),
    color: theme.palette.common.white,
}));

const ScrollerStyled = styled(Box)({
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column-reverse',
    overflowAnchor: 'auto',
    width: '100vw',
    maxWidth: '500px',
    height: '70vh',
    maxHeight: '600px',
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
        const socketIo: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_SERVER_URL);

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
