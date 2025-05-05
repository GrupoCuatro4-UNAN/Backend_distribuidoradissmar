import { Router } from 'express';
import { 
    obtenerClientes, 
    obtenerCliente,
    registrarCliente, 
    eliminarCliente,
    actualizarCliente
} from '../controllers/clientes.controller.js';

const router = Router();

// Obtener todos los clientes
router.get('/clientes', obtenerClientes);

// Obtener un cliente específico
router.get('/clientes/:id', obtenerCliente);

// Registrar nuevo cliente
router.post('/registrarclientes', registrarCliente);

// Ruta para eliminar un cliente por su ID
router.delete('/eliminarcliente/:id', eliminarCliente);

// Ruta para actualizar una categoría por su ID
router.patch('/actualizarcliente/:id', actualizarCliente);

export default router;