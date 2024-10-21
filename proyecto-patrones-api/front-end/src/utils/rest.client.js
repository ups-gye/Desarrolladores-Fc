import axios from 'axios';

// Configuración de Axios para enviar cookies con cada petición
const apiRest = axios.create({
    baseURL: process.env.REACT_APP_API_REST_URL,
    withCredentials: true, // Habilitar el envío de cookies
    headers: {
        'Content-Type': 'application/json',
    },
});

apiRest.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            console.error('Error en la respuesta:', error.response);
        } else if (error.request) {
            console.error('No se recibió respuesta:', error.request);
        } else {
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default apiRest;