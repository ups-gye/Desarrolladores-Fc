// src/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtVerify } from 'jose';
import { login, logout } from './query/rest.query';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Simulando la verificación de un usuario autenticado
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    // useEffect(() => {
    //     const verificarToken = async () => {
    //         try {
    //          const savedUser = localStorage.getItem('user');
    //         //setUser(response.data.usuario);
    //         } catch (error) {
    //         console.error('El token ha caducado o es inválido', error);
    //         handleLogout(); // Cierra sesión si el token es inválido
    //         } finally {
    //         setLoading(false);
    //         }
    //     };

    //     verificarToken();
    // }, []);

    const handleLogin = async (email, password) => {
        try {
            setError(null);
            const response = await login(email, password);
            console.log('Respuesta de inicio de sesión:', response);
            const { token } = response; // Asumiendo que la respuesta incluye el token

            // Verificar y desencriptar el JWT
            const secretKey = process.env.REACT_APP_SECRET_KEY_AUTH;
            if (!secretKey) {
                throw new Error('La clave secreta no está definida en las variables de entorno');
            }

            const secret = new TextEncoder().encode(secretKey);

            const { payload } = await jwtVerify(token, secret);

            console.log('Payload del JWT:', payload); // Aquí tendrás acceso a la información del token

            setUser(payload); // Ajusta esto según lo que necesites guardar en el estado
            localStorage.setItem('user', JSON.stringify(payload)); // Guardar el usuario en el almacenamiento local


        } catch (error) {
            setError(error.response.data.mensaje);
            if (error.response) {
                console.error('Error de inicio de sesión:', error.response.data);
            } else if (error.request) {
                console.error('No se recibió respuesta:', error.request);
            } else {
                console.error('Error:', error.message);
            }
        }
    };

    const handleLogout = async () => {
        await logout();
        setUser(null);
        localStorage.removeItem('user'); // Limpiar el almacenamiento local
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
