const db = require('../config/database');
const { habitacion_service, hotel_service, reserva_service, usuario_service } = require('../services');

const resolvers = {
    Query: {
        // Obtener todos los hoteles
        hoteles: async () => {
            try {
                return await hotel_service.hoteles();
            } catch (error) {
                throw new Error(`Error al obtener hoteles: ${error.message}`);
            }
        },
        // Obtener un hotel por ID
        hotelById: async (_, { id }) => {
            if (!id) {
                throw new Error("El ID del hotel es requerido.");
            }

            try {
                return await hotel_service.hotelById(id);
            } catch (error) {
                throw new Error(`Error al obtener el hotel por ID: ${error.message}`);
            }
        },

        // Obtener habitaciones por hotel
        habitaciones: async (_, { hotelId }) => {
            if (!hotelId) {
                throw new Error("El ID del hotel es requerido.");
            }

            try {
                return await habitacion_service.habitaciones({ hotelId });
            } catch (error) {
                throw new Error(`Error al obtener habitaciones: ${error.message}`);
            }
        },

        // Query para obtener la habitación más cara
        habitacionMasCara: async (_, { hotelId }) => {
            try {
                const habitaciones = await habitacion_service.habitaciones({ hotelId });
                if (!habitaciones || habitaciones.length === 0) {
                    throw new Error("No se encontraron habitaciones.");
                }

                return habitaciones.reduce((max, habitacion) => {
                    return habitacion.precio > max.precio ? habitacion : max;
                });
            } catch (error) {
                throw new Error(`Error al obtener la habitación más cara: ${error.message}`);
            }
        },

        // Query para obtener la habitación más barata
        habitacionMasBarata: async (_, { hotelId }) => {
            try {
                const habitaciones = await habitacion_service.habitaciones({ hotelId });
                if (!habitaciones || habitaciones.length === 0) {
                    throw new Error("No se encontraron habitaciones.");
                }

                return habitaciones.reduce((min, habitacion) => {
                    return habitacion.precio < min.precio ? habitacion : min;
                });
            } catch (error) {
                throw new Error(`Error al obtener la habitación más barata: ${error.message}`);
            }
        },

        // Obtener todas las reservas
        reservas: async () => {
            try {
                return await reserva_service.ObtenerReservas();
            } catch (error) {
                throw new Error(`Error al obtener reservas: ${error.message}`);
            }
        },
        // Obtener todos los usuarios
        usuarios: async () => {
            try {
                return await usuario_service.obtenerUsuarios();
            } catch (error) {
                throw new Error(`Error al obtener usuarios: ${error.message}`);
            }
        },

        // Query para obtener el hotel más popular en base a las estrellas
        hotelMasPopular: async () => {
            try {
                const hoteles = await hotel_service.hoteles();
                return hoteles.reduce((max, hotel) => hotel.estrellas > max.estrellas ? hotel : max);
            } catch (error) {
                throw new Error(`Error al obtener el hotel más popular: ${error.message}`);
            }
        },

        // Query para obtener el total de reservas por hotel
        totalReservasPorHotel: async (_, { hotelId }) => {
            try {
                const habitaciones = await habitacion_service.habitaciones({ hotelId });
                if (!habitaciones || habitaciones.length === 0) {
                    throw new Error("No se encontraron habitaciones para el hotel con el ID: " + hotelId);
                }

                const habitacionesIds = habitaciones.map(habitacion => habitacion.id);
                return await reserva_service.numeroDeReservasRegistradas({ habitacionesIds });
            } catch (error) {
                throw new Error(`Error al obtener el total de reservas por hotel: ${error.message}`);
            }
        },

        // Query para obtener reservas activas/completadas por usuario
        reservasPorUsuario: async (_, { usuarioId }) => {
            try {
                return await reserva_service.reservasPorUsuario({ usuarioId });
            } catch (error) {
                throw new Error(`Error al obtener reservas por usuario: ${error.message}`);
            }
        },

        // Query para obtener habitaciones disponibles en un hotel
        habitacionesDisponibles: async (_, { hotelId }) => {
            try {
                const habitaciones = await habitacion_service.habitaciones({ hotelId });
                return habitaciones.filter(habitacion => habitacion.estado === 'disponible');
            } catch (error) {
                throw new Error(`Error al obtener habitaciones disponibles: ${error.message}`);
            }
        },
    },
    Mutation: {
        // Crear un nuevo hotel
        crearHotel: async (_, { nombre, direccion, estrellas }) => {
            if (!nombre || !direccion || estrellas == null) {
                throw new Error("Los campos nombre, dirección y estrellas son requeridos.");
            }

            try {
                return await hotel_service.crearHotel({ nombre, direccion, estrellas });
            } catch (error) {
                throw new Error(`Error al crear el hotel: ${error.message}`);
            }
        },

        // Actualizar un hotel existente
        actualizarHotel: async (_, { id, nombre, direccion, estrellas }) => {
            if (!id || !nombre || !direccion || estrellas == null) {
                throw new Error("Los campos ID, nombre, dirección y estrellas son requeridos.");
            }

            try {
                return await hotel_service.actualizarHotel({ id, nombre, direccion, estrellas });
            } catch (error) {
                throw new Error(`Error al actualizar el hotel: ${error.message}`);
            }
        },

        // Eliminar un hotel
        eliminarHotel: async (_, { id }) => {
            if (!id) {
                throw new Error("El ID del hotel es requerido.");
            }

            try {
                return await hotel_service.eliminarHotel(id);
            } catch (error) {
                throw new Error(`Error al eliminar el hotel: ${error.message}`);
            }
        },

        // Crear una nueva habitación
        crearHabitacion: async (_, { hotel_id, numero, tipo, precio, estado }) => {
            if (!hotel_id || !numero || !tipo || precio == null || !estado) {
                throw new Error("Todos los campos son requeridos para crear una habitación.");
            }

            try {
                return await habitacion_service.crearHabitacion({ hotel_id, numero, tipo, precio, estado });
            } catch (error) {
                throw new Error(`Error al crear la habitación: ${error.message}`);
            }
        },

        // Actualizar una habitación existente
        actualizarHabitacion: async (_, { id, numero, tipo, precio, estado }) => {
            if (!id || !numero || !tipo || precio == null || !estado) {
                throw new Error("Todos los campos son requeridos para actualizar la habitación.");
            }

            try {
                return await habitacion_service.actualizarHabitacion({ id, numero, tipo, precio, estado });
            } catch (error) {
                throw new Error(`Error al actualizar la habitación: ${error.message}`);
            }
        },

        // Eliminar una habitación
        eliminarHabitacion: async (_, { id }) => {
            if (!id) {
                throw new Error("El ID de la habitación es requerido.");
            }

            try {
                return await habitacion_service.eliminarHabitacion(id);
            } catch (error) {
                throw new Error(`Error al eliminar la habitación: ${error.message}`);
            }
        },


        // Crear una nueva reserva
        crearReserva: async (_, { habitacionId, usuarioId, fecha_entrada, fecha_salida }) => {
            if (!habitacionId || !usuarioId || !fecha_entrada || !fecha_salida) {
                throw new Error("Todos los campos son requeridos para crear una reserva.");
            }

            try {
                return await reserva_service.crearReserva({ habitacionId, usuarioId, fecha_entrada, fecha_salida });
            } catch (error) {
                throw new Error(`Error al crear la reserva: ${error.message}`);
            }
        },

        // Actualizar una reserva existente
        actualizarReserva: async (_, { id, habitacion_id, cliente_id, fecha_entrada, fecha_salida, estado }) => {
            if (!id || !habitacion_id || !cliente_id || !fecha_entrada || !fecha_salida) {
                throw new Error("Todos los campos son requeridos para actualizar la reserva.");
            }

            try {
                return await reserva_service.actualizarReserva({ id, habitacion_id, cliente_id, fecha_entrada, fecha_salida, estado });
            } catch (error) {
                throw new Error(`Error al actualizar la reserva: ${error.message}`);
            }
        },

        // Eliminar una reserva
        eliminarReserva: async (_, { id }) => {
            if (!id) {
                throw new Error("El ID de la reserva es requerido.");
            }

            try {
                return await reserva_service.eliminarReserva(id);
            } catch (error) {
                throw new Error(`Error al eliminar la reserva: ${error.message}`);
            }
        },

        // Crear un nuevo usuario
        crearUsuario: async (_, { nombre, apellido, email, telefono, password, rol }) => {
            if (!nombre || !apellido || !email || !telefono || !password || !rol) {
                throw new Error("Los campos nombre, apellido, email, telefono, password y rol son requeridos.");
            }

            try {
                return await usuario_service.crearUsuario({ nombre, apellido, email, telefono, password, rol });
            } catch (error) {
                throw new Error(`Error al crear el usuario: ${error.message}`);
            }
        },

        // Actualizar un usuario existente
        actualizarUsuario: async (_, { id, nombre, apellido, email, telefono, password, rol }) => {
            if (!id || !nombre || !email) {
                throw new Error("Los campos ID, nombre y email son requeridos.");
            }

            try {
                return await usuario_service.actualizarUsuario({ id, nombre, apellido, email, telefono, password, rol });
            } catch (error) {
                throw new Error(`Error al actualizar el usuario: ${error.message}`);
            }
        },

        // Eliminar un usuario
        eliminarUsuario: async (_, { id }) => {
            if (!id) {
                throw new Error("El ID del usuario es requerido.");
            }

            try {
                return await usuario_service.eliminarUsuario(id);
            } catch (error) {
                throw new Error(`Error al eliminar el usuario: ${error.message}`);
            }
        },
    }
};

module.exports = resolvers;
