const JustificacionModel = require('../models/justificacionModel');
const AdminModel          = require('../models/adminModel');

const adminController = {

  // Login simple: verifica usuario y password
  login: (req, res) => {
    const { usuario, password } = req.body;
    const admin = AdminModel.buscarPorUsuario(usuario);

    if (!admin || admin.password !== password)
      return res.status(401).json({ error: 'Credenciales incorrectas' });

    // En producción usarías JWT o sessions — aquí simplificamos
    res.json({ ok: true, adminId: admin.id, nombre: admin.nombre });
  },

  // Lista todos los registros con su estado de justificación
  listar: (req, res) => {
    const { nombre } = req.query;
    const datos = nombre
      ? JustificacionModel.buscarPorNombre(nombre)
      : JustificacionModel.listarConDetalle();
    res.json(datos);
  },

  // Obtiene los tipos de retardo para el formulario
  tipos: (_req, res) => {
    res.json(JustificacionModel.obtenerTipos());
  },

  // Guarda o actualiza la clasificación de un registro
  clasificar: (req, res) => {
    const { asistencia_id, tipo_retardo_id, justificado, motivo, admin_id } = req.body;

    if (!asistencia_id || !tipo_retardo_id)
      return res.status(400).json({ error: 'Datos incompletos' });

    JustificacionModel.guardar(
      asistencia_id,
      tipo_retardo_id,
      justificado ? 1 : 0,
      motivo || '',
      admin_id
    );
    res.json({ ok: true });
  },
};

module.exports = adminController;