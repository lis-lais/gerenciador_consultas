const Paciente = require("../models/paciente");

class PacienteRepository {
  async create(paciente) {
    const novo = new Paciente(paciente);
    await novo.save();
    return novo.toObject();
  }
  async findWithPaginationAndFilters(filters) {
    const { term, nome, dataNascimento, page = 1, limit = 10 } = filters;

    const parsedPage = Math.max(1, parseInt(page, 10) || 1);
    const parsedLimit = Math.max(1, Math.min(100, parseInt(limit, 10) || 10));
    const skip = (parsedPage - 1) * parsedLimit;

    const query = {};

    if (term) {
      const regex = new RegExp(nome, "i");
      query.$or = [{ nome: regex }, { dataNascimento: regex }];

      if (dataNascimento) {
        const d = new Date(dataNascimento);
        if (!isNaN(d.getTime())) {
          // buscar por mesmo dia: start 00:00:00 -> end 23:59:59
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
          query.dataNascimento = { $gte: start, $lte: end };
        }
        // se não for data válida, ignora o filter (ou poderia implementar substring para ISO)
      }
    }
    if (nome) query.nome = new RegExp(nome, "i");
    if (dataNascimento) query.dataNascimento = new RegExp(dataNascimento, "i");

    const [pacientes, totalItems] = await Promise.all([
      Paciente.find(query)
        .skip(skip)
        .limit(parsedLimit)
        .sort({ createdAt: -1 }),
      Paciente.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalItems / parsedLimit);
    const hasMore = parsedPage < parsedLimit;

    return {
      data: pacientes,
      page: parsedPage,
      limit: parsedLimit,
      totalPages,
      totalItems,
      hasMore,
    };
  }
  async update(id, data) {
    return Paciente.findByIdAndUpdate(id, data, { new: true });
  }
  async delete(id) {
    return Paciente.findByIdAndDelete(id);
  }
}

module.exports = new PacienteRepository();
