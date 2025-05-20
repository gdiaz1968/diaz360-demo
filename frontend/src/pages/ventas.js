// src/pages/ventas.js
import React, { useState, useEffect } from 'react';
import { registrarVenta } from '../services/ventasService';
import './ventas.css'; // Creamos ventas.css para su estilo propio

const Ventas = () => {
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({
    producto_id: '',
    cantidad: '',
    precio_venta: '',
    fecha: new Date().toISOString().substring(0, 10),
  });

 useEffect(() => {
     fetch('https://diaz360-demo.onrender.com/api/products')
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
      const nuevaVenta = await registrarVenta(formData);
      alert('Venta registrada correctamente');
      setFormData({
        producto_id: '',
        cantidad: '',
        precio_venta: '',
        fecha: new Date().toISOString().substring(0, 10),
      });
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="ventas-container">
      <h2>Registrar Venta</h2>
      <form className="ventas-form" onSubmit={handleSubmit}>
        <label>Producto:</label>
        <select name="producto_id" value={formData.producto_id} onChange={handleChange} required>
          <option value="">Seleccione un producto</option>
          {productos.map(p => (
            <option key={p._id} value={p._id}>{p.nombre}</option>
          ))}
        </select>

        <label>Cantidad:</label>
        <input type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} required />

        <label>Precio de venta:</label>
        <input type="number" step="0.01" name="precio_venta" value={formData.precio_venta} onChange={handleChange} required />

        <label>Fecha:</label>
        <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />

        <button type="submit">Guardar venta</button>
      </form>
    </div>
  );
};

export default Ventas;
