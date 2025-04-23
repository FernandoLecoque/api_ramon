const mongoose = require('mongoose');

const LocalSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    estado: { type: String, required: true },
    pais: { type: String, required: true }
});

module.exports = mongoose.model('Local', LocalSchema);
