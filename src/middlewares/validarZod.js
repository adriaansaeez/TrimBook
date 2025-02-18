export const validarZod = (schema) => (req, res, next) => {
    try {
      schema.parse(req.body);
      next(); // Si los datos son válidos, sigue con el siguiente middleware/controlador
    } catch (error) {
      return res.status(400).json({ errores: error.errors });
    }
  };
  