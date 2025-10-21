const Medico = require("../models/medico");

async function findMedicos() {
  const medicos = await Medico.find();
  return { data: medicos };
}

async function findMedicoById(id) {
  const medico = await Medico.findById(id);
  return medico; // igual ao paciente, retorna direto para o relatorioRoutes
}

async function createMedico(dados) {
  const medico = await Medico.create(dados);
  return medico;
}

async function updateMedico(id, dados) {
  const medico = await Medico.findByIdAndUpdate(id, dados, { new: true });
  return { data: medico };
}

async function deleteMedico(id) {
  await Medico.findByIdAndDelete(id);
  return { message: `Médico ${id} removido com sucesso` };
}

module.exports = {
  findMedicos,
  findMedicoById,
  createMedico,
  updateMedico,
  deleteMedico,
};
