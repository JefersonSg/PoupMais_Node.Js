const { where } = require('sequelize');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

module.exports = class movimentacoesController {
  static async showHome(req, res) {
    const vendasBruto = await Transaction.findAll({
      where: {
        tipo: 'venda',
        UserId: req.session.userid,
      },
    });
    const transferenciaRecebidaBruto = await Transaction.findAll({
      where: {
        tipo: 'transferencia',
        enviou: '1',
        UserId: req.session.userid,
      },
    });
    const transferenciaEnviadaBruto = await Transaction.findAll({
      where: {
        tipo: 'transferencia',
        enviou: '1',
        UserId: req.session.userid,
      },
    });
    const compraBruto = await Transaction.findAll({
      where: {
        tipo: 'compra',
        UserId: req.session.userid,
      },
    });
    const emprestimoBruto = await Transaction.findAll({
      where: {
        tipo: 'emprestimo',
        UserId: req.session.userid,
      },
    });
    const tabelasBruto = await Transaction.findAll({
      where: {
        UserId: req.session.userid,
      },
      limit: 10,
      order: [['createdAt', 'DESC']],
    });

    const valoresVendas = vendasBruto.map((result) =>
      result.get({ plain: true }),
    );
    const valoresTransfRec = transferenciaRecebidaBruto.map((result) =>
      result.get({ plain: true }),
    );
    const valoresTransfEnv = transferenciaEnviadaBruto.map((result) =>
      result.get({ plain: true }),
    );
    const valoresCompra = compraBruto.map((result) =>
      result.get({ plain: true }),
    );
    const valoresEmprestimo = emprestimoBruto.map((result) =>
      result.get({ plain: true }),
    );
    const tabelas = tabelasBruto.map((result) => result.get({ plain: true }));

    let inputValor = [];

    valoresVendas.forEach((valor) => inputValor.push(+valor.valor));
    valoresTransfRec.forEach((valor) => inputValor.push(+valor.valor));
    valoresTransfEnv.forEach((valor) => inputValor.push(-valor.valor));
    valoresCompra.forEach((valor) => inputValor.push(-valor.valor));
    valoresEmprestimo.forEach((valor) => inputValor.push(-valor.valor));

    let soma = inputValor.reduce(
      (acumulador, valorAtual) => +acumulador + valorAtual,
      0,
    );
    let positivo = false;
    let negativo = false;
    let neutro = true;

    if (soma > 0) {
      positivo = true;
      neutro = false;
      negativo = false;
    } else if (soma == 0) {
      positivo = false;
      neutro = true;
      negativo = false;
    } else {
      positivo = false;
      neutro = false;
      negativo = true;
    }

    res.render('movimentacoes', { soma, positivo, negativo, neutro, tabelas });
  }
  static async insert(req, res) {
    const {
      tipo,
      nome,
      enviou,
      valor,
      categoria,
      data,
      parcelas,
      juros,
      juros_composto,
      total,
      total_pago,
    } = req.body;

    const dados = {
      tipo,
      nome,
      enviou,
      valor,
      categoria,
      data,
      parcelas,
      juros,
      juros_composto,
      total,
      total_pago,
      UserId: req.session.userid,
    };

    try {
      await Transaction.create(dados);
      req.flash('message', 'Transação criada com sucesso');
      req.session.save(() => {
        res.redirect('/movimentacoes');
      });
    } catch (error) {
      console.log('aconteceu um erro' + error);
    }
  }
};
