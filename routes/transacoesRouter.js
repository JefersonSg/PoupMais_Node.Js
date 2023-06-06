var express = require('express');
var router = express.Router();

const transacoesController = require('../controllers/transacoesController');

/* GET users listing. */
router.get('/', transacoesController.showAll);

router.post('/edit', transacoesController.edit);
router.post('/deletar', transacoesController.delete);

module.exports = router;
