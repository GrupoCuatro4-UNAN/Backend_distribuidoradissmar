import { pool } from '../db.js';

// Obtener todas las ventas
export const obtenerVentas = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Ventas');
        res.json(result);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ha ocurrido un error al leer los datos de las ventas.',
            error: error
        });
    }
};

// Obtener un venta por su ID
export const obtenerVenta = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Ventas WHERE id_venta = ?', [req.params.id]);

        if (result.length <= 0) {
            return res.status(404).json({
                mensaje: `Error al leer los datos. La venta ${req.params.id} no fue encontrado.`
            });
        }
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ha ocurrido un error al leer los datos de la venta.'
        });
    }
};