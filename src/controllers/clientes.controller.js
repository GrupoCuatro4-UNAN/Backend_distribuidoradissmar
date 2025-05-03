import { pool } from '../db.js';

// Obtener todos los clientes
export const obtenerClientes = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Clientes');
        res.json(result);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ha ocurrido un error al leer los datos de los clientes.',
            error: error.message
        });
    }
};

// Obtener un cliente por su ID
export const obtenerCliente = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Clientes WHERE id_cliente = ?', [req.params.id]);
        
        if (result.length <= 0) {
            return res.status(404).json({
                mensaje: `Error al leer los datos. El ID ${req.params.id} del cliente no fue encontrado.`
            });
        }
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ha ocurrido un error al leer los datos del cliente.',
            error: error.message
        });
    }
};

// Registrar nuevo cliente

export const registrarCliente = async (req, res) => {
  const { nombre, apellido, cedula, celular, direccion } = req.body;

  // Validaciones básicas
  if (!nombre || !apellido || !cedula) {
      return res.status(400).json({
          error: 'Nombre, apellido y cédula son campos obligatorios'
      });
  }

  try {
      // Verificar si la cédula ya existe
      const [clienteExistente] = await pool.query(
          'SELECT id_cliente FROM Clientes WHERE cedula = ?',
          [cedula]
      );

      if (clienteExistente.length > 0) {
          return res.status(400).json({
              error: 'Ya existe un cliente con esta cédula'
          });
      }

      // Insertar nuevo cliente
      const [result] = await pool.query(
          'INSERT INTO Clientes (nombre, apellido, cedula, celular, direccion) VALUES (?, ?, ?, ?, ?)',
          [nombre, apellido, cedula, celular || null, direccion || null]
      );

      res.status(201).json({
          id: result.insertId,
          nombre,
          apellido,
          mensaje: 'Cliente registrado exitosamente'
      });

  } catch (error) {
      console.error('Error al registrar cliente:', error);
      res.status(500).json({
          error: 'Error interno del servidor al registrar el cliente',
          detalles: error.message
      });
  }
};