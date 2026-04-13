const db = require('../database/db');

const AsistenciaModel = {
  obtenerConCliente: (nombre) =>
    db.prepare(`
      SELECT a.id, c.nombre, a.fecha, a.retardo
      FROM asistencia a
      JOIN clientes c ON c.id = a.cliente_id
      WHERE c.nombre LIKE ?
      ORDER BY a.fecha DESC
    `).all(`%${nombre}%`),

  registrar: (clienteId, fecha, retardo) =>
    db.prepare(
      `INSERT INTO asistencia (cliente_id, fecha, retardo) VALUES (?,?,?)`
    ).run(clienteId, fecha, retardo ? 1 : 0),
};

module.exports = AsistenciaModel;