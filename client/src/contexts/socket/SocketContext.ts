import React from 'react';
import { io, Socket } from 'socket.io-client';
import { Config } from '../../config/Config';

export const initSocket: Socket = io(
    Config.getConfig().socketUrl, {
    transports: ['websocket'],
    secure: true,
    autoConnect: true,
    reconnection: true,
    rejectUnauthorized: false,
    reconnectionDelay: 0,
    reconnectionAttempts: 10,
})


export interface SocketContextInterface {
    socket: Socket | null;
    setSocket: () => void;
    closeSocket: () => void;
}

export const SocketContextDefaults: SocketContextInterface = {
    socket: null,
    setSocket: () => null,
    closeSocket: () => null
};


export const SocketContext = React.createContext<SocketContextInterface>(
    SocketContextDefaults
);