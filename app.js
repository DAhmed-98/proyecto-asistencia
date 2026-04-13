const express  = require('express');
const cors     = require('cors');
const path     = require('path');
const app      = express();

// ── MIDDLEWARE ─────────────────────────────────────────
app.use(cors());                          // Permite peticiones cruzadas
app.use(express.json());                  // Parsea JSON del body
app.use(express.urlencoded({ extended: true }));

// Middleware de logging (registra cada petición)
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ── RUTAS API (lógica oculta al cliente) ───────────────
app.use('/api/clientes',   require('./routes/clienteRoutes'));
app.use('/api/asistencia', require('./routes/asistenciaRoutes'));

// ── VISTA (lo único que el cliente puede ver) ──────────
app.use(express.static(path.join(__dirname, 'views')));

// Inicia el servidor
app.listen(3000, () => console.log('Servidor en http://localhost:3000'));