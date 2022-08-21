import React, { useReducer } from 'react';
import { io, Socket } from 'socket.io-client';
import { Config } from 'src/config/Config';
import { SocketContext } from './SocketContext';


const initState = {
    socket: null
}


function socketReducer(state: any, action: any) {
    switch (action.type) {
        case 'CONNECT':
            return {
                ...state,
                socket: action.payload
            }
        case 'DISCONNECT':
            return {
                ...state,
                socket: null
            }
        default:
            return state
    }
}

export const SocketProvider = (props?: any) => {
    const [state, dispatch] = useReducer(socketReducer, initState);

    const connect = (roles: string[] = []) => {
        const socket = io(
            Config.getConfig().socketUrl, {
            transports: ['websocket'],
            secure: true,
            autoConnect: true,
            reconnection: true,
            rejectUnauthorized: false,
            reconnectionDelay: 0,
            reconnectionAttempts: 10,
        })
        socket.emit('user_roles', roles)
        dispatch({
            type: 'CONNECT',
            payload: socket
        })
    }
    const disconnect = () => {
        dispatch({type: 'DISCONNECT'})
    }

    return (
        <SocketContext.Provider
            value={{ socket: state.socket, connect, disconnect }}
            {...props}
        />
    )
}
