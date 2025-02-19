import express from 'express';
import dotenv from 'dotenv';
import usuarioRoutes from './src/routes/usuario.routes.js';
import authRoutes from './src/routes/auth.routes.js';


dotenv.config(); // Cargar variables de entorno

const app = express();
app.use(express.json()); // Para recibir JSON en las solicitudes

// Rutas
app.use('/api/usuarios', usuarioRoutes);
app.use("/api/auth", authRoutes); // Rutas de autenticación


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
