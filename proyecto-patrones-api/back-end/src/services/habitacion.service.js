const { Habitacion } = require('../models'); // Importa el modelo Habitacion

const habitacion_service = {
    habitaciones: async ({ hotelId }) => {
        try {
            const habitaciones = await Habitacion.findAll({
                where: { hotelId },
            });
            return habitaciones;
        } catch (error) {
            throw new Error('Error al obtener las habitaciones: ' + error.message);
        }
    },

    crearHabitacion: async ({ hotel_id, numero, tipo, precio, estado }) => {
        console.log('hotelId:', hotel_id);
        const hotelId = hotel_id;
        try {
            const habitacion = await Habitacion.create({
                hotelId,
                numero,
                tipo,
                precio,
                estado,
            });
            return habitacion;
        } catch (error) {
            throw new Error('Error al crear la habitación: ' + error.message);
        }
    },

    actualizarHabitacion: async ({ id, hotelId, numero, tipo, precio, estado }) => {
        try {
            const habitacion = await Habitacion.findByPk(id);
            if (!habitacion) throw new Error('Habitación no encontrada');

            await habitacion.update({ hotelId, numero, tipo, precio, estado });
            return habitacion;
        } catch (error) {
            throw new Error('Error al actualizar la habitación: ' + error.message);
        }
    },

    eliminarHabitacion: async ({ id }) => {
        try {
            const habitacion = await Habitacion.findByPk(id);
            if (!habitacion) throw new Error('Habitación no encontrada');

            await habitacion.destroy();
            return { id };
        } catch (error) {
            throw new Error('Error al eliminar la habitación: ' + error.message);
        }
    },
};

module.exports = habitacion_service;
