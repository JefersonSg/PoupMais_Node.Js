var express = require('express');
var router = express.Router();
const movimentacoesController = require('../controllers/movimentacoesController');

const checkAuth = require('../helpers/auth').checkAuth;

/* GET home page. */
router.get('/', checkAuth, movimentacoesController.showHome);

// POST
router.post('/insert', checkAuth, movimentacoesController.insert);

module.exports = router;
