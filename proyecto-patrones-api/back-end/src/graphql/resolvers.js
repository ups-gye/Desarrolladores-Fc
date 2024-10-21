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

        // Obtener todas las reservas
        reservas: async () => {
            try {
                return await reserva_service.reservas();
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
        }
    },
    Mutation: {
        // Crear un nuevo hotel
        crearHotel: async (_, { nombre, direccion, estrellas }) => {
            if (!nombre || !direccion || estrellas == null) {
                throw new Error("Los campos nombre, dirección y estrellas son requeridos.");
            }

            try {
                return await hotel_service.crearHotel(nombre, direccion, estrellas);
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
                return await hotel_service.actualizarHotel(id, nombre, direccion, estrellas);
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
                return await habitacion_service.crearHabitacion(hotel_id, numero, tipo, precio, estado);
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
                return await habitacion_service.actualizarHabitacion(id, numero, tipo, precio, estado);
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
        crearReserva: async (_, { habitacion_id, cliente_id, fecha_entrada, fecha_salida }) => {
            if (!habitacion_id || !cliente_id || !fecha_entrada || !fecha_salida) {
                throw new Error("Todos los campos son requeridos para crear una reserva.");
            }

            try {
                return await reserva_service.crearReserva(habitacion_id, cliente_id, fecha_entrada, fecha_salida);
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
                return await reserva_service.actualizarReserva(id, habitacion_id, cliente_id, fecha_entrada, fecha_salida, estado);
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
        crearUsuario: async (_, { nombre, email, password }) => {
            if (!nombre || !email || !password) {
                throw new Error("Los campos nombre, email y password son requeridos.");
            }

            try {
                return await usuario_service.crearUsuario(nombre, email, password);
            } catch (error) {
                throw new Error(`Error al crear el usuario: ${error.message}`);
            }
        },

        // Actualizar un usuario existente
        actualizarUsuario: async (_, { id, nombre, email, password }) => {
            if (!id || !nombre || !email) {
                throw new Error("Los campos ID, nombre y email son requeridos.");
            }

            try {
                return await usuario_service.actualizarUsuario(id, nombre, email, password);
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
        }

    }
};

module.exports = resolvers;
