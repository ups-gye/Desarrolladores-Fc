// src/components/ClientPage.js
import React from 'react';
import { useAuth } from '../../AuthContext'; // Asegúrate de importar el contexto de autenticación
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la redirección
import Navbar from '../../components/navbar';
import HotelList from '../../components/hotel-list';

const ClientPage = () => {
    const { handleLogout, user } = useAuth(); // Obtén la función de cerrar sesión
    const navigate = useNavigate(); // Hook para navegar

    const handleLogoutClick = () => {
        handleLogout(); // Llama a la función de cerrar sesión
        navigate('/login'); // Redirige al login después de cerrar sesión
    };

    return (
        <div>
            <Navbar />
            <div className='container mx-auto'>
                <HotelList />

                <div className="flex flex-col items-center justify-center min-h-screen bg-gray">
                    <h1 className="text-4xl font-bold mb-4">Bienvenido, {user.nombre}</h1>
                    <p className="text-lg mb-6">Esta es la página del cliente.</p>
                    <button
                        onClick={handleLogoutClick}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ClientPage;
