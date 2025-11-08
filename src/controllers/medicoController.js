const medicoService = require("../services/medicoService");
const { formatMedico, formatMedicos } = require("../utils/medicoMapper");
const validateMedico = require("../utils/validateMedicoData");

class MedicoController {
  async create(req, res) {
    try {
      const missing = validateMedico(req.body);
      if (missing.length > 0)
        return res
          .status(400)
          .json({ error: `Campos obrigatórios: ${missing.join(", ")}` });

      const medico = await medicoService.createMedico(req.body);
      return res.status(201).json(formatMedico(medico));
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async listAndSearch(req, res) {
    try {
      const result = await medicoService.findMedicos(req.query);
      if (result.data.length === 0)
        return res.status(200).json({ message: "Nenhum médico encontrado." });

      return res.json({
        data: formatMedicos(result.data),
        page: result.page,
        limit: result.limit,
        totalItems: result.totalItems,
        totalPages: result.totalPages,
      });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao listar médicos." });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const dadosAtualizados = req.body;

      const updatedMedico = await medicoService.update(id, dadosAtualizados);

      if (!updatedMedico)
        return res.status(404).json({ error: "Médico não encontrado." });

      return res.status(200).json(formatMedico(updatedMedico));
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deletedMedico = await medicoService.deleteMedico(req.params.id);
      if (!deletedMedico)
        return res.status(404).json({ error: "Médico não encontrado" });

      return res.json({
        ...formatMedico(deletedMedico),
        message: "Médico deletado com sucesso.",
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new MedicoController();
