const consultaService = require('../services/consultaService');
const { formatConsulta, formatConsultas } = require('../utils/consultaMapper');
const validateConsulta = require('../utils/validateConsultaData');

class ConsultaController {
  async create(req, res) {
    try {
      const missing = validateConsulta(req.body);
      if (missing.length) return res.status(400).json({ error: 'Campos obrigatórios: ' + missing.join(', ') });
      const consulta = await consultaService.createConsulta(req.body);
      res.status(201).json(formatConsulta(consulta));
    } catch (err) {
      // service lança erro se medico/paciente não existir
      res.status(400).json({ error: err.message });
    }
  }

  async list(req, res) {
    try {
      const result = await consultaService.findConsultas(req.query);
      res.json({
        data: formatConsultas(result.data),
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
      const consulta = await consultaService.findConsultaById(req.params.id);
      if (!consulta) return res.status(404).json({ error: 'Consulta não encontrada' });
      res.json(formatConsulta(consulta));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const updated = await consultaService.updateConsulta(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: 'Consulta não encontrada' });
      res.json(formatConsulta(updated));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await consultaService.deleteConsulta(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Consulta não encontrada' });
      res.json(formatConsulta(deleted));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new ConsultaController();