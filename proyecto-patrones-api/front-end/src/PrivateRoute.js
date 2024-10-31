import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) return <p>Cargando...</p>;
    if (allowedRoles && !allowedRoles.includes(user.rol)) return <Navigate to="/unauthorized" />
    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

