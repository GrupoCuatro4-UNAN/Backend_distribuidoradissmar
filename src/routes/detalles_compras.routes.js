import { Router } from 'express';
import { obtenerDetalles_Compras, obtenerDetalle_Compra } from '../controllers/detalles_compras.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/detalles_compras', obtenerDetalles_Compras);

// Ruta para obtener un cliente por su ID
router.get('/detalle_compra/:id', obtenerDetalle_Compra);

export default router;