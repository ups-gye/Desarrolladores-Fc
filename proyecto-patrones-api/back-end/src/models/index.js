const { sequelize } = require('../config/database');
const bcrypt = require('bcrypt');
const Hotel = require('./hotel')(sequelize);
const Habitacion = require('./habitacion')(sequelize);
const Reserva = require('./reserva')(sequelize);
const Usuario = require('./usuario')(sequelize);
// Definir relaciones
Hotel.hasMany(Habitacion, { foreignKey: 'hotelId' });
Habitacion.belongsTo(Hotel, { foreignKey: 'hotelId' });

Habitacion.hasMany(Reserva, { foreignKey: 'habitacionId' });
Reserva.belongsTo(Habitacion, { foreignKey: 'habitacionId' });

Usuario.hasMany(Reserva, { foreignKey: 'usuarioId' });
Reserva.belongsTo(Usuario, { foreignKey: 'usuarioId' });

// Sincroniza la base de datos con los modelos
sequelize.sync().then(() => {
    console.log('Modelos sincronizados con la base de datos');
    inicializarDatos();
})


// Función de inicialización de datos
async function inicializarDatos() {
    try {
        // Comprobar si ya existe un hotel
        const hotelExistente = await Hotel.findOne({ where: { nombre: 'Hotel Central' } });

        if (!hotelExistente) {
            console.log('No se encontró el hotel, creando hotel por defecto...');

            // Crear el hotel
            const hotel = await Hotel.create({
                nombre: 'Hotel Central',
                direccion: 'Av. Principal 123'
            });

            // Crear 15 habitaciones para el hotel
            const habitaciones = Array.from({ length: 15 }, (_, i) => ({
                numero: i + 1,
                tipo: 'Estándar',
                hotelId: hotel.id,
                precio: 30,
            }));

            await Habitacion.bulkCreate(habitaciones);

            console.log('Hotel y habitaciones creados exitosamente.');
        } else {
            console.log('El hotel ya existe en la base de datos.');
        }

        const adminExistente = await Usuario.findOne({ where: { email: 'admin@example.com' } });

        if (!adminExistente) {
            const hashedPassword = await bcrypt.hash('admin123', 10); // Contraseña cifrada
            await Usuario.create({
                nombre: 'Administrador',
                email: 'admin@example.com',
                password: hashedPassword,
                rol: 'admin',
            });
            console.log('Usuario admin creado por defecto.');
        } else {
            console.log('El usuario admin ya existe.');
        }
    } catch (error) {
        console.error('Error al inicializar los datos:', error);
    }
}


module.exports = { sequelize, Hotel, Habitacion, Reserva, Usuario, inicializarDatos };
