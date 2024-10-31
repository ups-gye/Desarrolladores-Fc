// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';
import Login from './components/login';
import Register from './components/register';
import AdminPage from './pages/admin/AdminPage';
import HotelList from './components/hotel-list';
import HabitacionList from './components/habitacion-list';
import PublicLayout from './components/layouts/PublicLayout';
import ClientLayout from './components/layouts/ClientLayout';
import AdminLayout from './components/layouts/AdminLayout';
import Habitaciones from './pages/admin/Habitaciones';
import Reservas from './pages/admin/Reservas';
import Hotel from './pages/admin/Hotel';
import Unauthorized from './pages/system/Unauthorized';

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
            <Route path="habitaciones" element={<HabitacionList />} />
          </Route>

          {/* Rutas para Administradores */}
          <Route path="/admin" element={<PrivateRoute allowedRoles={['admin']}><AdminLayout /></PrivateRoute>}>
            <Route index element={<AdminPage />} />
            <Route path='habitaciones' element={<Habitaciones />} />
            <Route path='reservas' element={<Reservas />} />
            <Route path='hotel' element={<Hotel />} />
          </Route>

          {/* Redirección por defecto si no se encuentra la ruta */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
