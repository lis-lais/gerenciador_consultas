const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

router.post('/paciente', pacienteController.create.bind(pacienteController));
router.get('/pacientes', pacienteController.list.bind(pacienteController));
router.put('/paciente/:id', pacienteController.update.bind(pacienteController));
router.delete('/paciente/:id', pacienteController.delete.bind(pacienteController));

module.exports = router;
