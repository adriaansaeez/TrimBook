import express from 'express';
import dotenv from 'dotenv';
import usuarioRoutes from './src/routes/usuario.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import perfilRoutes from "./src/routes/perfil.routes.js";
import estilistaRoutes from "./src/routes/estilista.routes.js";
import horarioRoutes from "./src/routes/horario.routes.js";
import servicioRoutes from "./src/routes/servicio.routes.js";


dotenv.config(); // Cargar variables de entorno

const app = express();
app.use(express.json()); // Para recibir JSON en las solicitudes

// Rutas
app.use("/api/auth", authRoutes); // Rutas de autenticación
app.use('/api/usuarios', usuarioRoutes);// Agregar rutas del usuario
app.use("/api/perfil", perfilRoutes); // Agregar rutas del perfil
app.use("/api/estilistas", estilistaRoutes);// Agregar rutas del estilista
app.use("/api/horarios", horarioRoutes); // Agregar rutas del horario
app.use("/api/servicios", servicioRoutes); // Agregar rutas de los servicios




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
