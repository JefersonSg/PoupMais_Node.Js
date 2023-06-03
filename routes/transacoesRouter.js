var express = require('express');
var router = express.Router();

const transacoesController = require('../controllers/transacoesController');

/* GET users listing. */
router.get('/', transacoesController.showAll);

module.exports = router;
