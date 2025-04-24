// controllers/saleController.js
const Venta = require('../models/saleModels.js');

// Crear venta
exports.crearVenta = async (req, res) => {
  try {
    const { producto_id, cantidad, precio_venta, fecha } = req.body;
    const nuevaVenta = new Venta({ producto_id, cantidad, precio_venta, fecha });
    await nuevaVenta.save();
    res.status(201).json(nuevaVenta);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear venta', error: error.message });
  }
};

// Obtener todas las ventas
exports.obtenerVentas = async (req, res) => {
  try {
    const ventas = await Venta.find().populate('producto_id');
    res.status(200).json(ventas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener ventas', error: error.message });
  }
};
