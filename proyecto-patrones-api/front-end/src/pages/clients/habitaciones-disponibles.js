import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import { getHabitaciones, createReserva } from '../../query/graphql.query'; // Asegúrate de que la ruta sea correcta
import ErrorMessage from '../../components/error.message';
import Modal from '../../components/Modal';
import { useAuth } from '../../AuthContext';

const HabitacionList = () => {
    // const { hotelId } = useParams();
    const hotelId = 1;
    const { user } = useAuth();
    const [habitaciones, setHabitaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [reserva, setReserva] = useState({ habitacionId: 0, fecha_entrada: '', fecha_salida: '', numero: '', estado: 'confirmada' });
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    useEffect(() => {
        setReserva({ ...reserva, fecha_entrada: today, fecha_salida: tomorrowStr });
    }, []);

    const fetchHabitaciones = async () => {
        setLoading(true);
        try {
            const data = await getHabitaciones(parseInt(hotelId));
            const habitacionesDisponibles = data.filter(habitacion => habitacion.estado === 'disponible');
            setHabitaciones(habitacionesDisponibles);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (typeof hotelId !== 'undefined') {
            fetchHabitaciones();
        }
    }, [hotelId]);

    const handleOpenModal = (id, numero) => {
        setReserva({ ...reserva, habitacionId: id, numero: numero });
        setIsModalOpen(true);
    };
    const handleCloseModal = () => setIsModalOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!reserva.habitacionId || !reserva.fecha_entrada || !reserva.fecha_salida) {
            alert('Por favor completa los campos obligatorios');
            return;
        }
        reserva.usuarioId = user.id;
        try {
            await createReserva(reserva);
            const nuevasHabitaciones = habitaciones.map((hab) =>
                hab.id === reserva.habitacionId ? { ...hab, estado: 'reservado' } : hab
            );
            var habitacionesactualizadas = nuevasHabitaciones.filter(habitacion => habitacion.estado === 'disponible');
            setHabitaciones(habitacionesactualizadas);
        } catch (error) {
            console.error('Error al crear la reserva:', error);
        }
        handleCloseModal();
    };

    const handleChange = (e) => {
        setReserva({ ...reserva, [e.target.name]: e.target.value });
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
        <div className="py-10 bg-gray-50 ">
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
                                        onClick={() => handleOpenModal(habitacion.id, habitacion.numero)}
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

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={"Reservar Habitación Nro." + reserva.numero}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Fecha De Inicio</label>
                        <input
                            type="date"
                            name="fecha_entrada"
                            value={reserva.fecha_entrada || ''}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 mt-1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Fecha de salida</label>
                        <input
                            type="date"
                            name="fecha_salida"
                            value={reserva.fecha_salida || ''}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 mt-1"
                        />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={handleCloseModal}
                            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default HabitacionList;