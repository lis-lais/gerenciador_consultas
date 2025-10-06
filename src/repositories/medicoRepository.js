const Medico = require('../models/medico');

class MedicoRepository {
  async create(data) {
    return Medico.create(data);
  }
  async findWithFilters(filters) {
    const { nome, especialidade, page = 1, limit = 10 } = filters;
    const query = {};
    if (nome) query.nome = new RegExp(nome, 'i');
    if (especialidade) query.especialidade = new RegExp(especialidade, 'i');
    const parsedPage = Math.max(1, parseInt(page, 10) || 1);
    const parsedLimit = Math.max(1, Math.min(100, parseInt(limit, 10) || 10));
    const skip = (parsedPage - 1) * parsedLimit;
    const [data, totalItems] = await Promise.all([
      Medico.find(query).skip(skip).limit(parsedLimit).sort({ createdAt: -1 }),
      Medico.countDocuments(query)
    ]);
    return { data, page: parsedPage, limit: parsedLimit, totalItems, totalPages: Math.ceil(totalItems / parsedLimit) };
  }
  async findById(id) {
    return Medico.findById(id);
  }
  async update(id, payload) {
    return Medico.findByIdAndUpdate(id, payload, { new: true });
  }
  async delete(id) {
    return Medico.findByIdAndDelete(id);
  }
}

module.exports = new MedicoRepository();