const express = require("express");
const cors = require("cors");
const medicoRoutes = require("./routes/medicoRoutes");
const pacienteRoutes = require("./routes/pacienteRoutes");
const consultaRoutes = require("./routes/consultaRoutes");
const relatorioRoutes = require("./routes/relatorioRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", medicoRoutes);
app.use("/api", pacienteRoutes);
app.use("/api", consultaRoutes);
app.use("/api", relatorioRoutes);

app.get("/", (req, res) => res.send("API de Consultas Médicas funcionando!"));

module.exports = app;
