const { where } = require('sequelize');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

// scripts

module.exports = class transacoesController {
  static async showAll(req, res) {
    res.render('transacoes');
  }
};
