const mongoose = require("mongoose");

const pacienteSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, trim: true },
    dataNascimento: { type: String, required: true, trim: true },
  },
  { timestamps: true, strict: true }
);

const Paciente = mongoose.model("Paciente", pacienteSchema);

module.exports = Paciente;
