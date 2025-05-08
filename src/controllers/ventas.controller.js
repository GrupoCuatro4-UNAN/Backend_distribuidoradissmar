import { pool } from '../db.js';

export const obtenerVentas = async (req, res) => {
    try {
        const [result] = await pool.query(
            `SELECT id_venta, id_cliente, fecha_venta FROM ventas`
        );

        if (result.length === 0) {
            return res.status(404).json({
                mensaje: 'No se encontraron ventas registradas.',
            });
        }

        res.json(result);
    } catch (error) {
        console.error('Error al obtener ventas:', error);

        return res.status(500).json({
            mensaje: 'Error al obtener las ventas.',
            error: error.message,
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

// controllers/ventasController.js
export const eliminarVenta = async (req, res) => {
    try {
        const { id_venta } = req.params;
        const [result] = await pool.query('DELETE FROM Ventas WHERE id_venta = ?', [id_venta]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Venta no encontrada' });
        }

        res.json({ mensaje: 'Venta y detalles eliminados correctamente' });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar la venta',
            error: error.message
        });
    }
};

// Registrar una nueva venta con detalles
export const registrarVenta = async (req, res) => {
    const { id_cliente, fecha_venta, detalles } = req.body;

    // Asegúrate de que la fecha esté bien formateada
    const fechaVentaFormateada = new Date(fecha_venta).toISOString().slice(0, 19).replace('T', ' ');

    try {
        // Insertar la venta
        const [ventaResult] = await pool.query(
            'INSERT INTO Ventas (id_cliente, fecha_venta ) VALUES (?, ?)',
            [id_cliente, fechaVentaFormateada]
        );

        const id_venta = ventaResult.insertId;

        // Insertar los detalles de la venta y actualizar el stock
        for (const detalle of detalles) {
            await pool.query(
                'INSERT INTO Detalles_Ventas (id_venta, id_producto, cantidad, precio_detalle) VALUES (?, ?, ?, ?)',
                [id_venta, detalle.id_producto, detalle.cantidad, detalle.precio_unitario]
            );
            await pool.query(
                'UPDATE Productos SET stock = stock - ? WHERE id_producto = ?',
                [detalle.cantidad, detalle.id_producto]
            );
        }

        res.json({ mensaje: 'Venta registrada correctamente' });
    } catch (error) {
        console.error('Error en registrarVenta:', error);
        res.status(500).json({ mensaje: 'Error al registrar la venta', error: error.message });
    }
};

// Actualizar una venta con sus detalles
export const actualizarVenta = async (req, res) => {
    const { id_venta } = req.params;
    const { id_cliente, fecha_venta, credito, detalles } = req.body;

    try {
        const fechaVentaFormateada = new Date(fecha_venta).toISOString().slice(0, 19).replace('T', ' ');

        // Actualizar la venta (sin total_venta ni id_empleado porque no existen en tu tabla)
        const [ventaResult] = await pool.query(
            'UPDATE Ventas SET id_cliente = ?, fecha_venta = ?, credito = ? WHERE id_venta = ?',
            [id_cliente, fechaVentaFormateada, credito, id_venta]
        );

        if (ventaResult.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Venta no encontrada' });
        }

        // Obtener detalles actuales
        const [detallesActuales] = await pool.query(
            'SELECT id_producto, cantidad FROM Detalles_Ventas WHERE id_venta = ?',
            [id_venta]
        );

        // Restaurar stock anterior
        for (const detalle of detallesActuales) {
            await pool.query(
                'UPDATE Productos SET stock = stock + ? WHERE id_producto = ?',
                [detalle.cantidad, detalle.id_producto]
            );
        }

        // Eliminar detalles anteriores
        await pool.query('DELETE FROM Detalles_Ventas WHERE id_venta = ?', [id_venta]);

        // Insertar nuevos detalles y actualizar stock
        for (const detalle of detalles) {
            await pool.query(
                'INSERT INTO Detalles_Ventas (id_venta, id_producto, cantidad, precio_detalle) VALUES (?, ?, ?, ?)',
                [id_venta, detalle.id_producto, detalle.cantidad, detalle.precio_detalle]
            );
            await pool.query(
                'UPDATE Productos SET stock = stock - ? WHERE id_producto = ?',
                [detalle.cantidad, detalle.id_producto]
            );
        }

        res.json({ mensaje: 'Venta actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar la venta', error: error.message });
    }
};

