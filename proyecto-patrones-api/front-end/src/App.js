// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';
import Login from './components/login';
import Register from './components/register';
import AdminPage from './pages/AdminPage';
import HotelList from './components/hotel-list';
import HabitacionList from './components/habitacion-list';
import PublicLayout from './components/layouts/PublicLayout';
import ClientLayout from './components/layouts/ClientLayout';
import AdminLayout from './components/layouts/AdminLayout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Ruta de Login y Registro */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas Públicas */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Navigate to="/login" />} />
          </Route>

          {/* Rutas para Clientes */}
          <Route path="/client" element={<PrivateRoute><ClientLayout /></PrivateRoute>}>
            <Route index element={<HotelList />} />
            <Route path="hoteles/:hotelId/habitaciones" element={<HabitacionList />} />
          </Route>

          {/* Rutas para Administradores */}
          <Route path="/admin" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
            <Route index element={<AdminPage />} />
          </Route>

          {/* Redirección por defecto si no se encuentra la ruta */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
