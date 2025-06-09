import express from 'express';
import {
    totalVentasPorDia,
    totalVentasPorMes,
    totalVentasPorProducto,
    totalVentasPorCliente,
    totalVentasPorAnio,
} from '../controllers/estadisticas.controller.js';

const router = express.Router();

// Rutas para las estadísticas
router.get('/totalventaspordia', totalVentasPorDia);
router.get('/totalventaspormes', totalVentasPorMes);
router.get('/ventasporproducto', totalVentasPorProducto);
router.get('/ventasporcliente', totalVentasPorCliente);
router.get('/totalventasporaño', totalVentasPorAnio);

export default router;