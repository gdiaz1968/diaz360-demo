import React, { useState, useEffect } from 'react'; // Importación de hooks
import ProductoForm from '../components/productos/productoForm.js';
import ProductoLista from '../components/productos/productoLista.js';
import productosService from '../services/productosService.js';
import { Routes, Route, Link } from 'react-router-dom';
import EscanearProducto from '../components/productos/EscanearProducto'; // Para usar EscanearProducto

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

      {/* Barra de navegación */}
      <nav className="mb-4">
        <Link to="/" className="btn btn-primary m-2">Productos</Link>
        <Link to="/escanear" className="btn btn-secondary m-2">Escanear Producto</Link>
      </nav>

      {/* Rutas internas */}
      <Routes>
        <Route path="/" element={
          <>
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
          </>
        } />
        <Route path="/escanear" element={
          <EscanearProducto onScanSuccess={(codigo) => {
            console.log("Código escaneado:", codigo);
            obtenerProductos();
          }} />
        } />
      </Routes>
    </div>
  );
}

export default Productos;
