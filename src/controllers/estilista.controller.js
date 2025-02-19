import prisma from "../config/prisma.js";

// ✅ Crear un estilista
export const createEstilista = async (req, res) => {
  try {
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: "El nombre es obligatorio" });
    }

    const estilista = await prisma.estilista.create({
      data: { nombre },
    });

    res.status(201).json(estilista);
  } catch (error) {
    console.error("❌ Error al crear estilista:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// ✅ Obtener todos los estilistas
export const getEstilistas = async (req, res) => {
  try {
    const estilistas = await prisma.estilista.findMany();
    res.json(estilistas);
  } catch (error) {
    console.error("❌ Error al obtener estilistas:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// ✅ Obtener un estilista por ID
export const getEstilistaById = async (req, res) => {
  try {
    const { id } = req.params;

    const estilista = await prisma.estilista.findUnique({
      where: { id: parseInt(id) },
    });

    if (!estilista) {
      return res.status(404).json({ error: "Estilista no encontrado" });
    }

    res.json(estilista);
  } catch (error) {
    console.error("❌ Error al obtener estilista:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// ✅ Actualizar un estilista
export const updateEstilista = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    const estilista = await prisma.estilista.update({
      where: { id: parseInt(id) },
      data: { nombre },
    });

    res.json(estilista);
  } catch (error) {
    console.error("❌ Error al actualizar estilista:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// ✅ Eliminar un estilista
export const deleteEstilista = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.estilista.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Estilista eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar estilista:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
