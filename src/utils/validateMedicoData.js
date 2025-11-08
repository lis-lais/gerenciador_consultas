function validateMedicoData({ nome, especialidade }) {
  const missingFields = [];

  if (!nome || String(nome).trim() === "") missingFields.push("nome");
  if (!especialidade || String(especialidade).trim() === "")
    missingFields.push("especialidade");
  return missingFields;
}
module.exports = validateMedicoData;
