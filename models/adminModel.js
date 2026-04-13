const db = require('../database/db');

const AdminModel = {
  buscarPorUsuario: (usuario) =>
    db.prepare('SELECT * FROM administradores WHERE usuario = ?').get(usuario),
};

module.exports = AdminModel;