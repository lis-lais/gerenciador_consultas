const pacienteRepository = require("../repositories/pacienteRepository");
const consultaRepository = require("../repositories/consultaRepository");

class PacienteService {
  async createPaciente(data) {
    return pacienteRepository.create(data);
  }

  async findPacientes(filters) {
    return pacienteRepository.findWithPaginationAndFilters(filters);
  }

  async updatePaciente(id, data) {
    const updatedPaciente = await pacienteRepository.update(id, data);
    if (!updatedPaciente) return null;

    // Atualizar automaticamente o nome/dataNascimento nas consultas associadas
    await consultaRepository.updateMany(
      { idPaciente: id },
      {
        $set: {
          "idPaciente.nome": data.nome,
          "idPaciente.dataNascimento": data.dataNascimento,
        },
      }
    );

    return updatedPaciente;
  }

  async deletePaciente(id) {
    const deletedPaciente = await pacienteRepository.delete(id);
    if (!deletedPaciente) return null;

    // 🗑️ Deletar todas as consultas do paciente removido
    await consultaRepository.deleteMany({ idPaciente: id });

    return deletedPaciente;
  }
}

module.exports = new PacienteService();
