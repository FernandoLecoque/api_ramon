const Local = require('../models/localModel');

// Criar um local
exports.criarLocal = (req, res) => {
  const { nome, estado, pais } = req.body;

  Local.create({ nome, estado, pais }, (err, result) => {
    if (err) return res.status(400).json({ erro: 'Erro ao criar local', detalhes: err });
    res.status(201).json({ id_local: result.insertId, nome, estado, pais });
  });
};

// Listar todos os locais
exports.listarLocais = (req, res) => {
  Local.findAll((err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar locais', detalhes: err });
    res.status(200).json(results);
  });
};

// Obter local por ID
exports.obterLocal = (req, res) => {
  const id = req.params.id;

  Local.findById(id, (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar local', detalhes: err });
    if (results.length === 0) return res.status(404).json({ mensagem: 'Local não encontrado' });
    res.status(200).json(results[0]);
  });
};

// Atualizar local
exports.atualizarLocal = (req, res) => {
  const id = req.params.id;
  const { nome, estado, pais } = req.body;

  Local.update(id, { nome, estado, pais }, (err, result) => {
    if (err) return res.status(500).json({ erro: 'Erro ao atualizar local', detalhes: err });
    if (result.affectedRows === 0) return res.status(404).json({ mensagem: 'Local não encontrado' });
    res.json({ mensagem: 'Local atualizado com sucesso' });
  });
};

// Deletar local
exports.deletarLocal = (req, res) => {
  const id = req.params.id;

  Local.delete(id, (err, result) => {
    if (err) return res.status(500).json({ erro: 'Erro ao deletar local', detalhes: err });
    if (result.affectedRows === 0) return res.status(404).json({ mensagem: 'Local não encontrado' });
    res.json({ mensagem: 'Local deletado com sucesso' });
  });
};
