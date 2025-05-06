const Venta = require('../models/saleModels.js');
const Producto = require('../models/productModels.js');

exports.crearVenta = async (req, res) => {
  try {
    const { producto_id, cantidad, precio_venta, fecha } = req.body;

    // Buscar el producto
    const producto = await Producto.findById(producto_id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    // Verificar stock
    if (producto.stock < cantidad) {
      return res.status(400).json({ mensaje: 'Stock insuficiente' });
    }

    // Restar stock y guardar
    producto.stock -= cantidad;
    await producto.save();

    // Guardar venta
    const nuevaVenta = new Venta({ producto_id, cantidad, precio_venta, fecha });
    await nuevaVenta.save();

    res.status(201).json(nuevaVenta);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear venta', error: error.message });
  }
};

exports.obtenerVentas = async (req, res) => {
  try {
    const ventas = await Venta.find().populate('producto_id');
    res.status(200).json(ventas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener ventas', error: error.message });
  }
};
