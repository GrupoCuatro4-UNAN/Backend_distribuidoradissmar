import { Router } from 'express';
import { 
    obtenerClientes, 
    obtenerCliente,
    registrarCliente 
} from '../controllers/clientes.controller.js';

const router = Router();

// Obtener todos los clientes
router.get('/clientes', obtenerClientes);

// Obtener un cliente específico
router.get('/clientes/:id', obtenerCliente);

// Registrar nuevo cliente
router.post('/registrarclientes', registrarCliente);

export default router;