import React, { useState } from 'react';
import BarcodeReader from 'react-barcode-reader';

import productosService from '../../services/productosService';



function EscanearProducto({ obtenerProductos }) {
  const [producto, setProducto] = useState({
    nombre: '',
    categoria: '',
    precio_compra: '',
    precio_venta: '',
    stock: ''
  });

  const handleScan = async (codigo) => {
    // Aquí se puede utilizar el código escaneado para buscar el producto
    // o rellenar algunos campos automáticamente si es necesario.
    setProducto({ ...producto, nombre: `Producto ${codigo}` }); // Simulación con nombre
  };

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await productosService.crearProducto(producto);
    obtenerProductos(); // Actualiza el listado de productos después de guardar
    setProducto({ nombre: '', categoria: '', precio_compra: '', precio_venta: '', stock: '' });
  };

  return (
    <div>
      <h3>Escanear Producto</h3>
      <BarcodeReader onScan={handleScan} onError={console.error} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          value={producto.nombre}
          onChange={handleChange}
          placeholder="Nombre del Producto"
          required
        />
        <input
          type="text"
          name="categoria"
          value={producto.categoria}
          onChange={handleChange}
          placeholder="Categoría"
          required
        />
        <input
          type="number"
          name="precio_compra"
          value={producto.precio_compra}
          onChange={handleChange}
          placeholder="Precio de Compra"
          required
        />
        <input
          type="number"
          name="precio_venta"
          value={producto.precio_venta}
          onChange={handleChange}
          placeholder="Precio de Venta"
          required
        />
        <input
          type="number"
          name="stock"
          value={producto.stock}
          onChange={handleChange}
          placeholder="Stock"
          required
        />
        <button type="submit">Guardar Producto</button>
      </form>
    </div>
  );
}

export default EscanearProducto;
