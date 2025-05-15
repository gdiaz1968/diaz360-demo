import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProductoForm from '../components/productos/productoForm.js';
import ProductoLista from '../components/productos/productoLista.js';
import EscanearProducto from '../components/productos/EscanearProducto.js';
import productosService from '../services/productosService.js';
import './productos.css'; // Importamos el CSS personalizado

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
    <div className="productos-pagina">
      <h2 className="text-center mb-4">Gestión de Productos</h2>

      {/* Barra de navegación interna */}
      <nav className="mb-4 text-center">
        <Link to="/" className="btn btn-primary m-2">Productos</Link>
        <Link to="/escanear" className="btn btn-secondary m-2">Escanear Producto</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <div className="productos-container">
              {/* Formulario CRUD */}
              <div className="productos-crud">
                <h2>Formulario</h2>
                <ProductoForm
                  productoEditado={productoEditado}
                  obtenerProductos={obtenerProductos}
                  limpiarSeleccion={() => setProductoEditado(null)}
                />
              </div>

              {/* Lista/Grilla de productos */}
              <div className="productos-grilla">
                <h2>Lista de Productos</h2>
                <ProductoLista
                  productos={productos}
                  editarProducto={setProductoEditado}
                  eliminarProducto={eliminarProducto}
                />
              </div>
            </div>
          }
        />

        <Route
          path="/escanear"
          element={
            <EscanearProducto
              onScanSuccess={(codigo) => {
                console.log("Código escaneado:", codigo);
                obtenerProductos();
              }}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default Productos;
