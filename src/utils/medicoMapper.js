function formatMedico(medico) {
  if (!medico) return {};

  return {
    id: medico._id?.toString() || medico.id?.toString() || null,
    nome: medico.nome || null,
    especialidade: medico.especialidade || null,
    createdAt: medico.createdAt || null,
    updatedAt: medico.updatedAt || null,
  };
}

function formatMedicos(medicos = []) {
  return medicos.map(formatMedico);
}

module.exports = { formatMedico, formatMedicos };
