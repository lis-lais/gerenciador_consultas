function validatePacienteData({ nome, dataNascimento }) {
  const missingFields = [];

  if (!nome || String(nome).trim() === "") missingFields.push("nome");
  if (!dataNascimento) missingFields.push("dataNascimento");

  return missingFields;
}

module.exports = validatePacienteData;
