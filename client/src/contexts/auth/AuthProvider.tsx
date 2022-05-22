import React, { useReducer } from 'react';
import { AuthResponse } from '../../shared/types';
import { AuthContext } from './AuthContext';

const initState = {
    user: null
}

const dataexists = localStorage.getItem('userData');
if(dataexists){
    const userData = JSON.parse(dataexists);
    initState.user = userData;
}


function authReducer(state: any, action: any){
    switch(action.type){
        case 'LOGIN':
            return{
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return{
                ...state,
                user: null
            }
        default: 
        return state
    }
}

export const AuthProvider = (props?: any) => {
    const [state, dispatch] = useReducer(authReducer, initState);

    const login = (userData: AuthResponse) => {
        localStorage.setItem('userData', JSON.stringify(userData))
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }

    const logout = () => {
        localStorage.removeItem('userData');
        dispatch({type: 'LOGOUT'})
    }
    return(
        <AuthContext.Provider
            value={{user: state.user, login, logout}}
            {...props}
        />
    )
}
