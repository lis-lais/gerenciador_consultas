function validateMedico({ nome, especialidade }) {
  const missing = [];
  if (!nome || String(nome).trim() === '') missing.push('nome');
  if (!especialidade || String(especialidade).trim() === '') missing.push('especialidade');
  return missing;
}
module.exports = validateMedico;