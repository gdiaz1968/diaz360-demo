// controllers/purchaseController.js
const Compra = require('../models/purchaseModels.js');
const Producto = require('../models/productModels.js');

// Crear compra
exports.crearCompra = async (req, res) => {
  try {
    const { producto_id, cantidad, precio_compra, fecha } = req.body;

    // Guardar la compra
    const nuevaCompra = new Compra({ producto_id, cantidad, precio_compra, fecha });
    await nuevaCompra.save();

    // ✅ Actualizar el stock del producto
    const producto = await Producto.findById(producto_id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    producto.stock += Number(cantidad)  ; // suma lo comprado al stock
    await producto.save();

    res.status(201).json(nuevaCompra);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear compra', error: error.message });
  }
};

// Obtener todas las compras
exports.obtenerCompras = async (req, res) => {
  try {
    const compras = await Compra.find().populate('producto_id');
    res.status(200).json(compras);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener compras', error: error.message });
  }
};
