const { DataTypes } = require('sequelize');

const db = require('../db/conn');

const User = require('./User');

const Categoria = db.define('Categoria', {
  tipo: {
    type: DataTypes.STRING,
    require: true,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING,
    require: true,
    allowNull: false,
  },
});

Categoria.belongsTo(User);
User.hasMany(Categoria);

module.exports = Categoria;
