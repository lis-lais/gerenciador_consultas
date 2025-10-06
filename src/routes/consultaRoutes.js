const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController');

router.post('/consulta', consultaController.create.bind(consultaController));
router.get('/consultas', consultaController.list.bind(consultaController));
router.put('/consulta/:id', consultaController.update.bind(consultaController));
router.delete('/consulta/:id', consultaController.delete.bind(consultaController));

module.exports = router;