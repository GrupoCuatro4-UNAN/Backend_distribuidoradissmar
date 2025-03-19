import { pool } from '../db.js';

// Obtener todas las detalles_compras
export const obtenerDetalles_Compras = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM detalles_compras');
        res.json(result);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ha ocurrido un error al leer los datos de las detalles_compras.',
            error: error
        });
    }
};

// Obtener un detalle de compra por su ID
export const obtenerDetalle_Compra = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM detalles_compras WHERE id_detalle_compra = ?', [req.params.id]);
        if (result.length <= 0) {
            return res.status(404).json({
                mensaje: `Error al leer los datos. El detalle de compra ${req.params.id} no fue encontrado.`
            });
        }
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ha ocurrido un error al leer los datos del detalle de compra.'
        });
    }
};