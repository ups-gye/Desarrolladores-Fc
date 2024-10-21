import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHabitaciones } from '../query/graphql.query'; // Asegúrate de que la ruta sea correcta
import ErrorMessage from './error.message';

const HabitacionList = () => {
    const { hotelId } = useParams();
    const [habitaciones, setHabitaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (typeof hotelId !== 'undefined') {
            const fetchHabitaciones = async () => {
                try {
                    const data = await getHabitaciones(parseInt(hotelId));
                    setHabitaciones(data);
                } catch (error) {
                    setError(error);
                } finally {
                    setLoading(false);
                }
            };

            fetchHabitaciones();
        }
    }, [hotelId]);
    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return (
            <ErrorMessage message={error.message} />
        );
    }

    return (
        <div className="py-4">
            <h1 className="text-2xl font-bold mb-4">Listado de Habitaciones</h1>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {habitaciones.map(habitacion => (
                    <li key={habitacion.id} className="border p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">Habitación {habitacion.numero}</h2>
                        <p className="text-gray-600">Tipo: {habitacion.tipo}</p>
                        <p className="text-gray-600">Precio: {habitacion.precio}</p>
                        <p className="text-gray-600">Estado: {habitacion.estado}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HabitacionList;