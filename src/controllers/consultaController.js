const consultaService = require("../services/consultaService");
const { formatConsulta, formatConsultas } = require("../utils/consultaMapper");
const validateConsulta = require("../utils/validateConsultaData");

class ConsultaController {
  toDTO(consulta) {
    return {
      id: consulta._id.toString(),
      data: consulta.data,
      descricao: consulta.descricao,

      medico: consulta.idMedico
        ? {
            id:
              consulta.idMedico._id?.toString() || consulta.idMedico.toString(),
            nome: consulta.idMedico.nome || null,
            especialidade: consulta.idMedico.especialidade || null,
          }
        : null,

      paciente: consulta.idPaciente
        ? {
            id:
              consulta.idPaciente._id?.toString() ||
              consulta.idPaciente.toString(),
            nome: consulta.idPaciente.nome || null,
            dataNascimento: consulta.idPaciente.dataNascimento || null,
          }
        : null,
    };
  }

  async create(req, res) {
    try {
      const missing = validateConsulta(req.body);
      if (missing.length > 0) {
        return res
          .status(400)
          .json({ error: "Campos obrigatórios: " + missing.join(", ") });
      }

      const consultaCriada = await consultaService.createConsulta(req.body);
      return res.status(201).json(this.toDTO(consultaCriada));
    } catch (error) {
      // service lança erro se medico/paciente não existir
      return res.status(500).json({ error: error.message });
    }
  }

  async listAndSearch(req, res) {
    try {
      const { data, page, limit, totalPages, totalItems } =
        await consultaService.findConsultas(req.query);

      if (data.length === 0) {
        return res.status(200).json({
          message: "Nenhuma consulta encontrada com os critérios fornecidos.",
        });
      }

      return res.status(200).json({
        data: formatConsultas(data),
        page,
        limit,
        totalItems,
        totalPages,
      });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao listar consulta." });
    }
  }

  async update(req, res) {
    try {
      const updatedConsulta = await consultaService.updateConsulta(
        req.params.id,
        req.body
      );
      if (!updatedConsulta) {
        return res.status(404).json({ error: "Consulta não encontrada" });
      }
      return res.json(200).json(formatConsulta(updatedConsulta));
    } catch (error) {
      console.log("Erro ao atualizar a consulta.");
      return res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const deletedConsulta = await consultaService.deleteConsulta(id);
      if (!deletedConsulta) {
        return res.status(404).json({ error: "Consulta não encontrada" });
      }
      res.json({
        ...formatConsulta(deletedConsulta),
        message: "Consulta deletada com sucesso.",
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ConsultaController();
