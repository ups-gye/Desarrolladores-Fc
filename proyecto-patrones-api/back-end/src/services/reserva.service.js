const { Reserva } = require('../models'); // Importa el modelo Reserva

const reserva_service = {
    reservas: async () => {
        try {
            const reservas = await Reserva.findAll();
            return reservas;
        } catch (error) {
            throw new Error('Error al obtener las reservas: ' + error.message);
        }
    },

    crearReserva: async ({ habitacionId, usuarioId, fecha_entrada, fecha_salida }) => {

        try {
            const reserva = await Reserva.create({
                habitacionId,
                usuarioId,
                fecha_entrada,
                fecha_salida,
                estado: 'confirmada',
            });
            return reserva;
        } catch (error) {
            throw new Error('Error al crear la reserva: ' + error.message);
        }
    },

    actualizarReserva: async ({ id, habitacionId, usuarioId, fecha_entrada, fecha_salida, estado }) => {
        try {
            const reserva = await Reserva.findByPk(id);
            if (!reserva) throw new Error('Reserva no encontrada');

            await reserva.update({ habitacionId, usuarioId, fecha_entrada, fecha_salida, estado });
            return reserva;
        } catch (error) {
            throw new Error('Error al actualizar la reserva: ' + error.message);
        }
    },

    eliminarReserva: async ({ id }) => {
        try {
            const reserva = await Reserva.findByPk(id);
            if (!reserva) throw new Error('Reserva no encontrada');

            await reserva.destroy();
            return { id };
        } catch (error) {
            throw new Error('Error al eliminar la reserva: ' + error.message);
        }
    },
};

module.exports = reserva_service;
