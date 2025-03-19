import { pool } from '../db.js';

// Obtener todas las detalles_ventas
export const obtenerDetalles_Ventas = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM detalles_ventas');
        res.json(result);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ha ocurrido un error al leer los datos de las detalles_ventas.',
            error: error
        });
    }
};

// Obtener un detalle de venta por su ID
export const obtenerDetalle_Venta = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM detalles_ventas WHERE id_detalle_venta = ?', [req.params.id]);
        if (result.length <= 0) {
            return res.status(404).json({
                mensaje: `Error al leer los datos. El detalle de venta ${req.params.id} no fue encontrado.`
            });
        }
        res.json(result[0]);
    } catch (error) {
        console.error(error); // Registrar el error en la consola para depuración
        return res.status(500).json({
            mensaje: 'Ha ocurrido un error al leer los datos del detalle de venta.'
        });
    }
};