const Producto = require('../models/Producto');


exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos', error: error.message });
  }
};


exports.crearProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, categoriaId } = req.body;
    const nuevoProducto = await Producto.create({ nombre, descripcion, precio, stock, categoriaId });
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear producto', error: error.message });
  }
};


exports.eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    await Producto.destroy({ where: { id } });
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar producto', error: error.message });
  }
};