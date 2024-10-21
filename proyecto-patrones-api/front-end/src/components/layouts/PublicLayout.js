// src/components/layouts/PublicLayout.js
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const PublicLayout = () => (
    <div style={{ padding: '20px' }}>
        <header>
            <h1>Página Pública</h1>
            <nav>
                <Link to="/">Home</Link> | <Link to="/login">Login</Link>
            </nav>
        </header>
        <main style={{ marginTop: '20px' }}>
            <Outlet /> {/* Contenido específico según la ruta */}
        </main>
    </div>
);

export default PublicLayout;
