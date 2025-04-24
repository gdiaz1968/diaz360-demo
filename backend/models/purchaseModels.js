// models/purchaseModel.js
const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema(
  {
    producto_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
    cantidad: { type: Number, required: true },
    precio_compra: { type: Number, required: true },
    fecha: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Compra', purchaseSchema);
