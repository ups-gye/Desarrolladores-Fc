const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Hotel', {
        nombre: { type: DataTypes.STRING, allowNull: false },
        direccion: { type: DataTypes.STRING, allowNull: false },
        estrellas: { type: DataTypes.INTEGER, defaultValue: 3 }
    }, {
        freezeTableName: true, // Evita que sequelize pluralice el nombre
    });
};
