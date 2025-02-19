import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import prisma from "../config/prisma.js";
import { crearPerfil } from "./perfil.controller.js";

dotenv.config();

// Registro de usuario con validaciones separadas
export const registerUsuario = async (req, res) => {
  try {
    const { username, email, password, rol } = req.body;
    let errores = {};

    // Verificar si ya existe un usuario con el mismo email
    const usuarioPorEmail = await prisma.usuario.findUnique({
      where: { email }
    });

    if (usuarioPorEmail) {
      errores.email = "El email ya está en uso.";
    }

    // Verificar si ya existe un usuario con el mismo username
    const usuarioPorUsername = await prisma.usuario.findUnique({
      where: { username }
    });

    if (usuarioPorUsername) {
      errores.username = "El username ya está en uso.";
    }

    // Si hay errores, devolverlos todos
    if (Object.keys(errores).length > 0) {
      return res.status(400).json({ errores });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const usuario = await prisma.usuario.create({
      data: { username, email, password: hashedPassword, rol },
    });

    // Crear perfil automáticamente
    await crearPerfil(usuario.id, usuario.username, "", "", "", "", "");

    res.status(201).json({ message: "Usuario registrado correctamente", usuario });
  } catch (error) {
    console.error("❌ Error en el registro:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// Inicio de sesión con JWT
export const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email
    const usuario = await prisma.usuario.findUnique({
      where: { email }
    });

    if (!usuario) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Comparar contraseñas
    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: usuario.id, username: usuario.username, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      token,
      usuario: { id: usuario.id, username: usuario.username, email: usuario.email, rol: usuario.rol },
    });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};
