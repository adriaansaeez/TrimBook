import express from "express";
import { getPerfilByUsuarioId, updatePerfil} from "../controllers/perfil.controller.js";

const router = express.Router();

router.get("/:usuarioId", getPerfilByUsuarioId);
router.put("/:usuarioId", updatePerfil);

export default router;
