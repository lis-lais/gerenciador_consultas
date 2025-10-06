const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
  nome: { type: String, required: true, trim: true },
  dataNascimento: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Paciente', pacienteSchema);