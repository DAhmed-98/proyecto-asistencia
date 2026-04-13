const ClienteModel = require('../models/clienteModel');

const clienteController = {
  buscar: (req, res) => {
    const { nombre } = req.query;
    if (!nombre) return res.status(400).json({ error: 'Nombre requerido' });
    const clientes = ClienteModel.buscarPorNombre(nombre);
    res.json(clientes);
  },

  listar: (req, res) => {
    const clientes = ClienteModel.obtenerTodos();
    res.json(clientes);
  },
};

module.exports = clienteController;