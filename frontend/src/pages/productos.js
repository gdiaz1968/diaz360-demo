import React, { useState, useEffect } from 'react';
import ProductoForm from '../components/productos/productoForm.js';
import ProductoLista from '../components/productos/productoLista.js';
import productosService from '../services/productosService.js';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [productoEditado, setProductoEditado] = useState(null);

  const obtenerProductos = async () => {
    const data = await productosService.obtenerTodos();
    setProductos(data);
  };

  const eliminarProducto = async (id) => {
    await productosService.eliminarProducto(id);
    obtenerProductos();
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <div>
      <h2>Gestión de Productos</h2>
      <ProductoForm
        productoEditado={productoEditado}
        obtenerProductos={obtenerProductos}
        limpiarSeleccion={() => setProductoEditado(null)}
      />
      <ProductoLista
        productos={productos}
        editarProducto={setProductoEditado}
        eliminarProducto={eliminarProducto}
      />
    </div>
  );
}

export default Productos;
