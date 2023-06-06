var express = require('express');
var router = express.Router();
const movimentacoesController = require('../controllers/movimentacoesController');

const checkAuth = require('../helpers/auth').checkAuth;

/* GET home page. */
router.get('/', checkAuth, movimentacoesController.showHome);

// POST
router.post('/insert', checkAuth, movimentacoesController.insert);
router.post('/deletar', checkAuth, movimentacoesController.delete);
router.post('/edit', checkAuth, movimentacoesController.edit);

module.exports = router;
