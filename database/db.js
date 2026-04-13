const Database = require('better-sqlite3');
const db = new Database('asistencia.db');

// Entidad 1: Clientes
db.exec(`
  CREATE TABLE IF NOT EXISTS clientes (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre    TEXT    NOT NULL,
    email     TEXT    UNIQUE,
    activo    INTEGER DEFAULT 1
  )
`);

// Entidad 2: Asistencia
db.exec(`
  CREATE TABLE IF NOT EXISTS asistencia (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id  INTEGER NOT NULL,
    fecha       TEXT    NOT NULL,
    retardo     INTEGER DEFAULT 0,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
  )
`);

// Datos de prueba
const count = db.prepare('SELECT COUNT(*) as c FROM clientes').get().c;
if (count === 0) {
  const insert = db.prepare('INSERT INTO clientes (nombre, email) VALUES (?,?)');
  insert.run('Ana García',    'ana@mail.com');
  insert.run('Luis Torres',   'luis@mail.com');
  insert.run('María López',   'maria@mail.com');
  insert.run('Carlos Ruiz',   'carlos@mail.com');
}

module.exports = db;