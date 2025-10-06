// src/routes/relatorioRoutes.js
const express = require('express');
const router = express.Router();
const consultaService = require('../services/consultaService');
const pacienteService = require('../services/pacienteService');
const medicoService = require('../services/medicoService');

// Listar todas as consultas realizadas por um médico específico
router.get('/relatorios/consultas/medico/:idMedico', async (req, res) => {
  try {
    const { data } = await consultaService.findConsultas({ idMedico: req.params.idMedico });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Listar todos os pacientes atendidos por um médico específico
router.get('/relatorios/pacientes/medico/:idMedico', async (req, res) => {
  try {
    const { data } = await consultaService.findConsultas({ idMedico: req.params.idMedico });
    const pacienteIds = [...new Set(data.map(c => c.idPaciente.toString()))];
    const pacientes = await Promise.all(pacienteIds.map(id => pacienteService.findPacienteById(id)));
    res.json(pacientes.filter(Boolean));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Listar todos os médicos que atenderam um paciente específico
router.get('/relatorios/medicos/paciente/:idPaciente', async (req, res) => {
  try {
    const { data } = await consultaService.findConsultas({ idPaciente: req.params.idPaciente });
    const medicoIds = [...new Set(data.map(c => c.idMedico.toString()))];
    const medicos = await Promise.all(medicoIds.map(id => medicoService.findMedicoById(id)));
    res.json(medicos.filter(Boolean));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Listar todas as consultas realizadas em um mês específico (1-12)
router.get('/relatorios/consultas/mes/:mes', async (req, res) => {
  try {
    const mes = parseInt(req.params.mes, 10);
    const all = await consultaService.findConsultas({});
    const filtered = all.data.filter(c => {
      const d = new Date(c.data);
      return d.getMonth() + 1 === mes;
    });
    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
