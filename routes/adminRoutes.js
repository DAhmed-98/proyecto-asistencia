const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/adminController');

router.post('/login',      ctrl.login);      // POST /api/admin/login
router.get('/asistencia',  ctrl.listar);     // GET  /api/admin/asistencia
router.get('/tipos',       ctrl.tipos);      // GET  /api/admin/tipos
router.post('/clasificar', ctrl.clasificar); // POST /api/admin/clasificar

module.exports = router;