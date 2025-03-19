import { Router } from 'express';
import { obtenerAbonos, obtenerAbono } from '../controllers/abonos.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/abonos', obtenerAbonos);

// Ruta para obtener un cliente por su ID
router.get('/abono/:id', obtenerAbono);

export default router;