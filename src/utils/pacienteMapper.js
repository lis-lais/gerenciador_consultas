function formatPaciente(paciente) {
  if (!paciente) return {};
  return {
    id: paciente._id?.toString() || paciente.id,
    nome: paciente.nome,
    dataNascimento: paciente.dataNascimento,
  };
}

function formatPacientes(pacientes) {
  if (!Array.isArray(pacientes)) return [];
  return pacientes.map(formatPaciente);
}

module.exports = { formatPaciente, formatPacientes };
