// models/productModel.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    categoria: { type: String, required: true },
    precio_compra: { type: Number, required: true },
    precio_venta: { type: Number, required: true },
    stock: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Producto', productSchema);
