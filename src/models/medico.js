const mongoose = require('mongoose');

const medicoSchema = new mongoose.Schema({
  nome: { type: String, required: true, trim: true },
  especialidade: { type: String, required: true, trim: true }
}, { timestamps: true });

module.exports = mongoose.model('Medico', medicoSchema);