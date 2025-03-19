import { Router } from 'express';
import { obtenerDetalles_Ventas, obtenerDetalle_Venta } from '../controllers/detalles_ventas.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/detalles_ventas', obtenerDetalles_Ventas);

// Ruta para obtener un cliente por su ID
router.get('/detalle_venta/:id', obtenerDetalle_Venta);

export default router;