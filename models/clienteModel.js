const db = require('../database/db');

const ClienteModel = {
  buscarPorNombre: (nombre) =>
    db.prepare(
      `SELECT * FROM clientes WHERE nombre LIKE ? AND activo = 1`
    ).all(`%${nombre}%`),

  obtenerTodos: () =>
    db.prepare(`SELECT * FROM clientes WHERE activo = 1`).all(),
};

module.exports = ClienteModel;