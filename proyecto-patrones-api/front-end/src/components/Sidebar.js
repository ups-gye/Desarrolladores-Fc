// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
    <nav style={{ width: '200px', background: '#f4f4f4', padding: '10px' }}>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
        </ul>
    </nav>
);

export default Sidebar;
