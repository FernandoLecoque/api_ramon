const express = require('express');
const router = express.Router();
const climaController = require('../controllers/climaController');

// Rotas de clima
router.post('/', climaController.criarClima);
router.get('/', climaController.listarClimas);
router.get('/:id', climaController.obterClima);

module.exports = router;
