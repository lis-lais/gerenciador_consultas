// src/services/consultaService.js
const Consulta = require('../models/consulta');

async function findConsultas(filtros = {}) {
  const consultas = await Consulta.find(filtros);
  return { data: consultas };
}

async function createConsulta(dados) {
  const consulta = await Consulta.create(dados);
  return { data: consulta };
}

async function findConsultaById(id) {
  const consulta = await Consulta.findById(id);
  return { data: consulta };
}

async function updateConsulta(id, dados) {
  const consulta = await Consulta.findByIdAndUpdate(id, dados, { new: true });
  return { data: consulta };
}

async function deleteConsulta(id) {
  await Consulta.findByIdAndDelete(id);
  return { message: `Consulta ${id} removida com sucesso` };
}

module.exports = {
  findConsultas,
  createConsulta,
  findConsultaById,
  updateConsulta,
  deleteConsulta
};
