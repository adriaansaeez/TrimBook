import express from "express";
import { obtenerPerfil, actualizarPerfil, eliminarPerfil } from "../controllers/perfil.controller.js";

const router = express.Router();

router.get("/:usuarioId", obtenerPerfil);
router.put("/:usuarioId", actualizarPerfil);
router.delete("/:usuarioId", eliminarPerfil);

export default router;
