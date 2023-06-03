const { where } = require('sequelize');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

// scripts
const data = {
  script: 'slide.js',
  script2: 'chart.js',
  script3: 'contaTransacaoEdit.js',
  script4: 'resumosEmprestimos.js',
  script5: 'resumosDespesas.js',
  script6: 'resumosReceitas.js',
};

module.exports = class transacoesController {
  static async showAll(req, res) {
    res.render('transacoes', { data });
  }
};
