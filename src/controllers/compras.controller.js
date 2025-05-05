import { pool } from '../db.js';



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


// Registrar una nueva compra
export const registrarCompra = async (req, res) => {
    try {
        // Extraemos los datos del cuerpo de la petición
        const { fecha_compra } = req.body;

        // Validación básica
        if (!fecha_compra) {
            return res.status(400).json({
                mensaje: 'La fecha de compra es requerida'
            });
        }

        // Insertar la nueva compra en la base de datos
        const [result] = await pool.query(
            'INSERT INTO Compras (fecha_compra) VALUES (?)',
            [fecha_compra]
        );

        // Respuesta exitosa
        res.status(201).json({
            id_compra: result.insertId,
            mensaje: 'Compra registrada exitosamente'
        });

    } catch (error) {
        // Manejo de errores
        console.error('Error al registrar compra:', error);
        return res.status(500).json({
            mensaje: 'Ha ocurrido un error al registrar la compra',
            error: error.message
        });
    }
};

// Obtener todas las compras
export const obtenerCompras = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Compras ORDER BY fecha_compra DESC');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener compras:', error);
        return res.status(500).json({
            mensaje: 'Error al obtener las compras',
            error: error.message
        });
    }
};

// Eliminar una compra por su ID
export const eliminarCompra = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Compras WHERE id_compra = ? ', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: `Error al eliminar la ccompra. El ID ${req.params.id}
    no fue encontrado.`
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