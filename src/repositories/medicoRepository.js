const Medico = require("../models/medico");

class MedicoRepository {
  async create(medico) {
    return Medico.create(medico);
  }
  async findWithPaginationAndFilters(filters) {
    const { term, nome, especialidade, page = 1, limit = 10 } = filters;

    const parsedPage = Math.max(1, parseInt(page, 10) || 1);
    const parsedLimit = Math.max(1, Math.min(100, parseInt(limit, 10) || 10));
    const skip = (parsedPage - 1) * parsedLimit;

    const query = {};

    if (term) {
      const regex = new RegExp(term, "i");
      query.$or = [{ nome: regex }, { especialidade: regex }];
    }
    if (nome) query.nome = new RegExp(nome, "i");
    if (especialidade) query.especialidade = new RegExp(especialidade, "i");

    const [medicos, totalItems] = await Promise.all([
      Medico.find(query).skip(skip).limit(parsedLimit).sort({ createdAt: -1 }),
      Medico.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalItems / parsedLimit);
    const hasMore = parsedPage < totalPages;

    return {
      data: medicos,
      page: parsedPage,
      limit: parsedLimit,
      totalItems,
      totalPages,
      hasMore,
    };
  }

  async update(id, data) {
    return Medico.findByIdAndUpdate(id, data, { new: true });
  }
  async delete(id) {
    return Medico.findByIdAndDelete(id);
  }
}

module.exports = new MedicoRepository();
