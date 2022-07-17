import React, { useReducer } from 'react';
import { initSocket, SocketContext } from './SocketContext';


const initState = {
    socket: null
}


function socketReducer(state: any, action: any) {
    switch (action.type) {
        case 'SETSOCKET':
            return {
                ...state,
                socket: initSocket
            }
        case 'CLOSESOCKET':
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

    const setSocket = () => {
        dispatch({type: 'SETSOCKET'})
    }
    const closeSocket = () => {
        dispatch({type: 'CLOSESOCKET'})
    }

    return (
        <SocketContext.Provider
            value={{ socket: state.socket, setSocket, closeSocket }}
            {...props}
        />
    )
}
