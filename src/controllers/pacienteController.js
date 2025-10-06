const pacienteService = require('../services/pacienteService');
const { formatPaciente, formatPacientes } = require('../utils/pacienteMapper');
const validatePaciente = require('../utils/validatePacienteData');

class PacienteController {
  async create(req, res) {
    try {
      const missing = validatePaciente(req.body);
      if (missing.length) return res.status(400).json({ error: 'Campos obrigatórios: ' + missing.join(', ') });
      const paciente = await pacienteService.createPaciente(req.body);
      res.status(201).json(formatPaciente(paciente));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async list(req, res) {
    try {
      const result = await pacienteService.findPacientes(req.query);
      res.json({
        data: formatPacientes(result.data),
        page: result.page,
        limit: result.limit,
        totalItems: result.totalItems,
        totalPages: result.totalPages
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async findById(req, res) {
    try {
      const paciente = await pacienteService.findPacienteById(req.params.id);
      if (!paciente) return res.status(404).json({ error: 'Paciente não encontrado' });
      res.json(formatPaciente(paciente));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const updated = await pacienteService.updatePaciente(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: 'Paciente não encontrado' });
      res.json(formatPaciente(updated));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await pacienteService.deletePaciente(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Paciente não encontrado' });
      res.json(formatPaciente(deleted));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new PacienteController();