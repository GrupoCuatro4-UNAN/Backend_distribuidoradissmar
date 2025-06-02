import { pool } from '../db.js';

// Obtener todos los creditos
export const obtenerCreditos = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Creditos');
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de los creditos.',
      error: error
    });
  }
};

// Obtener un crédito por su ID
export const obtenerCredito = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Creditos WHERE id_credito = ?', [req.params.id]);
    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. El ID ${req.params.id} del crédito no fue encontrado.`
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos del crédito.'
    });
  }
};

// Registrar un nuevo Credito
export const registrarCredito = async (req, res) => {
  try {
    const {
      id_cliente,
      tipo_credito,
      plazo_pago,
      tasa_interes,
      fecha_vencimiento,
      monto_credito,
      limite_credito
    } = req.body;

    // Validación básica de campos requeridos
    if (!id_cliente || !tipo_credito || !plazo_pago || !tasa_interes || !fecha_vencimiento || !monto_credito || !limite_credito) {
      return res.status(400).json({
        mensaje: 'Faltan campos requeridos'
      });
    }

    const [result] = await pool.query(
      'INSERT INTO Creditos (id_cliente, tipo_credito, plazo_pago, tasa_interes, fecha_vencimiento, monto_credito, limite_credito) VALUES (?, ?, ?,?, ?, ?, ?)',
      [
        id_cliente,
        tipo_credito,
        plazo_pago,
        tasa_interes,
        fecha_vencimiento,
        monto_credito,
        limite_credito
      ]
    );

    res.status(201).json({
      id_credito: result.insertId,
      mensaje: 'Credito registrado exitosamente'
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar el Credito.',
      error: error.message
    });
  }
};

// Eliminar una credito por su ID
export const eliminarCredito = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Creditos WHERE id_credito = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar el credito. El ID ${req.params.id} no fue encontrado.`
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar la categoría.',
      error: error
    });
  }
};

export const actualizarCredito = async (req, res) => {
  const { id } = req.params;
  const {
    tipo_credito,
    plazo_pago,
    tasa_interes,
    fecha_vencimiento,
    monto_credito,
    limite_credito
  } = req.body;

  const [resultado] = await pool.query(
    `UPDATE Creditos SET tipo_credito = ?, plazo_pago = ?, tasa_interes = ?, fecha_vencimiento = ?, monto_credito = ?, limite_credito = ?
    WHERE id_credito = ?`,
    [tipo_credito, plazo_pago, tasa_interes, fecha_vencimiento, monto_credito, limite_credito, id]
  );

  if (resultado.affectedRows === 0) {
    return res.status(404).json({ mensaje: "Crédito no encontrado." });
  }

  res.json({ mensaje: "Crédito actualizado correctamente." });
};