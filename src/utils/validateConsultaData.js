function validateConsulta({ data, idMedico, idPaciente, descricao }) {
  const missing = [];
  if (!data) missing.push('data');
  if (!idMedico) missing.push('idMedico');
  if (!idPaciente) missing.push('idPaciente');
  if (!descricao || String(descricao).trim() === '') missing.push('descricao');
  return missing;
}
module.exports = validateConsulta;