import { Router } from 'express';
import { obtenerCompras, obtenerCompra, registrarCompra, eliminarCompra } from '../controllers/compras.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/compras', obtenerCompras);

// Ruta para obtener un cliente por su ID
router.get('/compra/:id', obtenerCompra);

// Ruta para eliminar un compra por su ID
router.delete('/eliminarcompra/:id', eliminarCompra);


router.post('/registrarcompra', registrarCompra);
export default router;