import prisma from "../config/prisma.js";


// Crear perfil al registrar usuario
export const createPerfil = async (usuarioId, nombre="", apellidos = "", telefono = "", direccion = "", fotoPerfil = "", instagram_url = "") => {
  try {
    await prisma.perfil.create({
      data: {
        usuarioId,
        nombre,
        apellidos,
        telefono,
        direccion,
        fotoPerfil,
        instagram_url
      },
    });
  } catch (error) {
    console.error("❌ Error al crear perfil:", error);
  }
};
// 📌 Obtener perfil por usuarioId
export const getPerfilByUsuarioId = async (req, res) => {
    try {
      const { usuarioId } = req.params;
      const perfil = await prisma.perfil.findUnique({
        where: { usuarioId: parseInt(usuarioId) },
      });
  
      if (!perfil) {
        return res.status(404).json({ error: "Perfil no encontrado" });
      }
  
      res.json(perfil);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener perfil" });
    }
  };
  
  // 📌 Actualizar perfil
  export const updatePerfil = async (req, res) => {
    try {
      const { usuarioId } = req.params;
      const { nombre, apellidos, telefono, direccion, fotoPerfil, instagram_url } = req.body;
  
      const perfil = await prisma.perfil.update({
        where: { usuarioId: parseInt(usuarioId) },
        data: { nombre, apellidos, telefono, direccion, fotoPerfil, instagram_url },
      });
  
      res.json(perfil);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar perfil" });
    }
  };
