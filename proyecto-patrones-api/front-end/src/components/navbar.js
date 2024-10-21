import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Asegúrate de importar useAuth correctamente
import 'tailwindcss/tailwind.css';

const Navbar = () => {
    const { handleLogout, user } = useAuth(); // Obtén la función de cerrar sesión
    const navigate = useNavigate(); // Hook para navegar
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Estado para controlar la visibilidad del menú desplegable
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado para controlar la visibilidad del menú móvil

    const handleLogoutClick = () => {
        handleLogout(); // Llama a la función de cerrar sesión
        navigate('/login'); // Redirige al login después de cerrar sesión
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen); // Alterna la visibilidad del menú desplegable
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen); // Alterna la visibilidad del menú móvil
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">
                    <Link to="/">Hotel</Link>
                </div>
                <div className="hidden md:flex space-x-4 items-center">
                    <Link to="/admin" className="text-gray-300 hover:text-white">Admin</Link>
                    <Link to="/user" className="text-gray-300 hover:text-white">User</Link>
                    <div className="relative">
                        <button onClick={toggleDropdown} className="text-gray-300 hover:text-white focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                            </svg>
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                                <div className="px-4 py-2 text-gray-800">
                                    {user ? user.name : 'Guest'}
                                </div>
                                <button onClick={handleLogoutClick} className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMobileMenu} className="text-gray-300 hover:text-white focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="md:hidden mt-2 space-y-2">
                    <Link to="/admin" className="block text-gray-300 hover:text-white">Admin</Link>
                    <Link to="/user" className="block text-gray-300 hover:text-white">User</Link>
                    <div className="block text-gray-300 hover:text-white">
                        {user ? user.name : 'Guest'}
                    </div>
                    <button onClick={handleLogoutClick} className="block w-full text-left text-gray-300 hover:text-white">
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;