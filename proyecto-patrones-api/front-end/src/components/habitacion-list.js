import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import { getHabitaciones } from '../query/graphql.query'; // Asegúrate de que la ruta sea correcta
import ErrorMessage from './error.message';

const HabitacionList = () => {
    // const { hotelId } = useParams();
    const hotelId = 1;
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

    const handleReservar = (id) => {
        const nuevasHabitaciones = habitaciones.map((hab) =>
            hab.id === id ? { ...hab, estado: 'reservado' } : hab
        );
        setHabitaciones(nuevasHabitaciones);
    };

    const handleCancelarReserva = (id) => {
        const nuevasHabitaciones = habitaciones.map((hab) =>
            hab.id === id ? { ...hab, estado: 'disponible' } : hab
        );
        setHabitaciones(nuevasHabitaciones);
    };

    if (loading) return <div>Cargando...</div>;

    if (error) return <ErrorMessage message={error.message} />;

    return (
        <div className="py-10 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
                    Listado de Habitaciones
                </h1>
                {habitaciones.length > 0 ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {habitaciones.map((habitacion) => (
                            <li
                                key={habitacion.id}
                                className="relative border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white flex flex-col justify-between"
                            >
                                <div className="p-6">
                                    <h2 className="text-lg font-semibold text-gray-700 mb-2">
                                        Habitación {habitacion.numero}
                                    </h2>
                                    <p className="text-sm text-gray-500 mb-1">
                                        <span className="font-medium">Tipo:</span> {habitacion.tipo}
                                    </p>
                                    <p className="text-sm text-gray-500 mb-1">
                                        <span className="font-medium">Precio:</span> ${habitacion.precio}
                                    </p>
                                    <p
                                        className={`text-sm font-medium mt-2 ${habitacion.estado === 'disponible'
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                            }`}
                                    >
                                        Estado: {habitacion.estado}
                                    </p>
                                </div>

                                {habitacion.estado === 'disponible' ? (
                                    <button
                                        onClick={() => handleReservar(habitacion.id)}
                                        className="w-full bg-blue-500 text-white py-2 mt-auto hover:bg-blue-600 transition-colors"
                                    >
                                        Reservar
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleCancelarReserva(habitacion.id)}
                                        className="w-full bg-red-500 text-white py-2 mt-auto hover:bg-red-600 transition-colors"
                                    >
                                        Cancelar Reserva
                                    </button>
                                )}

                                {habitacion.estado === 'disponible' && (
                                    <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                        Disponible
                                    </div>
                                )}
                            </li>

                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600 text-center mt-10">
                        No hay habitaciones disponibles.
                    </p>
                )}
            </div>
        </div>
    );
};

export default HabitacionList;
