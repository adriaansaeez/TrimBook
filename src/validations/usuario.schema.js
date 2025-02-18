import { z } from 'zod';

export const usuarioSchema = z.object({
  username: z.string()
    .min(3, { message: "El nombre de usuario debe tener al menos 3 caracteres" })
    .max(20, { message: "El nombre de usuario no puede tener más de 20 caracteres" }),

  email: z.string()
    .email({ message: "Debe ser un email válido" }),

  password: z.string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),

  rol: z.enum(["ADMIN", "CLIENTE", "ESTILISTA"], {
    errorMap: () => ({ message: "El rol debe ser ADMIN, CLIENTE o ESTILISTA" })
  })
});
