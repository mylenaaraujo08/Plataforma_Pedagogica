import { Request, Response } from "express";
import TurmaModel from "../models/turmaModel";

class TurmaController {
  static async getTurmaByCPF(req: Request, res: Response): Promise<void> {
    const turmaCPF = req.params.cpf;

    try {
      const turma = await TurmaModel.findByCPF(turmaCPF);

      if (turma) {
        res.status(200).json(turma);
      } else {
        res.status(404).json({ message: "Turma not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getAllTurmas(req: Request, res: Response): Promise<void> {
    try {
      const turmas = await TurmaModel.findAll();
      res.status(200).json(turmas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async createTurma(req: Request, res: Response): Promise<void> {
    const turmaData = req.body;

    try {
      const novaTurma = new TurmaModel(turmaData);
      const turmaSalva = await TurmaModel.save(novaTurma);
      res.status(201).json(turmaSalva);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updateTurma(req: Request, res: Response): Promise<void> {
    const turmaCPF = req.params.cpf;
    const dadosAtualizadosTurma = req.body;

    try {
      const turmaExistente = await TurmaModel.findByCPF(turmaCPF);

      if (turmaExistente) {
        const turmaAtualizada = new TurmaModel({
          ...turmaExistente,
          ...dadosAtualizadosTurma,
        });

        await TurmaModel.update(turmaAtualizada);

        res.status(200).json(turmaAtualizada);
      } else {
        res.status(404).json({ message: "Turma not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteTurma(req: Request, res: Response): Promise<void> {
    const turmaCPF = req.params.cpf;

    try {
      await TurmaModel.deleteByCPF(turmaCPF);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default TurmaController;