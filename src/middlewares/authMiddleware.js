import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verificarToken = (req, res, next) => {
  const token = req.header("Authorization"); // Obtener el token del header

  if (!token) {
    return res.status(401).json({ error: "Acceso denegado. No hay token." });
  }

  try {
    const tokenSinBearer = token.replace("Bearer ", ""); // Eliminar "Bearer " si está presente
    const verificado = jwt.verify(tokenSinBearer, process.env.JWT_SECRET);
    req.usuario = verificado; // Guardar datos del usuario en `req`
    next(); // Continuar con la siguiente función
  } catch (error) {
    res.status(403).json({ error: "Token inválido." });
  }
};
