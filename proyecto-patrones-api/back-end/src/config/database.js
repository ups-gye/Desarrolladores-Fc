const { Sequelize } = require('sequelize');
require('dotenv').config(); // Carga variables de entorno

// Configura Sequelize con las variables de entorno
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false, // Opcional: desactiva logs de SQL
    }
);

async function connectToDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida exitosamente.');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
}
module.exports = { sequelize, connectToDatabase };
