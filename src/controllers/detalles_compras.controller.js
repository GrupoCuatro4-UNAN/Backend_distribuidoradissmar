import { pool } from '../db.js';

// Obtener todos los detalles de una compra
export const obtenerDetalles_Compras = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query(
            `SELECT 
                id_detalle_compra,
                id_compra,
                id_producto,
                cantidad,
                precio,
                (cantidad * precio) AS subtotal
             FROM Detalles_Compras
             WHERE id_compra = ?`,
            [id]
        );

        if (result.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron detalles para esta compra.' });
        }

        res.json(result);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener los detalles de la compra.',
            error: error.message,
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

