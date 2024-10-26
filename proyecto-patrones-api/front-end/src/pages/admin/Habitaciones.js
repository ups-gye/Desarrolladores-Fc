import React, { useEffect, useState } from 'react';
import { getHabitaciones } from '../../query/graphql.query'; // Asegúrate de que la ruta sea correcta
import ErrorMessage from '../../components/error.message';
import Modal from '../../components/Modal';
import { defaultPrice, TIPOS_HABITACION } from '../../utils/statics';

const Habitaciones = () => {
    const [habitaciones, setHabitaciones] = useState([]);
    const [habitacion, setHabitacion] = useState({ numero: '', precio: 0, tipo: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        const fetchHabitaciones = async () => {
            try {
                const data = await getHabitaciones(1);
                setHabitaciones(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchHabitaciones();
    }, []);

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

    const handleOpenModal = () => {
        const ultimoNumero = habitaciones.length > 0 ? Math.max(...habitaciones.map(hab => hab.numero)) : 0;
        setHabitacion({ numero: ultimoNumero + 1, precio: defaultPrice, tipo: '' });
        setIsModalOpen(true);
    }
    const handleCloseModal = () => setIsModalOpen(false);

    const handleAgregarHabitacion = (e) => {
        e.preventDefault();
        if (!habitacion.numero || !habitacion.precio || !habitacion.tipo) {
            alert('Por favor completa los campos obligatorios');
            return;
        }
        console.log('Datos actualizados:', habitacion); // Aquí agregarías la lógica de actualización real
        handleCloseModal();
    };
    const handleChange = (e) => {
        setHabitacion({ ...habitacion, [e.target.name]: e.target.value });
    };

    if (loading) return <div>Cargando...</div>;

    if (error) return <ErrorMessage message={error.message} />;

    return (
        <div className="py-10 min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
                    Listado de Habitaciones
                </h1>
                {habitaciones.length > 0 ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {/* Nuevo Card para Agregar Habitación */}
                        <li
                            className="relative border border-dashed border-gray-300 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white flex items-center justify-center cursor-pointer"
                            onClick={handleOpenModal}
                        >
                            <div className="p-6 text-center">
                                <div className="text-gray-400 text-5xl mb-2">+</div>
                                <p className="text-sm font-medium text-gray-500">Agregar Nueva Habitación</p>
                            </div>
                        </li>
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
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Agregar">
                <form onSubmit={handleAgregarHabitacion} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Numero</label>
                        <input
                            type="text"
                            name="numero"
                            value={habitacion.numero || ''}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 mt-1"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Precio</label>
                        <input
                            type="text"
                            name="precio"
                            value={habitacion.precio || 0}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 mt-1"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Tipo</label>
                        <select
                            name="tipo"
                            value={habitacion.tipo || ''}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 mt-1"
                        >
                            <option value="">Seleccione un tipo</option>
                            {Object.values(TIPOS_HABITACION).map((tipo) => (
                                <option key={tipo} value={tipo}>
                                    {tipo}
                                </option>
                            ))}
                        </select>
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

export default Habitaciones;
