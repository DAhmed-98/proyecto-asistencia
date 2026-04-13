const db = require('./database/db');

const insertar = db.prepare(
  'INSERT INTO asistencia (cliente_id, fecha, retardo) VALUES (?,?,?)'
);

insertar.run(1, '2024-04-01', 0);
insertar.run(2, '2024-04-01', 1);
insertar.run(3, '2024-04-01', 0);
insertar.run(4, '2024-04-01', 1);
insertar.run(1, '2024-04-02', 1);
insertar.run(2, '2024-04-02', 0);

console.log('Datos insertados correctamente');