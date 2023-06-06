const { where } = require('sequelize');
const Transaction = require('../models/Transaction');
const Categoria = require('../models/Categoria');
const User = require('../models/User');

// scripts

module.exports = class transacoesController {
  static async showAll(req, res) {
    const user = await User.findOne({
      attributes: ['name', 'surname'],
      where: { id: req.session.userid },
      plain: true,
    });
    const userInfos = user.dataValues;

    const transacoesSujas = await Transaction.findAll({
      where: { UserId: req.session.userid },
    });

    const tabelasBruto = await Transaction.findAll({
      where: {
        UserId: req.session.userid,
      },
      order: [['createdAt', 'DESC']],
    });
    const categoriasGastosBruto = await Categoria.findAll({
      where: {
        UserId: req.session.userid,
        tipo: 1,
      },
    });
    const categoriasReceitasBruto = await Categoria.findAll({
      where: {
        UserId: req.session.userid,
        tipo: 2,
      },
    });
    const tabelas = tabelasBruto.map((result) => result.get({ plain: true }));
    const categoriasGasto = categoriasGastosBruto.map((result) =>
      result.get({ plain: true }),
    );
    const categoriasReceitas = categoriasReceitasBruto.map((result) =>
      result.get({ plain: true }),
    );

    res.render('transacoes', {
      userInfos,
      tabelas,
      categoriasGasto,
      categoriasReceitas,
    });
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
    console.log(editTable);
    try {
      await Transaction.update(dados, { where: { id: id } });
      req.flash('message', 'Pensamento editado com sucesso!');
      res.redirect('/transacoes');
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
      res.redirect('/transacoes');
    } catch (error) {
      console.log('aconteceu um erro:' + error);
    }
  }
};
