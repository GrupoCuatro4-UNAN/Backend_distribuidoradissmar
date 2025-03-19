import { Router } from 'express';
import { obtenerCreditos, obtenerCredito } from '../controllers/creditos.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/creditos', obtenerCreditos);

// Ruta para obtener un cliente por su ID
router.get('/credito/:id', obtenerCredito);

export default router;