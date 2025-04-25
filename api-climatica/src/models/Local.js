const connection = require('../db'); // Conexão com MySQL (aqui você importa sua conexão)

const Local = {
  // Criar novo local
  create: (local, callback) => {
    const query = 'INSERT INTO locais (nome, estado, pais) VALUES (?, ?, ?)';
    connection.query(query, [local.nome, local.estado, local.pais], callback);
  },

  // Buscar todos os locais
  findAll: (callback) => {
    connection.query('SELECT * FROM locais', callback);
  },

  // Buscar local por ID
  findById: (id, callback) => {
    connection.query('SELECT * FROM locais WHERE id_local = ?', [id], callback);
  },

  // Atualizar local por ID
  update: (id, local, callback) => {
    const query = 'UPDATE locais SET nome = ?, estado = ?, pais = ? WHERE id_local = ?';
    connection.query(query, [local.nome, local.estado, local.pais, id], callback);
  },

  // Deletar local por ID
  delete: (id, callback) => {
    connection.query('DELETE FROM locais WHERE id_local = ?', [id], callback);
  }
};

module.exports = Local;
