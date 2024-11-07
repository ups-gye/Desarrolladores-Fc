// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import PublicLayout from './components/layouts/PublicLayout';
import ClientLayout from './components/layouts/ClientLayout';
import AdminLayout from './components/layouts/AdminLayout';
import Habitaciones from './pages/admin/Habitaciones';
import Reservas from './pages/admin/Reservas';
import Hotel from './pages/admin/Hotel';
import Unauthorized from './pages/system/Unauthorized';
import MisReservas from './pages/clients/mis_reservas';
import HabitacionesDisponibles from './pages/clients/habitaciones-disponibles';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Ruta de Login y Registro */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          {/* Rutas Públicas */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Navigate to="/login" />} />
          </Route>

          {/* Rutas para Clientes */}
          <Route path="/client" element={<PrivateRoute allowedRoles={['cliente']}><ClientLayout /></PrivateRoute>}>
            <Route index element={<Hotel />} />
            <Route path='habitaciones-disponibles' element={<HabitacionesDisponibles />} />
            <Route path="mis-reservas" element={<MisReservas />} />
          </Route>

          {/* Rutas para Administradores */}
          <Route path="/admin" element={<PrivateRoute allowedRoles={['admin']}><AdminLayout /></PrivateRoute>}>
            <Route index element={<Hotel />} />
            <Route path='habitaciones' element={<Habitaciones />} />
            <Route path='reservas' element={<Reservas />} />
          </Route>

          {/* Redirección por defecto si no se encuentra la ruta */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
