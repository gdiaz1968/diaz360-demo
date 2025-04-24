import React, { useState, useEffect } from 'react';
import productosService from '../../services/productosService';

function ProductoForm({ productoEditado, obtenerProductos, limpiarSeleccion }) {
  const [producto, setProducto] = useState({
    nombre: '',
    categoria: '',
    precio_compra: '',
    precio_venta: '',
    stock: ''
  });

  useEffect(() => {
    if (productoEditado) {
      setProducto(productoEditado);
    }
  }, [productoEditado]);

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (producto._id) {
      await productosService.actualizarProducto(producto._id, producto);
    } else {
      await productosService.crearProducto(producto);
    }

    obtenerProductos();
    setProducto({ nombre: '', categoria: '', precio_compra: '', precio_venta: '', stock: '' });
    limpiarSeleccion();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <input type="text" name="nombre" placeholder="Nombre" className="form-control"
          value={producto.nombre} onChange={handleChange} required />
      </div>
      <div className="mb-2">
        <input type="text" name="categoria" placeholder="Categoría" className="form-control"
          value={producto.categoria} onChange={handleChange} required />
      </div>
      <div className="mb-2">
        <input type="number" name="precio_compra" placeholder="Precio Compra" className="form-control"
          value={producto.precio_compra} onChange={handleChange} required />
      </div>
      <div className="mb-2">
        <input type="number" name="precio_venta" placeholder="Precio Venta" className="form-control"
          value={producto.precio_venta} onChange={handleChange} required />
      </div>
      <div className="mb-2">
        <input type="number" name="stock" placeholder="Stock" className="form-control"
          value={producto.stock} onChange={handleChange} required />
      </div>
      <button type="submit" className="btn btn-primary me-2">Guardar</button>
      {productoEditado && (
        <button type="button" className="btn btn-secondary" onClick={limpiarSeleccion}>Cancelar</button>
      )}
    </form>
  );
}

export default ProductoForm;
