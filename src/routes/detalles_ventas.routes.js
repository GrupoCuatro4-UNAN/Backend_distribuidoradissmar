import { Router } from 'express';
import { obtenerDetalles_Ventas } from '../controllers/detalles_ventas.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/detalles_ventas/:id', obtenerDetalles_Ventas);




export default router;