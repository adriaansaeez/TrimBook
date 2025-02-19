import prisma from "../config/prisma.js";

//CRUD
// ✅ Crear un horario
export const createHorario = async (req, res) => {
  try {
    const { estilistaId, diaSemana, horaInicio, horaFin } = req.body;

    if (!estilistaId || !diaSemana || !horaInicio || !horaFin) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const horario = await prisma.horario.create({
      data: {
        estilistaId,
        diaSemana,
        horaInicio,
        horaFin,
      },
    });

    res.status(201).json(horario);
  } catch (error) {
    console.error("❌ Error al crear horario:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// ✅ Obtener todos los horarios
export const getHorarios = async (req, res) => {
  try {
    const horarios = await prisma.horario.findMany({
      include: { estilista: true }, // Trae los datos del estilista relacionado
    });
    res.json(horarios);
  } catch (error) {
    console.error("❌ Error al obtener horarios:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// ✅ Obtener un horario por ID
export const getHorarioById = async (req, res) => {
  try {
    const { id } = req.params;

    const horario = await prisma.horario.findUnique({
      where: { id: parseInt(id) },
      include: { estilista: true },
    });

    if (!horario) {
      return res.status(404).json({ error: "Horario no encontrado" });
    }

    res.json(horario);
  } catch (error) {
    console.error("❌ Error al obtener horario:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};


// ✅ Actualizar un horario
export const updateHorario = async (req, res) => {
  try {
    const { id } = req.params;
    const { diaSemana, horaInicio, horaFin } = req.body;

    const horario = await prisma.horario.update({
      where: { id: parseInt(id) },
      data: { diaSemana, horaInicio, horaFin },
    });

    res.json(horario);
  } catch (error) {
    console.error("❌ Error al actualizar horario:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// ✅ Eliminar un horario
export const deleteHorario = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.horario.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Horario eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar horario:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};


//FILTROS
// ✅ Obtener los horarios de un estilista por día de la semana
export const getHorariosByEstilistaAndDay = async (req, res) => {
    try {
      const { estilistaId, diaSemana } = req.params;
  
      const horarios = await prisma.horario.findMany({
        where: {
          estilistaId: parseInt(estilistaId),
          diaSemana: diaSemana, // Filtrar por día de la semana
        },
      });
  
      if (horarios.length === 0) {
        return res.status(404).json({ error: "No hay horarios para este estilista en ese día" });
      }
  
      res.json(horarios);
    } catch (error) {
      console.error("❌ Error al obtener los horarios:", error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  };
  // ✅ Obtener un horario por ID
export const getHorariosByEstilistaId = async (req, res) => {
    try {
      const { estilistaId  } = req.params;
  
      const horarios = await prisma.horario.findUnique({
        where: { estilistaId : parseInt(estilistaId ) },
      });
  
      if (horarios.length === 0) {
        return res.status(404).json({ error: "No hay horarios para este estilista" });
      }
  
      res.json(horarios);
    } catch (error) {
        console.error("❌ Error al obtener los horarios del estilista:", error);
        res.status(500).json({ error: "Error en el servidor" });
      }
  };
