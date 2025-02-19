import express from "express";
import {
  createHorario,
  getHorarios,
  getHorarioById,
  updateHorario,
  deleteHorario,
  getHorariosByEstilistaId
} from "../controllers/horario.controller.js";

const router = express.Router();

router.post("/", createHorario); // Crear horario
router.get("/", getHorarios); // Obtener todos los horarios
router.get("/:id", getHorarioById); // Obtener un horario por ID
router.put("/:id", updateHorario); // Actualizar horario
router.delete("/:id", deleteHorario); // Eliminar horario
router.get("/estilista/:estilistaId", getHorariosByEstilistaId); // Obtener horarios por estilista


export default router;
