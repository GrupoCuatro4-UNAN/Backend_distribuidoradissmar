import { pool } from '../db.js';

// Obtener todos los clientes
export const obtenerClientes = async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM clientes');
      res.json(rows);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener los clientes', error });
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

// Eliminar un cliente por su ID
export const eliminarCliente = async (req, res) => {
    try {
      const [result] = await pool.query('DELETE FROM Clientes WHERE id_cliente = ?', [req.params.id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({
          mensaje: `Error al eliminar el cliente. El ID ${req.params.id} no fue encontrado.`
        });
      }
  
      res.status(204).send(); // Respuesta sin contenido para indicar éxito
    } catch (error) {
      return res.status(500).json({
        mensaje: 'Ha ocurrido un error al eliminar el cliente.',
        error: error
      });
    }
  };

  // Actualizar un cliente por su ID (parcial o completa)
export const actualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;

    const [resultado] = await pool.query(
      'UPDATE Clientes SET ? WHERE id_cliente = ?',
      [datos, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `El cliente con ID ${id} no existe.`,
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al actualizar el cliente.',
      error: error,
    });
  }
};