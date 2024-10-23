// src/components/layouts/AdminLayout.js
import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from '../navbar';

const ClientLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
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
                    <Link to="/dashboard" className="block hover:bg-gray-700 p-2 rounded">Dashboard</Link>
                    <Link to="/" className="block hover:bg-gray-700 p-2 rounded">Home</Link>
                </nav>
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
