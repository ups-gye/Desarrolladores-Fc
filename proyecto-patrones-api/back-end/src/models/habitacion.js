const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Habitacion', {
        numero: { type: DataTypes.STRING, allowNull: false },
        tipo: { type: DataTypes.STRING, allowNull: false },
        precio: { type: DataTypes.FLOAT, allowNull: false },
        estado: { type: DataTypes.STRING, defaultValue: 'disponible' }
    }, {
        freezeTableName: true, // Evita que sequelize pluralice el nombre
    });
};
