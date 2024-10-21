const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Reserva', {
        fecha_entrada: { type: DataTypes.STRING, allowNull: false },
        fecha_salida: { type: DataTypes.STRING, allowNull: false },
        estado: { type: DataTypes.STRING, defaultValue: 'activa' }
    }, {
        freezeTableName: true, // Evita que sequelize pluralice el nombre
    });
};
