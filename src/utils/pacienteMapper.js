function formatPaciente(p) {
  return {
    id: p._id ? p._id.toString() : p.id,
    nome: p.nome,
    dataNascimento: p.dataNascimento,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt
  };
}
function formatPacientes(list) { return list.map(formatPaciente); }
module.exports = { formatPaciente, formatPacientes };
