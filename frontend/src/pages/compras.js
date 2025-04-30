// src/pages/compras.js
import React, { useState, useEffect } from 'react';
import '../pages/compras.css';

const Compras = () => {
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({
    producto_id: '',
    cantidad: '',
    precio_compra: '',
    fecha: new Date().toISOString().substring(0, 10),
  });

  useEffect(() => {
    // Cargar productos al montar
    fetch('/api/productos')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error('Error cargando productos:', err));
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const res = await fetch('/api/compras', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert('Compra registrada correctamente');
      setFormData({
        producto_id: '',
        cantidad: '',
        precio_compra: '',
        fecha: new Date().toISOString().substring(0, 10),
      });
    } else {
      const error = await res.json();
      alert(`Error: ${error.mensaje}`);
    }
  };

  return (
    <div>
      <h2>Registrar Compra</h2>
      <form onSubmit={handleSubmit}>
        <label>Producto:</label>
        <select name="producto_id" value={formData.producto_id} onChange={handleChange} required>
          <option value="">Seleccione un producto</option>
          {productos.map(p => (
            <option key={p._id} value={p._id}>{p.nombre}</option>
          ))}
        </select>

        <label>Cantidad:</label>
        <input type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} required />

        <label>Precio de compra:</label>
        <input type="number" step="0.01" name="precio_compra" value={formData.precio_compra} onChange={handleChange} required />

        <label>Fecha:</label>
        <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />

        <button type="submit">Guardar compra</button>
      </form>
    </div>
  );
};

export default Compras;
