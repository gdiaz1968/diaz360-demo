// src/pages/Compras.js
import React, { useState, useEffect } from 'react';
import { registrarCompra } from '../services/comprasService';
import './compras.css';

const Compras = () => {
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({
    producto_id: '',
    cantidad: '',
    precio_compra: '',
    fecha: new Date().toISOString().substring(0, 10),
  });

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error('Error cargando productos:', err));
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await registrarCompra(formData);
      alert('✅ Compra registrada correctamente');
      setFormData({
        producto_id: '',
        cantidad: '',
        precio_compra: '',
        fecha: new Date().toISOString().substring(0, 10),
      });
    } catch (error) {
      alert(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="compras-container">
      <h2>📦 Registrar Nueva Compra</h2>
      <form className="compras-form" onSubmit={handleSubmit}>
        <div>
          <label>Producto:</label>
          <select name="producto_id" value={formData.producto_id} onChange={handleChange} required>
            <option value="">Seleccione un producto</option>
            {productos.map(p => (
              <option key={p._id} value={p._id}>{p.nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Cantidad:</label>
          <input
            type="number"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div>
          <label>Precio de compra:</label>
          <input
            type="number"
            step="0.01"
            name="precio_compra"
            value={formData.precio_compra}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Fecha:</label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">💾 Guardar compra</button>
      </form>
    </div>
  );
};

export default Compras;
