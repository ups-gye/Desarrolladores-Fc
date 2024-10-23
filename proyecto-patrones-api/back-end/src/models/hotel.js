const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Hotel', {
        nombre: { type: DataTypes.STRING, allowNull: false },
        descripcion: { type: DataTypes.STRING, allowNull: true },
        direccion: { type: DataTypes.STRING, allowNull: false },
        pais: { type: DataTypes.STRING, allowNull: false },
        ciudad: { type: DataTypes.STRING, allowNull: false },
        telefono: { type: DataTypes.STRING, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: true },
        estrellas: { type: DataTypes.INTEGER, defaultValue: 3 }
    }, {
        freezeTableName: true, // Evita que sequelize pluralice el nombre
    });
};
