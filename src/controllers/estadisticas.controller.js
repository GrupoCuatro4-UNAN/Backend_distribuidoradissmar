import { pool2 } from '../db.js';

export const totalVentasPorDia = async (req, res) => {
    try {
        const [result] = await pool2.query(`
      SELECT DATE_FORMAT(dt.fecha, '%Y-%m-%d') AS dia, SUM(hv.Total) AS total_ventas
      FROM Hecho_Ventas hv
      JOIN Dim_Tiempo dt ON hv.id_tiempo = dt.id_tiempo
      GROUP BY dt.fecha
      ORDER BY dt.fecha
    `);

        if (result.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron estadísticas de ventas.' });
        }

        res.json(result);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener estadísticas', error: error.message });
    }
};

export const totalVentasPorMes = async (req, res) => {
    try {
        const [result] = await pool2.query(`
            SELECT 
                DATE_FORMAT(dt.fecha, '%Y-%m') AS mes, 
                SUM(hv.Total) AS total_ventas
            FROM Hecho_Ventas hv
            JOIN Dim_Tiempo dt ON hv.id_tiempo = dt.id_tiempo
            GROUP BY DATE_FORMAT(dt.fecha, '%Y-%m')
            ORDER BY mes
        `);

        if (result.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron estadísticas de ventas mensuales.' });
        }

        res.json(result);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener estadísticas mensuales', error: error.message });
    }
};

