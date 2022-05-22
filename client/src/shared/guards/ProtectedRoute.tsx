import React, { useContext} from 'react'
import {Route, Navigate} from 'react-router-dom'
import { AuthContext } from '../../contexts/auth/AuthContext';

const ProtectedRoute = ({children}: any) => {
    const {user} = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/login" replace />;
      }
    
    return children;
}

export default ProtectedRoute
