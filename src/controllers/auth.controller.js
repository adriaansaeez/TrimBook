import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import prisma from "../config/prisma.js";

dotenv.config();

export const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Buscar usuario por email
    const usuario = await prisma.usuario.findUnique({
      where: { email }
    });

    if (!usuario) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // 2️⃣ Comparar contraseñas
    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // 3️⃣ Generar token JWT
    const token = jwt.sign(
      { id: usuario.id, username: usuario.username, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "2h" } // Expira en 2 horas
    );

    res.json({ token, usuario: { id: usuario.id, username: usuario.username, email: usuario.email, rol: usuario.rol } });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};

