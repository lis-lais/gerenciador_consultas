function formatMedico(m) {
  return {
    id: m._id ? m._id.toString() : m.id,
    nome: m.nome,
    especialidade: m.especialidade,
    createdAt: m.createdAt,
    updatedAt: m.updatedAt
  };
}
function formatMedicos(list) { return list.map(formatMedico); }
module.exports = { formatMedico, formatMedicos };