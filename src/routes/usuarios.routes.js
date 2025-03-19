import { Router } from 'express';
import {  obtenerUsuarios, obtenerUsuario } from '../controllers/usuarios.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/usuarios', obtenerUsuarios);

// Ruta para obtener un cliente por su ID
router.get('/usuario/:user', obtenerUsuario);

export default router;