const express = require("express");
const consultaController = require("../controllers/consultaController");

const router = express.Router();

router.get("/", consultaController.listAndSearch.bind(consultaController));
router.post("/consulta", consultaController.create.bind(consultaController));
router.put("/consulta/:id", consultaController.update.bind(consultaController));
router.delete(
  "/consulta/:id",
  consultaController.delete.bind(consultaController)
);

module.exports = router;
