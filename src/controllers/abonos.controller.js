import { pool } from '../db.js';

// Obtener todas los abonos
export const obtenerAbonos = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Abonos');
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de los abonos.',
      error: error
    });
  }
};

// Obtener un abono por su ID
export const obtenerAbono = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Abonos WHERE id_abono = ?', [req.params.id]);
    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. El abono ${req.params.id} no fue encontrado.`
      });
    }
    res.json(result[0]);
  } catch (error) {
    console.error(error); // Registrar el error en la consola para depuración
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos del abono.'
    });
  }
};

// Registrar un nuevo Abono
export const registrarAbono = async (req, res) => {
  try {
    const {
      id_cliente,
      monto,
      fecha_abono,
    } = req.body;

    // Validación básica de campos requeridos
    if (!id_cliente || !monto || !fecha_abono) {
      return res.status(400).json({
        mensaje: 'Faltan campos requeridos: id_cliente, monto, fecha_abono.'
      });
    }

    const [result] = await pool.query(
      'INSERT INTO Abonos (id_cliente, monto, fecha_abono) VALUES (?, ?, ?)',
      [
        id_cliente,
        monto,
        fecha_abono
      ]
    );

    res.status(201).json({
      id_abono: result.insertId,
      mensaje: 'Abono registrado exitosamente'
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar el Abono.',
      error: error.message
    });
  }
};


// Eliminar una abono por su ID
export const eliminarAbono = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Abonos WHERE id_abono = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar el abono. El ID ${req.params.id} no fue encontrado.`
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

export const actualizarAbono = async (req, res) => {
  try {
    const { id } = req.params; // <--- cambio aquí
    const { id_cliente, monto, fecha_abono } = req.body;

    if (!id_cliente || !monto || !fecha_abono) {
      return res.status(400).json({
        mensaje: 'Faltan campos requeridos: id_cliente, monto, fecha_abono.'
      });
    }

    const [abonoExistente] = await pool.query('SELECT * FROM Abonos WHERE id_abono = ?', [id]);
    if (abonoExistente.length === 0) {
      return res.status(404).json({
        mensaje: `El abono con ID ${id} no fue encontrado.`
      });
    }

    const [result] = await pool.query(
      'UPDATE Abonos SET id_cliente = ?, monto = ?, fecha_abono = ? WHERE id_abono = ?',
      [id_cliente, monto, fecha_abono, id]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({
        mensaje: 'No se pudo actualizar el abono. Verifique los datos proporcionados.'
      });
    }

    res.status(200).json({
      mensaje: `Abono con ID ${id} actualizado exitosamente.`,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al actualizar el abono.',
      error: error.message,
    });
  }
};



