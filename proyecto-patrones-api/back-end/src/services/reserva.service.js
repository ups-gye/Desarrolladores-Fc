const { Reserva, Usuario, Habitacion } = require('../models'); // Importa el modelo Reserva


const reserva_service = {
    ObtenerReservas: async () => {
        try {
            const reservas = await Reserva.findAll({
                include: [
                    { model: Habitacion, as: 'Habitacion' },
                    { model: Usuario, as: 'Usuario' }
                ]
            });
            return reservas.map(reserva => reserva.toJSON());
        } catch (error) {
            throw new Error('Error al obtener las reservas: ' + error.message);
        }
    },

    reservasPorUsuario: async ({ usuarioId }) => {
        try {
            const reservas = await Reserva.findAll({
                where: { usuarioId: usuarioId },
            });
            return reservas;
        } catch (error) {
            throw new Error(`Error al obtener las reservas por usuario: [${usuarioId}]` + error.message);
        }
    },

    numeroDeReservasRegistradas: async ({ habitacionesIds }) => {
        try {
            const reservas = await Reserva.findAll({
                where: {
                    habitacionId: habitacionesIds,
                    estado: 'confirmada',
                },
            });

            return reservas?.length || 0;
        } catch (error) {
            throw new Error(`Error al obtener las reservas por hotel: [${hotelId}]` + error.message);
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
