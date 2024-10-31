// src/components/layouts/AdminLayout.js
import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import Navbar from '../navbar';
import { useAuth } from '../../AuthContext';
const ClientLayout = () => {
    const navigate = useNavigate();
    const { handleLogout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const handleLogoutClick = () => {
        handleLogout();
        navigate('/login');
    };
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? 'block' : 'hidden'
                    } md:block w-64 bg-gray-800 text-white p-6`}
            >
                <h2 className="text-2xl font-semibold">Client Panel</h2>
                <nav className="mt-4 space-y-2">
                    <Link to="/" className="block hover:bg-gray-700 p-2 rounded">Home</Link>
                    <Link to="dashboard" className="block hover:bg-gray-700 p-2 rounded">Dashboard</Link>
                    <Link to="habitaciones" className="block hover:bg-gray-700 p-2 rounded">Habitaciones</Link>

                </nav>
                {/* Logout Button */}
                <button
                    onClick={handleLogoutClick}
                    className="w-full flex items-center justify-start px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md"
                >
                    <svg
                        className="w-5 h-5 mr-2 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
                        ></path>
                    </svg>
                    <span>Cerrar sesión</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
                <Navbar toggleSidebar={toggleSidebar} />
                <div className="p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default ClientLayout;
