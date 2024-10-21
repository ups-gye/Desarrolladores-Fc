// src/components/layouts/AdminLayout.js
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AdminLayout = () => (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
        <aside style={{ width: '250px', background: '#333', color: 'white', padding: '20px' }}>
            <h2>Admin Panel</h2>
            <nav>
                <Link to="/dashboard" style={{ color: 'white' }}>Dashboard</Link> | <Link to="/">Home</Link>
            </nav>
        </aside>
        <main style={{ padding: '20px', flex: 1 }}>
            <Outlet />
        </main>
    </div>
);

export default AdminLayout;
