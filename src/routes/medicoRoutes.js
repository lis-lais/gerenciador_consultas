const express = require('express');
const router = express.Router();
const medicoController = require('../controllers/medicoController');

router.post('/medico', medicoController.create.bind(medicoController));
router.get('/medicos', medicoController.list.bind(medicoController));
router.get('/medico/:id', medicoController.list.bind(medicoController)); // optional single fetch via query or controller method could be added
router.put('/medico/:id', medicoController.update.bind(medicoController));
router.delete('/medico/:id', medicoController.delete.bind(medicoController));

module.exports = router;