const connection = require('../db'); // Conexão com MySQL

const Clima = {
  // Criar novo registro de clima
  create: (clima, callback) => {
    const query = `
      INSERT INTO temperaturas (data, horario, temperatura, umidade, id_local)
      VALUES (?, ?, ?, ?, ?)
    `;
    connection.query(
      query,
      [clima.data, clima.horario, clima.temperatura, clima.umidade, clima.id_local],
      callback
    );
  },

  // Buscar todos os registros com dados do local
  findAll: (callback) => {
    const query = `
      SELECT t.*, l.nome AS nome_local, l.estado, l.pais
      FROM temperaturas t
      JOIN locais l ON t.id_local = l.id_local
    `;
    connection.query(query, callback);
  },

  // Buscar por ID
  findById: (id, callback) => {
    const query = `
      SELECT t.*, l.nome AS nome_local, l.estado, l.pais
      FROM temperaturas t
      JOIN locais l ON t.id_local = l.id_local
      WHERE t.id = ?
    `;
    connection.query(query, [id], callback);
  },

  // Atualizar por ID
  update: (id, clima, callback) => {
    const query = `
      UPDATE temperaturas
      SET data = ?, horario = ?, temperatura = ?, umidade = ?, id_local = ?
      WHERE id = ?
    `;
    connection.query(
      query,
      [clima.data, clima.horario, clima.temperatura, clima.umidade, clima.id_local, id],
      callback
    );
  },

  // Deletar por ID
  delete: (id, callback) => {
    connection.query('DELETE FROM temperaturas WHERE id = ?', [id], callback);
  }
};

module.exports = Clima;
