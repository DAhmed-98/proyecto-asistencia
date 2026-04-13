const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/asistenciaController');

router.get('/buscar',  ctrl.buscar);    // GET /api/asistencia/buscar?nombre=Ana
router.post('/nueva',  ctrl.registrar); // POST /api/asistencia/nueva

module.exports = router;