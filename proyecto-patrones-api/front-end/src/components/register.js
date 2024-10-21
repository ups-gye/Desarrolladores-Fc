// src/components/Register.js
import { useState } from 'react';
import apiRest from '../utils/rest.client';

const Register = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiRest.post('auth/register', { nombre, email, password });
            alert('Registro exitoso');
        } catch (err) {
            setError('Error en el registro');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col p-4">
            <h2 className="mb-4 text-xl font-bold">Registro</h2>
            {error && <p className="text-red-500">{error}</p>}
            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="mb-2 p-2 border border-gray-300"
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-2 p-2 border border-gray-300"
                required
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-4 p-2 border border-gray-300"
                required
            />
            <button type="submit" className="p-2 bg-blue-500 text-white">Registrar</button>
        </form>
    );
};

export default Register;
