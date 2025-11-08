const mongoose = require("mongoose");

const medicoSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, trim: true },
    especialidade: { type: String, required: true, trim: true },
  },
  { timestamps: true, strict: true }
);

const Medico = mongoose.model("Medico", medicoSchema);

module.exports = Medico;
