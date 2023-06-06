const User = require('../models/User');
const { where } = require('sequelize');
const handlebars = require('handlebars');

// Registro do helper personalizado
handlebars.registerHelper('nomeUsuario', async function (req, res) {
  // Lógica para obter o nome de usuário do backend
  var nomeUsuario = 'Jeferson Silva';

  // Retorna o nome de usuário
  return nomeUsuario;
});
