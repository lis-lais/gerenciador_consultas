const medicoRepository = require("../repositories/medicoRepository");
const consultaRepository = require("../repositories/consultaRepository");

class MedicoService {
  async createMedico(data) {
    return medicoRepository.create(data);
  }

  async findMedicos(filters) {
    return medicoRepository.findWithPaginationAndFilters(filters);
  }

  async updateMedico(id, dataAtualizados) {
    const updatedMedico = await medicoRepository.update(id, dataAtualizados);
    if (!updatedMedico) return null;

    // Atualizar automaticamente o nome/especialidade nas consultas associadas
    await consultaRepository.updateMany(
      { idMedico: id },
      {
        $set: {
          "idMedico.nome": data.nome,
          "idMedico.especialidade": data.especialidade,
        },
      }
    );

    return updatedMedico;
  }

  async deleteMedico(id) {
    const deletedMedico = await medicoRepository.delete(id);
    if (!deletedMedico) return null;

    // 🗑️ Deletar todas as consultas do médico removido
    await consultaRepository.deleteMany({ idMedico: id });

    return deletedMedico;
  }
}

module.exports = new MedicoService();
