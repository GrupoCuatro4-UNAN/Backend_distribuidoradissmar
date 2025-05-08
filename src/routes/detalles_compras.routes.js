import { Router } from 'express';
import { obtenerDetalles_Compras, obtenerDetalle_Compra } from '../controllers/detalles_compras.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/detalles_compras/:id', obtenerDetalles_Compras);


export default router;