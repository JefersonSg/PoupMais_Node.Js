const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('poupmais', 'root', '', {
  host: '34.173.171.235',
  dialect: 'mysql',
});

try {
  sequelize.authenticate();
  console.log('Conectado ao MySQL');
} catch (err) {
  console.log(`Não foi possivel conectar ao MySQL:${err}`);
}

module.exports = sequelize;
