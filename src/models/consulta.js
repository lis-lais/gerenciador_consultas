const mongoose = require('mongoose');

const consultaSchema = new mongoose.Schema({
  data: { type: Date, required: true },
  idMedico: { type: mongoose.Schema.Types.ObjectId, ref: 'Medico', required: true },
  idPaciente: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente', required: true },
  descricao: { type: String, required: true, trim: true }
}, { timestamps: true });

module.exports = mongoose.model('Consulta', consultaSchema);