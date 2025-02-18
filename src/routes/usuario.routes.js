import express from 'express';
import { getUsuarios, createUsuario, getUsuarioById, updateUsuario, deleteUsuario } from '../controllers/usuario.controller.js';
import { validarZod } from '../middlewares/validarZod.js';
import { usuarioSchema } from '../validations/usuario.schema.js';

const router = express.Router();

router.get('/', getUsuarios);
router.post('/', validarZod(usuarioSchema), createUsuario); //Aplicamos validación con Zod
router.get('/:id', getUsuarioById);
router.put('/:id', validarZod(usuarioSchema), updateUsuario); //Aplicamos validación con Zo
router.delete('/:id', deleteUsuario);

export default router;
