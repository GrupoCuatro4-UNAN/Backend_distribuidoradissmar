import { Router } from 'express';
import { obtenerProductos, obtenerProducto, registrarProducto, eliminarProducto, actualizarProducto } from '../controllers/productos.controller.js';

const router = Router();

// Ruta para obtener todos los productos
router.get('/productos', obtenerProductos);

// Ruta para obtener un produto por su ID
router.get('/producto/:id', obtenerProducto);

router.post('/registrarproducto', registrarProducto);

// Ruta para eliminar un producto por su ID
router.delete('/eliminarproducto/:id', eliminarProducto);

router.put('/productos/:id', actualizarProducto);

export default router;