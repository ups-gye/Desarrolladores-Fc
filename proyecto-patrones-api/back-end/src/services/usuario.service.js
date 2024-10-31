const { Usuario } = require('../models'); // Importa el modelo
const bcrypt = require('bcrypt');
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
    crearUsuario: async ({ nombre, apellido, email, telefono, password, rol }) => {
        try {
            const hashedPassword = await bcrypt.hash(password, 10); // Contraseña cifrada
            const usuario = await Usuario.create({ nombre: nombre, apellido: apellido, email: email, telefono: telefono, password: hashedPassword, rol: rol });
            return usuario;
        } catch (error) {
            throw new Error(`Error al crear el usuario: ${error.message}`);
        }
    },

    // Actualizar un usuario existente
    actualizarUsuario: async ({ id, nombre, apellido, email, telefono, password, rol }) => {
        try {
            const hashedPassword = await bcrypt.hash(password, 10); // Contraseña cifrada
            const [updated] = await Usuario.update(
                { nombre: nombre, apellido: apellido, email: email, telefono: telefono, password: hashedPassword, rol: rol },
                { where: { id } }
            );

            if (!updated) {
                throw new Error(`No se encontró el usuario con id: ${id}`);
            }

            return { id, nombre, apellido, email, telefono, password, rol };
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