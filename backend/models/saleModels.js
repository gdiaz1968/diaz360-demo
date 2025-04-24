// models/saleModel.js
const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema(
  {
    producto_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
    cantidad: { type: Number, required: true },
    precio_venta: { type: Number, required: true },
    fecha: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Venta', saleSchema);
