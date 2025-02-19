import prisma from '../config/prisma.js';
import bcrypt from "bcryptjs";


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
  
      // 🔐 Encriptar la contraseña antes de guardarla
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Crear el usuario con la contraseña encriptada
      const nuevoUsuario = await prisma.usuario.create({
        data: { 
          username, 
          email, 
          password: hashedPassword, 
          rol 
        }
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
  
      let errores = {};
  
      // Verificar si el usuario existe antes de actualizar
      const usuarioExistente = await prisma.usuario.findUnique({
        where: { id: parseInt(id) }
      });
  
      if (!usuarioExistente) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
  
      // Verificar si el email ya está en uso por otro usuario
      if (email) {
        const usuarioPorEmail = await prisma.usuario.findUnique({
          where: { email }
        });
  
        if (usuarioPorEmail && usuarioPorEmail.id !== parseInt(id)) {
          errores.email = "El email ya está en uso.";
        }
      }
  
      // Verificar si el username ya está en uso por otro usuario
      if (username) {
        const usuarioPorUsername = await prisma.usuario.findUnique({
          where: { username }
        });
  
        if (usuarioPorUsername && usuarioPorUsername.id !== parseInt(id)) {
          errores.username = "El username ya está en uso.";
        }
      }
  
      // Si hay errores, devolverlos todos
      if (Object.keys(errores).length > 0) {
        return res.status(400).json({ errores });
      }
  
      // Si se proporciona una nueva contraseña, encriptarla antes de guardar
      let hashedPassword;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }
  
      // Actualizar usuario con los datos proporcionados
      const usuarioActualizado = await prisma.usuario.update({
        where: { id: parseInt(id) },
        data: {
          username: username || usuarioExistente.username,
          email: email || usuarioExistente.email,
          password: hashedPassword || usuarioExistente.password,
          rol: rol || usuarioExistente.rol
        }
      });
  
      res.json(usuarioActualizado);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar usuario" });
    }
  };

// Eliminar usuario
export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.usuario.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Usuario y perfil eliminados correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
};