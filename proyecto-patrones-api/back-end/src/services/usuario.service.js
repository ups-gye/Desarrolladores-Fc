const { Usuario } = require('../models'); // Importa el modelo

const usuario_service = {
    // Obtener todos los usuarios
    obtenerUsuarios: async () => {
        try {
            const usuarios = await Usuario.findAll();
            return usuarios;
        } catch (error) {
            throw new Error(`Error al obtener los usuarios: ${error.message}`);
        }
    },

    // Crear un nuevo usuario
    crearUsuario: async ({ nombre, email, password, rol }) => {
        try {
            const usuario = await Usuario.create({ nombre, email, password, rol });
            return usuario;
        } catch (error) {
            throw new Error(`Error al crear el usuario: ${error.message}`);
        }
    },

    // Actualizar un usuario existente
    actualizarUsuario: async ({ id, nombre, email, password, rol }) => {
        try {
            const [updated] = await Usuario.update(
                { nombre, email, password, rol },
                { where: { id } }
            );

            if (!updated) {
                throw new Error(`No se encontró el usuario con id: ${id}`);
            }

            return { id, nombre, email, password, rol };
        } catch (error) {
            throw new Error(`Error al actualizar el usuario: ${error.message}`);
        }
    },

    // Eliminar un usuario por su ID
    eliminarUsuario: async ({ id }) => {
        try {
            const deleted = await Usuario.destroy({ where: { id } });

            if (!deleted) {
                throw new Error(`No se encontró el usuario con id: ${id}`);
            }

            return { id };
        } catch (error) {
            throw new Error(`Error al eliminar el usuario: ${error.message}`);
        }
    },

    //obtener por email
    obtenerUsuarioPorEmail: async (email) => {
        try {
            const usuario = await Usuario.findOne({ where: { email } });
            return usuario;
        } catch (error) {
            throw new Error(`Error al obtener el usuario: ${error.message}`);
        }
    },

};

module.exports = usuario_service;