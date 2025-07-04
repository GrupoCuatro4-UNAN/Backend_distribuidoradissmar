import { Router } from 'express';
import { obtenerAbonos, obtenerAbono, registrarAbono, eliminarAbono, actualizarAbono } from '../controllers/abonos.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/abonos', obtenerAbonos);

// Ruta para obtener un cliente por su ID
router.get('/abono/:id', obtenerAbono);

router.post('/registrarabono', registrarAbono);

// Ruta para eliminar un cliente por su ID
router.delete('/eliminarabono/:id', eliminarAbono);

router.put('/abonos/:id', actualizarAbono);


export default router;