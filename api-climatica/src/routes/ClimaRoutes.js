const express = require('express');
const router = express.Router();
const climaController = require('../controllers/ClimaController');

// Rotas de clima
router.post('/', climaController.criarClima);
router.get('/', climaController.listarClimas);
router.get('/:id', climaController.obterClima);
router.put('/:id', climaController.atualizarClima);  // se tiver esse no controller
router.delete('/:id', climaController.deletarClima);  // se tiver esse no controller

module.exports = router;
