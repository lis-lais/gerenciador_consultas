const Consulta = require('../models/Consulta');

class ConsultaRepository {
  async create(data) {
    return Consulta.create(data);
  }
  async findWithFilters(filters) {
    const { data: dataFilter, idMedico, idPaciente, descricao, page = 1, limit = 10 } = filters;
    const query = {};

    if (dataFilter) {
      const d = new Date(dataFilter);
      if (!isNaN(d.getTime())) {
        // buscar por mesmo dia (ignorando horário)
        const start = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
        const end = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
        query.data = { $gte: start, $lte: end };
      } else {
        // se dataFilter não for data válida, deixamos sem filtro por data
      }
    }

    if (idMedico) query.idMedico = idMedico;
    if (idPaciente) query.idPaciente = idPaciente;
    if (descricao) query.descricao = new RegExp(descricao, 'i');

    const parsedPage = Math.max(1, parseInt(page, 10) || 1);
    const parsedLimit = Math.max(1, Math.min(100, parseInt(limit, 10) || 10));
    const skip = (parsedPage - 1) * parsedLimit;
    const [data, totalItems] = await Promise.all([
      Consulta.find(query).skip(skip).limit(parsedLimit).sort({ createdAt: -1 }),
      Consulta.countDocuments(query)
    ]);
    return { data, page: parsedPage, limit: parsedLimit, totalItems, totalPages: Math.ceil(totalItems / parsedLimit) };
  }
  async findById(id) {
    return Consulta.findById(id);
  }
  async update(id, payload) {
    return Consulta.findByIdAndUpdate(id, payload, { new: true });
  }
  async delete(id) {
    return Consulta.findByIdAndDelete(id);
  }
}

module.exports = new ConsultaRepository();