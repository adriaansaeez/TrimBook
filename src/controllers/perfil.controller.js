import prisma from "../config/prisma.js";

// Crear perfil al registrar usuario
export const crearPerfil = async (usuarioId, nombre="", apellidos = "", telefono = "", direccion = "", fotoPerfil = "", instagram_url = "") => {
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
