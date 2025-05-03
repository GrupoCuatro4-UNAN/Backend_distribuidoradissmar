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
export const registrarAbono = async (req, res) => {
    try {
        const { id_cliente, monto, fecha_abono } = req.body;

        const [result] = await pool.query(
            'INSERT INTO abonos (id_cliente, monto, fecha_abono) VALUES (?, ?, ?)',
            [id_cliente, monto, fecha_abono]
        );

        res.status(201).json({ id_abono: result.insertId });
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ha ocurrido un error al registrar el abono.',
            error: error.message
        });
    }
};
