const Clima = require('../models/climaModel');

// Criar registro climático
exports.criarClima = (req, res) => {
  const { id_local, temperatura, umidade } = req.body;

  const now = new Date();
  const data = now.toISOString().split('T')[0]; // formato YYYY-MM-DD
  const horario = now.toTimeString().split(' ')[0]; // formato HH:MM:SS

  const novoClima = { data, horario, temperatura, umidade, id_local };

  Clima.create(novoClima, (err, result) => {
    if (err) return res.status(400).json({ erro: 'Erro ao criar clima', detalhes: err });
    res.status(201).json({ id: result.insertId, ...novoClima });
  });
};

// Listar todos os registros
exports.listarClimas = (req, res) => {
  Clima.findAll((err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar climas', detalhes: err });
    res.status(200).json(results);
  });
};

// Obter clima por ID
exports.obterClima = (req, res) => {
  const id = req.params.id;

  Clima.findById(id, (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar clima', detalhes: err });
    if (results.length === 0) return res.status(404).json({ mensagem: 'Clima não encontrado' });
    res.json(results[0]);
  });
};
