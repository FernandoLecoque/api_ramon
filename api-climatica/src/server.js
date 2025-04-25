const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'api_clima'
});



connection.connect(err => {
  if (err) {
    console.error('❌ Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('✅ Conectado ao MySQL');
  app.listen(3000, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  });
});


// 📥 POST - Criar novo local
app.post('/locais', (req, res) => {
  const { nome, estado, pais } = req.body;
  const query = 'INSERT INTO locais (nome, estado, pais) VALUES (?, ?, ?)';
  connection.query(query, [nome, estado, pais], (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.status(201).json({ id: results.insertId, nome, estado, pais });
  });
});

// 📤 GET - Buscar todos os locais
app.get('/locais', (req, res) => {
  connection.query('SELECT * FROM locais', (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(results);
  });
});

// 📤 GET - Buscar local por ID
app.get('/locais/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM locais WHERE id_local = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    if (results.length === 0) return res.status(404).json({ erro: 'Local não encontrado' });
    res.json(results[0]);
  });
});

// ✏️ PUT - Atualizar local por ID
app.put('/locais/:id', (req, res) => {
  const { id } = req.params;
  const { nome, estado, pais } = req.body;
  const query = 'UPDATE locais SET nome = ?, estado = ?, pais = ? WHERE id_local = ?';
  connection.query(query, [nome, estado, pais, id], (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: 'Local atualizado com sucesso' });
  });
});

// ❌ DELETE - Remover local por ID
app.delete('/locais/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM locais WHERE id_local = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: 'Local removido com sucesso' });
  });
});

// 📥 POST - Criar nova temperatura
app.post('/temperaturas', (req, res) => {
  const { data, horario, temperatura, id_local } = req.body;
  const query = 'INSERT INTO temperaturas (data, horario, temperatura, id_local) VALUES (?, ?, ?, ?)';
  connection.query(query, [data, horario, temperatura, id_local], (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.status(201).json({ id: results.insertId, data, horario, temperatura, id_local });
  });
});

// 📤 GET - Buscar todas as temperaturas
app.get('/temperaturas', (req, res) => {
  connection.query(`
    SELECT t.*, l.nome AS nome_local, l.estado, l.pais
    FROM temperaturas t
    JOIN locais l ON t.id_local = l.id_local
    `, (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(results);
  });
});

// 📤 GET - Buscar temperatura por ID
app.get('/temperaturas/:id', (req, res) => {
  const { id } = req.params;
  connection.query(`
    SELECT t.*, l.nome AS nome_local, l.estado, l.pais
    FROM temperaturas t
    JOIN locais l ON t.id_local = l.id_local
    WHERE t.id = ?
    `, [id], (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    if (results.length === 0) return res.status(404).json({ erro: 'Registro de temperatura não encontrado' });
    res.json(results[0]);
  });
});

// ✏️ PUT - Atualizar temperatura por ID
app.put('/temperaturas/:id', (req, res) => {
  const { id } = req.params;
  const { data, horario, temperatura, id_local } = req.body;
  const query = 'UPDATE temperaturas SET data = ?, horario = ?, temperatura = ?, id_local = ? WHERE id = ?';
  connection.query(query, [data, horario, temperatura, id_local, id], (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: 'Registro de temperatura atualizado com sucesso' });
  });
});

// ❌ DELETE - Remover temperatura por ID
app.delete('/temperaturas/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM temperaturas WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: 'Registro de temperatura removido com sucesso' });
  });
});
