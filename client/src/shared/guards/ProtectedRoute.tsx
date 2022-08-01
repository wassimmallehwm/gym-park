import React, { useContext } from 'react'
import { Route, Navigate } from 'react-router-dom'
import { AuthContext, ErrorContext } from '../../contexts';
import { ErrorData } from '../types';

const ProtectedRoute = ({ roles, children }: any) => {
  const { user } = useContext(AuthContext);
  const { setError } = useContext(ErrorContext);

  const hasRoles = () => {
    return user.roles.some((role: any) => roles.includes(role.label))
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  } else if (!hasRoles()) {
    setError(new ErrorData({status: 403, message: 'Access forbiden'}))
  }

  return children;
}

export default ProtectedRoute
