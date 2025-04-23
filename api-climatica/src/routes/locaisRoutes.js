const express = require('express');
const router = express.Router();
const localController = require('../controllers/localController');

// Rotas de locais
router.post('/', localController.criarLocal);
router.get('/', localController.listarLocais);
router.get('/:id', localController.obterLocal);
router.put('/:id', localController.atualizarLocal);
router.delete('/:id', localController.deletarLocal);

module.exports = router;
