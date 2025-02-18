import express from 'express';
import { config } from 'dotenv';
import usuarioRoutes from './routes/usuario.routes.js';
import dotenv from 'dotenv';



dotenv.config(); // Cargar variables de entorno

const app = express();
app.use(express.json()); // Para recibir JSON en las solicitudes

// Rutas
app.use('/api/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
