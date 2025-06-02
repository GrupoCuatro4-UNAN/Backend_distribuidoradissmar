import { pool } from '../db.js';

// Obtener todos los productos
export const obtenerProductos = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Productos');
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de los productos.',
      error: error
    });
  }
};

// Obtener un producto por su ID
export const obtenerProducto = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Productos WHERE id_producto = ?', [req.params.id]);

    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. El ID ${req.params.id} del producto no fue encontrado.`
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos del producto.'
    });
  }
};



// Registrar un nuevo producto
export const registrarProducto = async (req, res) => {
  try {
    const {
      nombre_producto,
      descripcion,
      categoria,
      precio_unitario,
      stock
    } = req.body;

    // Validación básica de campos requeridos
    if (!nombre_producto || !categoria || !precio_unitario || !stock) {
      return res.status(400).json({
        mensaje: 'Faltan campos requeridos: nombre, categoría, precio o stock.'
      });
    }

    const [result] = await pool.query(
      'INSERT INTO Productos (nombre_producto, descripcion, categoria, precio_unitario, stock) VALUES (?, ?, ?, ?, ?)',
      [
        nombre_producto,
        descripcion || null, // Puede ser opcional
        categoria,
        precio_unitario,
        stock
      ]
    );

    res.status(201).json({
      id_producto: result.insertId,
      mensaje: 'Producto registrado exitosamente'
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar el producto.',
      error: error.message
    });
  }
};

// Eliminar un producto por su ID
export const eliminarProducto = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM productos WHERE id_producto = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar el producto. El ID ${req.params.id}
  no fue encontrado.`
      });
    }
    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar el producto.',
      error: error
    });
  }
};

// Actualizar un producto por su ID
export const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre_producto,
      descripcion,
      categoria,
      precio_unitario,
      stock
    } = req.body;

    // Validación básica de campos requeridos
    if (!nombre_producto || !categoria || !precio_unitario || !stock) {
      return res.status(400).json({
        mensaje: 'Faltan campos requeridos: nombre, categoría, precio o stock.'
      });
    }

    // Consultar si el producto existe
    const [producto] = await pool.query('SELECT * FROM Productos WHERE id_producto = ?', [id]);

    if (producto.length === 0) {
      return res.status(404).json({
        mensaje: `Producto con ID ${id} no encontrado.`
      });
    }

    // Realizar la actualización
    const [result] = await pool.query(
      'UPDATE Productos SET nombre_producto = ?, descripcion = ?, categoria = ?, precio_unitario = ?, stock = ? WHERE id_producto = ?',
      [
        nombre_producto,
        descripcion || null, // Puede ser opcional
        categoria,
        precio_unitario,
        stock,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `No se realizó ninguna actualización para el producto con ID ${id}.`
      });
    }

    res.json({
      mensaje: 'Producto actualizado exitosamente',
      id_producto: id
    });

  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al actualizar el producto.',
      error: error.message
    });
  }
};
