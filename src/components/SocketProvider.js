import React, { createContext, useEffect, useState } from 'react';

import io from 'socket.io-client';
import Echo from 'laravel-echo';

export const SocketContext = createContext(null);

// eslint-disable-next-line react/prop-types
const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const socketCon = () => {
    const token = global?.store?.getState()?.auth?.user?.token;
    const echo = new Echo({
      host: 'https://api.heavymotors.luby.com.br:9876',
      broadcaster: 'socket.io',
      client: io,
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    setSocket(echo);
  };

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
      setSocket(null);
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        socketCon,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
