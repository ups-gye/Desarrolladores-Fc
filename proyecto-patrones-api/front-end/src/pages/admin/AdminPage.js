// src/components/AdminPage.js
import React from 'react';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const { handleLogout } = useAuth(); // Obtén la función de cerrar sesión
    const navigate = useNavigate(); // Hook para navegar

    const handleLogoutClick = () => {
        handleLogout(); // Llama a la función de cerrar sesión
        navigate('/login'); // Redirige al login después de cerrar sesión
    };

    return (
        <div>
            <h1>Bienvenido, Admin</h1>
            <p>Esta es la página del administrador.</p>
            <button onClick={handleLogoutClick}>Cerrar sesión</button> {/* Botón para cerrar sesión */}
        </div>
    );
};

export default AdminPage;
