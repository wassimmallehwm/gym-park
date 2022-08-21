import React from 'react';
import { Socket } from 'socket.io-client';
import { Config } from '../../config/Config';


export interface SocketContextInterface {
    socket: Socket | null;
    connect: (roles?: string[]) => void;
    disconnect: () => void;
}

export const SocketContextDefaults: SocketContextInterface = {
    socket: null,
    connect: (roles?: string[]) => null,
    disconnect: () => null
};


export const SocketContext = React.createContext<SocketContextInterface>(
    SocketContextDefaults
);