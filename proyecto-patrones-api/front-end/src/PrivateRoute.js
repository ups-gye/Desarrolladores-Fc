import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) return <p>Cargando...</p>;
    if (!user) return <Navigate to="/login" />;
    if (allowedRoles && !allowedRoles.includes(user.rol)) return <Navigate to="/unauthorized" />
    return children;
};

export default PrivateRoute;

