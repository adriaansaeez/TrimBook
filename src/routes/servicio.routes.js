import express from "express";
import {
  createServicio,
  getAllServicios,
  getServicioById,
  updateServicio,
  deleteServicio,
  getServiciosByEstilista,
} from "../controllers/servicio.controller.js";

const router = express.Router();

router.post("/", createServicio);
router.get("/", getAllServicios);
router.get("/:id", getServicioById);
router.put("/:id", updateServicio);
router.delete("/:id", deleteServicio);
router.get("/estilista/:estilistaId", getServiciosByEstilista);

export default router;
