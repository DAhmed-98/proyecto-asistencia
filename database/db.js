const Database = require('better-sqlite3');
const db = new Database('asistencia.db');

// ── Tablas originales (sin cambios) ──────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS clientes (
    id     INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT    NOT NULL,
    email  TEXT    UNIQUE,
    activo INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS asistencia (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id INTEGER NOT NULL,
    fecha      TEXT    NOT NULL,
    retardo    INTEGER DEFAULT 0,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
  );
`);

// ── Tablas nuevas ─────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS tipo_retardo (
    id          INTEGER PRIMARY KEY,
    codigo      TEXT    UNIQUE NOT NULL,
    descripcion TEXT    NOT NULL,
    minutos_max INTEGER
  );

  CREATE TABLE IF NOT EXISTS justificaciones (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    asistencia_id   INTEGER UNIQUE NOT NULL,
    tipo_retardo_id INTEGER NOT NULL DEFAULT 1,
    justificado     INTEGER NOT NULL DEFAULT 0,
    motivo          TEXT,
    revisado_por    INTEGER,
    fecha_revision  TEXT,
    FOREIGN KEY (asistencia_id)   REFERENCES asistencia(id),
    FOREIGN KEY (tipo_retardo_id) REFERENCES tipo_retardo(id)
  );

  CREATE TABLE IF NOT EXISTS administradores (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre   TEXT NOT NULL,
    usuario  TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  );
`);

// Datos iniciales solo si las tablas están vacías
if (!db.prepare('SELECT id FROM tipo_retardo LIMIT 1').get()) {
  db.exec(`
    INSERT INTO tipo_retardo VALUES (1,'PUNTUAL','Asistencia puntual',0);
    INSERT INTO tipo_retardo VALUES (2,'RETARDO_PERMITIDO','Retardo dentro del margen',10);
    INSERT INTO tipo_retardo VALUES (3,'RETARDO','Retardo fuera de margen',NULL);
    INSERT INTO tipo_retardo VALUES (4,'AUSENCIA','No se presentó',NULL);
  `);
}
if (!db.prepare('SELECT id FROM administradores LIMIT 1').get()) {
  db.exec(`INSERT INTO administradores (nombre,usuario,password) VALUES ('Admin','admin','1234')`);
}
if (!db.prepare('SELECT id FROM clientes LIMIT 1').get()) {
  const ins = db.prepare('INSERT INTO clientes (nombre,email) VALUES (?,?)');
  ins.run('Ana García','ana@mail.com');
  ins.run('Luis Torres','luis@mail.com');
  ins.run('María López','maria@mail.com');
  ins.run('Carlos Ruiz','carlos@mail.com');
}

module.exports = db;