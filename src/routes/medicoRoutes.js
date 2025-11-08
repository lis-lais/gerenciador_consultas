const express = require("express");
const router = express.Router();
const medicoController = require("../controllers/medicoController");

router.post("/medico", medicoController.create.bind(medicoController));
router.get("/medicos", medicoController.listAndSearch.bind(medicoController));
router.put("/medico/:id", medicoController.update.bind(medicoController));
router.delete("/medico/:id", medicoController.delete.bind(medicoController));

module.exports = router;
