import { Box, Button, styled, TextField } from '@mui/material';
import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { Socket } from 'socket.io-client';
import { ClientToServerEvents, Message, ServerToClientEvents } from '../types/types';

type ChatInputProps = {
    socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
    setMessages: Dispatch<SetStateAction<Message[]>>;
};

export const ChatInput = ({ socket, setMessages }: ChatInputProps) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const sendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (socket && inputValue.trim() !== '') {
            socket.emit('message', inputValue);

            // update state
            setInputValue('');
            setMessages((prevMessages) => {
                const messages = [...prevMessages, { timestamp: Date.now(), msg: inputValue }];
                console.log(messages);
                return messages;
            });
        }
    };

    return (
        <Box component={'form'} id="messsageForm" display="flex" alignItems="center" gap={2} onSubmit={sendMessage}>
            <TextField
                id="outlined-helperText"
                placeholder="Send a message"
                autoComplete="off"
                fullWidth
                value={inputValue}
                onChange={handleInputChange}
            />
            <Button type="submit" variant="text" size="large" color="primary">
                Send
            </Button>
        </Box>
    );
};
