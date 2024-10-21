import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Asegúrate de importar useAuth correctamente

const Login = () => {
    const { user, handleLogin, error } = useAuth(); // Obtener el usuario y la función de login
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Redirigir si el usuario ya está autenticado
    useEffect(() => {
        if (user) {
            const redirectPath = user.role === 'admin' ? '/admin' : '/client';
            navigate(redirectPath);
        }
    }, [navigate, user]); // Dependencias 

    // useEffect(() => {
    //     if (error) {
    //         console.error('Error de inicio de sesión:', error);
    //     }
    // }, [error]);

    // Manejar el submit del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleLogin(email, password); // Intentar login
    };

    // Si el usuario ya está autenticado, mostrar un componente Navigate
    if (user) {
        const redirectPath = user.role === 'admin' ? '/admin' : '/client';
        return <Navigate to={redirectPath} />;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <div className="mb-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Login
                </button>
                {error && <p className="mt-4 text-red-500">{error}</p>}
            </form>
        </div>
    );
};

export default Login;
