// src/services/pacienteService.js
const Paciente = require('../models/paciente');

async function findPacientes() {
  const pacientes = await Paciente.find();
  return { data: pacientes };
}

async function findPacienteById(id) {
  const paciente = await Paciente.findById(id);
  return paciente; // aqui não precisa {data}, porque seu relatorioRoutes espera direto o objeto
}

async function createPaciente(dados) {
  const paciente = await Paciente.create(dados);
  return { data: paciente };
}

async function updatePaciente(id, dados) {
  const paciente = await Paciente.findByIdAndUpdate(id, dados, { new: true });
  return { data: paciente };
}

async function deletePaciente(id) {
  await Paciente.findByIdAndDelete(id);
  return { message: `Paciente ${id} removido com sucesso` };
}

module.exports = {
  findPacientes,
  findPacienteById,
  createPaciente,
  updatePaciente,
  deletePaciente
};
