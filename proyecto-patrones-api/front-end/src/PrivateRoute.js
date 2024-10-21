import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <p>Cargando...</p>;

    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from './AuthContext'; // Contexto de autenticación

// const PrivateRoute = ({ element }) => {
//     const { isAuthenticated } = useAuth(); // Verifica si el usuario está autenticado

//     // Si no está autenticado, redirige al login
//     return isAuthenticated ? element : <Navigate to="/login" />;
// };

// export default PrivateRoute;
