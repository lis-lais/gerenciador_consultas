const Consulta = require("../models/consulta");

class ConsultaRepository {
  async create(consulta) {
    return Consulta.create(consulta);
  }
  async findWithPaginationAndFilters(filters) {
    const {
      term,
      data: dataFilter,
      idMedico,
      idPaciente,
      descricao,
      page = 1,
      limit = 10,
    } = filters;

    const parsedPage = Math.max(1, parseInt(page, 10) || 1);
    const parsedLimit = Math.max(1, Math.min(100, parseInt(limit, 10) || 10));
    const skip = (parsedPage - 1) * parsedLimit;

    const query = {};

    // 🔍 Filtro de termo (busca genérica)
    if (term) {
      const regex = new RegExp(term, "i");
      query.$or = [{ descricao: regex }];
    }

    // 🔍 Filtro de data
    if (dataFilter) {
      const d = new Date(dataFilter);
      if (!isNaN(d.getTime())) {
        const start = new Date(
          d.getFullYear(),
          d.getMonth(),
          d.getDate(),
          0,
          0,
          0,
          0
        );
        const end = new Date(
          d.getFullYear(),
          d.getMonth(),
          d.getDate(),
          23,
          59,
          59,
          999
        );
        query.data = { $gte: start, $lte: end };
      }
    }
    // 🔍 Filtros básicos
    if (idMedico) query.idMedico = idMedico;
    if (idPaciente) query.idPaciente = idPaciente;
    if (descricao) query.descricao = new RegExp(descricao, "i");

    // ⚙️ Popula os dados e faz paginação
    const [consultas, totalItems] = await Promise.all([
      Consulta.find(query)
        .populate("idMedico")
        .populate("idPaciente")
        .skip(skip)
        .limit(parsedLimit)
        .sort({ createdAt: -1 }),
      Consulta.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalItems / parsedLimit);
    const hasMore = parsedPage < totalPages;

    return {
      data: consultas,
      page: parsedPage,
      limit: parsedLimit,
      totalItems,
      totalPages,
      hasMore,
    };
  }

  async update(id, data) {
    return Consulta.findByIdAndUpdate(id, data, { new: true })
      .populate("idMedico")
      .populate("idPaciente");
  }
  async delete(id) {
    return Consulta.findByIdAndDelete(id);
  }
}

module.exports = new ConsultaRepository();
