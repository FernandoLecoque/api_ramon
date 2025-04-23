const Clima = require('../models/Clima');

// Criar registro climático
exports.criarClima = async (req, res) => {
  const { local, temperatura, umidade } = req.body;
  try {
    const novoClima = new Clima({ local, temperatura, umidade });
    await novoClima.save();
    res.status(201).json(novoClima);
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao criar clima', detalhes: err });
  }
};

// Listar todos os registros
exports.listarClimas = async (req, res) => {
  try {
    const climas = await Clima.find().populate('local');
    res.status(200).json(climas);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar climas', detalhes: err });
  }
};

// Obter por ID
exports.obterClima = async (req, res) => {
  try {
    const clima = await Clima.findById(req.params.id).populate('local');
    if (!clima) return res.status(404).json({ mensagem: 'Clima não encontrado' });
    res.json(clima);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar clima', detalhes: err });
  }
};
