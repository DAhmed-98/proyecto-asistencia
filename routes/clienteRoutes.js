const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/clienteController');

router.get('/buscar', ctrl.buscar);   // GET /api/clientes/buscar?nombre=Ana
router.get('/',       ctrl.listar);   // GET /api/clientes

module.exports = router;