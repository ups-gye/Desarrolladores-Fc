import apiRest from '../utils/rest.client';

// Función para iniciar sesión
export const login = async (email, password) => {
    try {
        const response = await apiRest.post('/login', { email, password });
        return response.data;
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
    }
};

// Función para registrar una cuenta
export const register = async (nombre, email, password) => {
    try {
        const response = await apiRest.post('/register', { nombre, email, password });
        return response.data;
    } catch (error) {
        console.error('Error al registrar la cuenta:', error);
        throw error;
    }
};

// Función para cerrar sesión
export const logout = async () => {
    try {
        const response = await apiRest.post('/logout');
        return response.data;
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        throw error;
    }
};