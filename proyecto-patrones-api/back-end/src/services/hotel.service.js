const { Hotel } = require('../models'); // Importa el modelo Hotel

const hotel_service = {
    hoteles: async () => {
        try {
            const hoteles = await Hotel.findAll();
            return hoteles;
        } catch (error) {
            throw new Error('Error al obtener los hoteles: ' + error.message);
        }
    },

    crearHotel: async ({ nombre, direccion, estrellas }) => {
        try {
            const hotel = await Hotel.create({ nombre, direccion, estrellas });
            return hotel;
        } catch (error) {
            throw new Error('Error al crear el hotel: ' + error.message);
        }
    },

    actualizarHotel: async ({ id, nombre, direccion, estrellas }) => {
        try {
            const hotel = await Hotel.findByPk(id);
            if (!hotel) throw new Error('Hotel no encontrado');

            await hotel.update({ nombre, direccion, estrellas });
            return hotel;
        } catch (error) {
            throw new Error('Error al actualizar el hotel: ' + error.message);
        }
    },

    eliminarHotel: async ({ id }) => {
        try {
            const hotel = await Hotel.findByPk(id);
            if (!hotel) throw new Error('Hotel no encontrado');

            await hotel.destroy();
            return { id };
        } catch (error) {
            throw new Error('Error al eliminar el hotel: ' + error.message);
        }
    },
};

module.exports = hotel_service;
