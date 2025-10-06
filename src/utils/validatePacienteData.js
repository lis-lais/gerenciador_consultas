function validatePaciente({ nome, dataNascimento }) {
  const missing = [];
  if (!nome || String(nome).trim() === '') missing.push('nome');
  if (!dataNascimento) missing.push('dataNascimento');
  return missing;
}
module.exports = validatePaciente;