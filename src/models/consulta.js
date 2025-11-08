const mongoose = require("mongoose");

const consultaSchema = new mongoose.Schema(
  {
    data: { type: String, required: true, trim: true },
    idMedico: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medico",
      required: true,
      trim: true,
    },
    idPaciente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Paciente",
      required: true,
      trim: true,
    },
    descricao: { type: String, required: true, trim: true },
  },
  { timestamps: true, strict: true }
);

const Consulta = mongoose.model("Consulta", consultaSchema);

module.exports = Consulta;
