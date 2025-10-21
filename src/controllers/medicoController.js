const medicoService = require("../services/medicoService");
const { formatMedico, formatMedicos } = require("../utils/medicoMapper");
const validateMedico = require("../utils/validateMedicoData");

class MedicoController {
  async create(req, res) {
    try {
      const missing = validateMedico(req.body);
      if (missing.length > 0) {
        return res
          .status(400)
          .json({ error: `Campos obrigatórios: ${missing.join(", ")}` });
      }
      const medico = await medicoService.createMedico(req.body);
      console.log("MEDICO CRIADO ===>", medico);
      res.status(201).json(formatMedico(medico));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async list(req, res) {
    try {
      const result = await medicoService.findMedicos(req.query);
      res.json({
        data: formatMedicos(result.data),
        page: result.page,
        limit: result.limit,
        totalItems: result.totalItems,
        totalPages: result.totalPages,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async findById(req, res) {
    try {
      const medico = await medicoService.findMedicoById(req.params.id);
      if (!medico)
        return res.status(404).json({ error: "Médico não encontrado" });
      res.json(formatMedico(medico));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const updated = await medicoService.updateMedico(req.params.id, req.body);
      if (!updated)
        return res.status(404).json({ error: "Médico não encontrado" });
      res.json(formatMedico(updated));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await medicoService.deleteMedico(req.params.id);
      if (!deleted)
        return res.status(404).json({ error: "Médico não encontrado" });
      res.json(formatMedico(deleted));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new MedicoController();
