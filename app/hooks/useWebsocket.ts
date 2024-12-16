import { ClientToServerEvents, ServerToClientEvents } from '@/types/types';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Cookies from 'js-cookie';
import { USER_COOKIE, USER_HEADERS } from '@/auth/constants';

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'http://localhost:3001';

const useWebsocket = () => {
  const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);

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

  return { socket };
};

export default useWebsocket;
