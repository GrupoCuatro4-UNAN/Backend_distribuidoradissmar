import { pool } from '../db.js';

// Obtener todas las compras
export const obtenerCompras = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Compras');
        res.json(result);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ha ocurrido un error al leer los datos de las compras.',
            error: error
        });
    }
};

// Obtener una compra por su ID
export const obtenerCompra = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Compras WHERE id_compra = ?', [req.params.id]);
        if (result.length <= 0) {
            return res.status(404).json({
                mensaje: `Error al leer los datos. La compra ${req.params.id} no fue encontrada.`
            });
        }
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ha ocurrido un error al leer los datos de la compra.'
        });
    }
};