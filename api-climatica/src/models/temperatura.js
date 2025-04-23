const mongoose = require('mongoose');

const ClimaSchema = new mongoose.Schema({
    local: { type: mongoose.Schema.Types.ObjectId, ref: 'Local', required: true },
    dataHora: { type: Date, default: Date.now },
    temperatura: { type: Number, required: true },
    umidade: { type: Number, required: true }
});

module.exports = mongoose.model('Clima', ClimaSchema);
