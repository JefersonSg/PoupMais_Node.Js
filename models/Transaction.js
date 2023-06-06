const { DataTypes } = require('sequelize');

const db = require('../db/conn');

const User = require('./User');

const Transaction = db.define('Transaction', {
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  enviou: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  valor: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: true,

    require: true,
  },
  data: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  parcelas: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  juros: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  juros_composto: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  total: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  total_pago: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Transaction.belongsTo(User);
User.hasMany(Transaction);

module.exports = Transaction;
