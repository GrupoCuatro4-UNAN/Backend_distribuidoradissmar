import { Router } from 'express';
import { obtenerVenta, obtenerVentas, eliminarVenta, registrarVenta, actualizarVenta } from '../controllers/ventas.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/ventas', obtenerVentas);

// Ruta para obtener un cliente por su ID
router.get('/venta/:id', obtenerVenta);

// routes/ventasRoutes.js
router.delete('/ventas/:id_venta', eliminarVenta);

// Ruta para registrar una nueva venta
router.post('/registrarventa', registrarVenta);

// Ruta para actualizar una venta
router.patch('/actualizarventa/:id_venta', actualizarVenta);

export default router;