const Paciente = require('../models/Paciente');

class PacienteRepository {
  async create(data) {
    return Paciente.create(data);
  }
  async findWithFilters(filters) {
    const { nome, dataNascimento, page = 1, limit = 10 } = filters;
    const query = {};
    if (nome) query.nome = new RegExp(nome, 'i');

    if (dataNascimento) {
      const d = new Date(dataNascimento);
      if (!isNaN(d.getTime())) {
        // buscar por mesmo dia: start 00:00:00 -> end 23:59:59
        const start = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
        const end = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
        query.dataNascimento = { $gte: start, $lte: end };
      }
      // se não for data válida, ignora o filter (ou poderia implementar substring para ISO)
    }

    const parsedPage = Math.max(1, parseInt(page, 10) || 1);
    const parsedLimit = Math.max(1, Math.min(100, parseInt(limit, 10) || 10));
    const skip = (parsedPage - 1) * parsedLimit;
    const [data, totalItems] = await Promise.all([
      Paciente.find(query).skip(skip).limit(parsedLimit).sort({ createdAt: -1 }),
      Paciente.countDocuments(query)
    ]);
    return { data, page: parsedPage, limit: parsedLimit, totalItems, totalPages: Math.ceil(totalItems / parsedLimit) };
  }
  async findById(id) {
    return Paciente.findById(id);
  }
  async update(id, payload) {
    return Paciente.findByIdAndUpdate(id, payload, { new: true });
  }
  async delete(id) {
    return Paciente.findByIdAndDelete(id);
  }
}

module.exports = new PacienteRepository();