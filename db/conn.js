const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('poupmais', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql',
// });

const sequelize = new Sequelize('poupmais', 'root', 'SenhaServer132*', {
  host: 'localhost',
  dialect: 'mysql',
});

try {
  sequelize.authenticate();
  console.log('Conectado ao MySQL');
} catch (err) {
  console.log(`Não foi possivel conectar ao MySQL:${err}`);
}

module.exports = sequelize;
