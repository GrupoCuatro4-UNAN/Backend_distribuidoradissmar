import { Router } from 'express';
import { obtenerCreditos, obtenerCredito, registrarCredito, eliminarCredito, actualizarCredito } from '../controllers/creditos.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/creditos', obtenerCreditos);

// Ruta para obtener un cliente por su ID
router.get('/credito/:id', obtenerCredito);

router.post('/registrarcredito', registrarCredito);

// Ruta para eliminar un cliente por su ID
router.delete('/eliminarcredito/:id', eliminarCredito);

router.put('/creditos/:id', actualizarCredito);

export default router;