const express = require('express');
const cors    = require('cors');
const path    = require('path');
const app     = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Rutas originales (sin cambios)
app.use('/api/clientes',   require('./routes/clienteRoutes'));
app.use('/api/asistencia', require('./routes/asistenciaRoutes'));

// Ruta nueva de administración
app.use('/api/admin', require('./routes/adminRoutes'));

app.use(express.static(path.join(__dirname, 'views')));

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));