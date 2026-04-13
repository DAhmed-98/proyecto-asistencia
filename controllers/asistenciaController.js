const AsistenciaModel = require('../models/asistenciaModel');

const asistenciaController = {
  buscar: (req, res) => {
    const { nombre } = req.query;
    if (!nombre) return res.status(400).json({ error: 'Nombre requerido' });
    const registros = AsistenciaModel.obtenerConCliente(nombre);
    res.json(registros);
  },

  registrar: (req, res) => {
    const { clienteId, fecha, retardo } = req.body;
    AsistenciaModel.registrar(clienteId, fecha, retardo);
    res.json({ ok: true });
  },
};

module.exports = asistenciaController;