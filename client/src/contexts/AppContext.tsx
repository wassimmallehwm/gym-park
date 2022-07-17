import React from 'react'
import { AuthProvider } from './auth/AuthProvider'
import { ErrorProvider } from './error/ErrorProvider'
import { SettingsProvider } from './settings/SettingsProvider'
import { SocketProvider } from './socket/SocketProvider'

const AppContext = ({children}: any) => {
    return (
        <ErrorProvider>
            <AuthProvider>
                <SettingsProvider>
                        {children}
                </SettingsProvider>
            </AuthProvider>
        </ErrorProvider>
    )
}

export default AppContext