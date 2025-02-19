import express from "express";
import {
  createEstilista,
  getEstilistas,
  getEstilistaById,
  updateEstilista,
  deleteEstilista,
} from "../controllers/estilista.controller.js";

const router = express.Router();

router.post("/", createEstilista); // Crear estilista
router.get("/", getEstilistas); // Obtener todos los estilistas
router.get("/:id", getEstilistaById); // Obtener un estilista por ID
router.put("/:id", updateEstilista); // Actualizar estilista
router.delete("/:id", deleteEstilista); // Eliminar estilista

export default router;
