import prisma from "../config/prisma.js";

// ✅ Crear un nuevo servicio
export const createServicio = async (req, res) => {
  try {
    const { nombre, descripcion, precio, duracion, estilistaId } = req.body;

    const nuevoServicio = await prisma.servicio.create({
      data: { nombre, descripcion, precio, duracion, estilistaId },
    });

    res.status(201).json(nuevoServicio);
  } catch (error) {
    console.error("❌ Error al crear servicio:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// ✅ Obtener todos los servicios

export const getAllServicios = async (req, res) => {
  try {
    const servicios = await prisma.servicio.findMany();
    res.json(servicios);
  } catch (error) {
    console.error("❌ Error al obtener servicios:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// ✅ Obtener un servicio por ID
export const getServicioById = async (req, res) => {
  try {
    const { id } = req.params;

    const servicio = await prisma.servicio.findUnique({
      where: { id: parseInt(id) },
    });

    if (!servicio) {
      return res.status(404).json({ error: "Servicio no encontrado" });
    }

    res.json(servicio);
  } catch (error) {
    console.error("❌ Error al obtener servicio:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// ✅ Actualizar servicio
export const updateServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, duracion, estilistaId } = req.body;

    const servicioActualizado = await prisma.servicio.update({
      where: { id: parseInt(id) },
      data: { nombre, descripcion, precio, duracion, estilistaId },
    });

    res.json(servicioActualizado);
  } catch (error) {
    console.error("❌ Error al actualizar servicio:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// ✅ Eliminar servicio
export const deleteServicio = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.servicio.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Servicio eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar servicio:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// ✅ Obtener los servicios de un estilista específico
export const getServiciosByEstilista = async (req, res) => {
  try {
    const { estilistaId } = req.params;

    const servicios = await prisma.servicio.findMany({
      where: { estilistaId: parseInt(estilistaId) },
    });

    if (servicios.length === 0) {
      return res
        .status(404)
        .json({ error: "No hay servicios para este estilista" });
    }

    res.json(servicios);
  } catch (error) {
    console.error("❌ Error al obtener servicios por estilista:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
