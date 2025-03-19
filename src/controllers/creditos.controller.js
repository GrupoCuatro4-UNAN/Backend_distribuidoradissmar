import { pool } from '../db.js';

// Obtener todos los creditos
export const obtenerCreditos= async (req, res) => {
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