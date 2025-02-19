import express from "express";
import { loginUsuario } from "../controllers/auth.controller.js";
import { registerUsuario } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUsuario);
router.post("/login", loginUsuario);


export default router;

