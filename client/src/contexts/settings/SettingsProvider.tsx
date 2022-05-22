import React, { useReducer } from 'react';
import { Settings } from '../../shared/types';
import { SettingsContext } from './SettingsContext';

const initState = {
    settings: null
}

const dataexists = localStorage.getItem('settings');
if(dataexists){
    const settings = JSON.parse(dataexists);
    initState.settings = settings;
}

function settingsReducer(state: any, action: any){
    switch(action.type){
        case 'SETSETTINGS':
            return{
                ...state,
                settings: action.payload
            }
        default: 
        return state
    }
}

export const SettingsProvider = (props?: any) => {
    const [state, dispatch] = useReducer(settingsReducer, initState);

    const setSettings = (SettingsData: Settings | null) => {
        localStorage.setItem('settings', JSON.stringify(SettingsData))
        dispatch({
            type: 'SETSETTINGS',
            payload: SettingsData
        })
    }

    return(
        <SettingsContext.Provider
            value={{settings: state.settings, setSettings}}
            {...props}
        />
    )
}
