const Local = require('../models/Local');

// Criar um local
exports.criarLocal = async (req, res) => {
  const { nome, estado, pais } = req.body;
  try {
    const novoLocal = new Local({ nome, estado, pais });
    await novoLocal.save();
    res.status(201).json(novoLocal);
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao criar local', detalhes: err });
  }
};

// Listar todos os locais
exports.listarLocais = async (req, res) => {
  try {
    const locais = await Local.find();
    res.status(200).json(locais);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar locais', detalhes: err });
  }
};

// Obter local por ID
exports.obterLocal = async (req, res) => {
  try {
    const local = await Local.findById(req.params.id);
    if (!local) return res.status(404).json({ mensagem: 'Local não encontrado' });
    res.status(200).json(local);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar local', detalhes: err });
  }
};

// Atualizar local
exports.atualizarLocal = async (req, res) => {
  try {
    const localAtualizado = await Local.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!localAtualizado) return res.status(404).json({ mensagem: 'Local não encontrado' });
    res.json(localAtualizado);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar local', detalhes: err });
  }
};

// Deletar local
exports.deletarLocal = async (req, res) => {
  try {
    const deletado = await Local.findByIdAndDelete(req.params.id);
    if (!deletado) return res.status(404).json({ mensagem: 'Local não encontrado' });
    res.json({ mensagem: 'Local deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar local', detalhes: err });
  }
};
