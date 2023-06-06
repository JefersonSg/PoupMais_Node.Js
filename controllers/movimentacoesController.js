const { where } = require('sequelize');
const Transaction = require('../models/Transaction');
const Categoria = require('../models/Categoria');
const User = require('../models/User');

module.exports = class movimentacoesController {
  static async showHome(req, res) {
    const receitaBruto = await Transaction.findAll({
      where: {
        tipo: 'receita',
        UserId: req.session.userid,
      },
    });
    const user = await User.findOne({
      attributes: ['name', 'surname'],
      where: { id: req.session.userid },
      plain: true,
    });
    const userInfos = user ? user.dataValues : false;

    const transferenciaEnviadaBruto = await Transaction.findAll({
      where: {
        tipo: 'transferencia',
        enviou: '1',
        UserId: req.session.userid,
      },
    });
    const despesaBruto = await Transaction.findAll({
      where: {
        tipo: 'despesa',
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
    const categoriaReceita = await Categoria.findAll({
      where: {
        UserId: req.session.userid,
        tipo: 2,
      },
    });
    const categoriaDespesa = await Categoria.findAll({
      where: {
        UserId: req.session.userid,
        tipo: 1,
      },
    });
    const valoresReceita = receitaBruto.map((result) =>
      result.get({ plain: true }),
    );
    const valoresTransfEnv = transferenciaEnviadaBruto.map((result) =>
      result.get({ plain: true }),
    );
    const valoresDespesa = despesaBruto.map((result) =>
      result.get({ plain: true }),
    );
    const valoresEmprestimo = emprestimoBruto.map((result) =>
      result.get({ plain: true }),
    );
    const ReceitasLista = categoriaReceita.map((result) =>
      result.get({ plain: true }),
    );
    const DespesasLista = categoriaDespesa.map((result) =>
      result.get({ plain: true }),
    );
    const tabelas = tabelasBruto.map((result) => result.get({ plain: true }));
    const tabelas2 = tabelasBruto.map((result) => result.get({ plain: true }));

    let inputValor = [];

    valoresReceita.forEach((valor) => inputValor.push(+valor.valor));
    valoresTransfEnv.forEach((valor) => inputValor.push(-valor.valor));
    valoresDespesa.forEach((valor) => inputValor.push(-valor.valor));
    valoresEmprestimo.forEach((valor) => inputValor.push(-valor.valor));

    // categorias

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

    res.render('movimentacoes', {
      userInfos,
      soma,
      positivo,
      negativo,
      neutro,
      tabelas,
      tabelas2,
      ReceitasLista,
      DespesasLista,
    });
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
  static async edit(req, res) {
    const id = req.body.id;
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
    const editTable = await Transaction.findOne({ where: { id: id } });
    try {
      await Transaction.update(dados, { where: { id: id } });
      req.flash('message', 'Pensamento editado com sucesso!');
      res.redirect('/movimentacoes');
    } catch (error) {
      console.log('aconteceu um erro ' + error);
    }
  }
  static async delete(req, res) {
    const id = req.body.id;

    try {
      await Transaction.destroy({
        where: { id: id, UserId: req.session.userid },
      });
      await req.flash('message', 'Transacao removida com sucesso!');
      res.redirect('/movimentacoes');
    } catch (error) {
      console.log('aconteceu um erro:' + error);
    }
  }
};
