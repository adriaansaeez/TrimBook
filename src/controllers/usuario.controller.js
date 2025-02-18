import prisma from '../config/prisma.js';

// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

// Crear un nuevo usuario
export const createUsuario = async (req, res) => {
    try {
      const { username, email, password, rol } = req.body;
  
      // Verificar si ya existe un usuario con el mismo email
      const usuarioPorEmail = await prisma.usuario.findUnique({
        where: { email }
      });
  
      if (usuarioPorEmail) {
        return res.status(400).json({ error: "El email ya está en uso." });
      }
  
      // Verificar si ya existe un usuario con el mismo username
      const usuarioPorUsername = await prisma.usuario.findUnique({
        where: { username }
      });
  
      if (usuarioPorUsername) {
        return res.status(400).json({ error: "El username ya está en uso." });
      }
  
      // Si no existe, creamos el usuario
      const nuevoUsuario = await prisma.usuario.create({
        data: { username, email, password, rol }
      });
  
      res.status(201).json(nuevoUsuario);
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  };
  

// Obtener usuario por ID
export const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await prisma.usuario.findUnique({
      where: { id: parseInt(id) }
    });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

// Actualizar usuario
export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, rol } = req.body;
    const usuarioActualizado = await prisma.usuario.update({
      where: { id: parseInt(id) },
      data: { username, email, password, rol }
    });
    res.json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};

// Eliminar usuario
export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.usuario.delete({
      where: { id: parseInt(id) }
    });
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};
