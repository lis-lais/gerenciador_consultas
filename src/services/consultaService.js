const consultaRepository = require("../repositories/consultaRepository");

class ConsultaService {
  async createConsulta(data) {
    const consulta = await consultaRepository.create(data);
    return consulta;
  }

  async findConsultas(filters) {
    return consultaRepository.findWithPaginationAndFilters(filters);
  }

  async updateConsulta(id, data) {
    const updatedConsulta = await consultaRepository.update(id, data);
    return updatedConsulta;
  }

  async deleteConsulta(id) {
    return consultaRepository.delete(id);
  }
}

module.exports = new ConsultaService();
