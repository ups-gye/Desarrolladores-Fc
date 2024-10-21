// src/components/Layout.js
import React from 'react';
//import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom'; // Donde se mostrará el contenido según la ruta
import Navbar from '../navbar';

const ClientLayout = () => (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ display: 'flex', flex: 1 }}>
            {/* <Sidebar /> */}
            <main style={{ padding: '10px', flex: 1 }}>
                <Outlet /> {/* Aquí se renderiza el contenido de cada ruta */}
            </main>
        </div>
    </div>
);

export default ClientLayout;
