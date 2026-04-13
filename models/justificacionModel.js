const db = require('../database/db');

const JustificacionModel = {

  // Obtiene todos los registros de asistencia con su clasificación
  // Usa LEFT JOIN para incluir registros sin justificación aún
  listarConDetalle: () => db.prepare(`
    SELECT
      a.id           AS asistencia_id,
      c.nombre,
      a.fecha,
      a.retardo,
      COALESCE(tr.codigo,      'SIN_CLASIFICAR') AS tipo,
      COALESCE(tr.descripcion, 'Sin clasificar')  AS tipo_desc,
      COALESCE(j.justificado,  0)                 AS justificado,
      COALESCE(j.motivo,       '')                AS motivo,
      j.id AS justificacion_id
    FROM asistencia a
    JOIN clientes c ON c.id = a.cliente_id
    LEFT JOIN justificaciones j  ON j.asistencia_id   = a.id
    LEFT JOIN tipo_retardo    tr ON tr.id = j.tipo_retardo_id
    ORDER BY a.fecha DESC
  `).all(),

  // Buscar por nombre de cliente
  buscarPorNombre: (nombre) => db.prepare(`
    SELECT
      a.id AS asistencia_id,
      c.nombre,
      a.fecha,
      a.retardo,
      COALESCE(tr.codigo,      'SIN_CLASIFICAR') AS tipo,
      COALESCE(tr.descripcion, 'Sin clasificar')  AS tipo_desc,
      COALESCE(j.justificado,  0)                 AS justificado,
      COALESCE(j.motivo,       '')                AS motivo
    FROM asistencia a
    JOIN clientes c ON c.id = a.cliente_id
    LEFT JOIN justificaciones j  ON j.asistencia_id   = a.id
    LEFT JOIN tipo_retardo    tr ON tr.id = j.tipo_retardo_id
    WHERE c.nombre LIKE ?
    ORDER BY a.fecha DESC
  `).all(`%${nombre}%`),

  obtenerTipos: () => db.prepare('SELECT * FROM tipo_retardo').all(),

  // Crea o actualiza una justificación (UPSERT)
  guardar: (asistencia_id, tipo_retardo_id, justificado, motivo, revisado_por) => {
    const existe = db.prepare(
      'SELECT id FROM justificaciones WHERE asistencia_id = ?'
    ).get(asistencia_id);

    if (existe) {
      return db.prepare(`
        UPDATE justificaciones
        SET tipo_retardo_id=?, justificado=?, motivo=?,
            revisado_por=?, fecha_revision=datetime('now')
        WHERE asistencia_id=?
      `).run(tipo_retardo_id, justificado, motivo, revisado_por, asistencia_id);
    } else {
      return db.prepare(`
        INSERT INTO justificaciones
          (asistencia_id, tipo_retardo_id, justificado, motivo, revisado_por, fecha_revision)
        VALUES (?,?,?,?,?,datetime('now'))
      `).run(asistencia_id, tipo_retardo_id, justificado, motivo, revisado_por);
    }
  },
};

module.exports = JustificacionModel;