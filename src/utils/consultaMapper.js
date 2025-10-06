function formatConsulta(c) {
  return {
    id: c._id ? c._id.toString() : c.id,
    data: c.data,
    idMedico: c.idMedico,
    idPaciente: c.idPaciente,
    descricao: c.descricao,
    createdAt: c.createdAt,
    updatedAt: c.updatedAt
  };
}
function formatConsultas(list) { return list.map(formatConsulta); }
module.exports = { formatConsulta, formatConsultas };