import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHoteles } from '../query/graphql.query'; // Asegúrate de que la ruta sea correcta
import ErrorMessage from './error.message';

const HotelList = () => {
    const [hoteles, setHoteles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHoteles = async () => {
            try {
                const data = await getHoteles();
                setHoteles(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchHoteles();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <ErrorMessage message={error.message} />;
    }

    const StarRating = ({ estrellas }) => {
        const totalStars = 5;
        const filledStars = estrellas;
        const emptyStars = totalStars - filledStars;

        return (
            <div className="flex mt-1">
                {[...Array(filledStars)].map((_, index) => (
                    <svg key={index} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.392 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.392-2.46a1 1 0 00-1.175 0l-3.392 2.46c-.784.57-1.838-.197-1.54-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.245 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                    </svg>
                ))}
                {[...Array(emptyStars)].map((_, index) => (
                    <svg key={index} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.392 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.392-2.46a1 1 0 00-1.175 0l-3.392 2.46c-.784.57-1.838-.197-1.54-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.245 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                    </svg>
                ))}
            </div>
        );
    };

    const handleHotelClick = (hotelId) => {
        navigate(`/client/hoteles/${hotelId}/habitaciones`);
    };

    return (
        <div className="py-4">
            <h1 className="text-2xl font-bold mb-4">Listado de Hoteles</h1>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {hoteles.map(hotel => (
                    <li
                        key={hotel.id}
                        className="border p-4 rounded-lg shadow-md cursor-pointer"
                        onClick={() => handleHotelClick(hotel.id)}
                    >
                        <h2 className="text-xl font-semibold">{hotel.nombre}</h2>
                        <p className="text-gray-600">Dirección: {hotel.direccion}</p>
                        <div className="text-gray-600"><StarRating estrellas={hotel.estrellas} /></div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HotelList;