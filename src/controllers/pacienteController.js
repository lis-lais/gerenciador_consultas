const pacienteService = require("../services/pacienteService");
const { formatPaciente, formatPacientes } = require("../utils/pacienteMapper");
const validatePaciente = require("../utils/validatePacienteData");

class PacienteController {
  async create(req, res) {
    try {
      const missing = validatePaciente(req.body);
      if (missing.length > 0) {
        return res
          .status(400)
          .json({ error: `Campos obrigatórios: ${missing.join(", ")}` });
      }

      const pacienteCriado = await pacienteService.createPaciente(req.body);
      return res.status(201).json(formatPaciente(pacienteCriado));
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async listAndSearch(req, res) {
    try {
      const result = await pacienteService.findPacientes(req.query);
      if (result.data.length === 0) {
        return res.status(200).json({ message: "Nenhum paciente encontrado." });
      }

      return res.status(200).json({
        data: formatPacientes(result.data),
        page: result.page,
        limit: result.limit,
        totalItems: result.totalItems,
        totalPages: result.totalPages,
      });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao listar os pacientes." });
    }
  }

  async update(req, res) {
    try {
      const updatedPaciente = await pacienteService.updatePaciente(
        req.params.id,
        req.body
      );
      if (!updatedPaciente) {
        return res.status(404).json({ error: "Paciente não encontrado" });
      }
      return res.status(200).json(formatPaciente(updatedPaciente));
    } catch (error) {
      console.log("Erro ao atualizar paciente:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deletedPaciente = await pacienteService.deletePaciente(
        req.params.id
      );
      if (!deletedPaciente) {
        return res.status(404).json({ error: "Paciente não encontrado" });
      }
      res.json({
        ...formatPaciente(deletedPaciente),
        message:
          "Paciente deletado com sucesso, consultas relacionadas removidas.",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new PacienteController();
