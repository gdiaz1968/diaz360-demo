import React, { useState, useEffect } from 'react'; // Importación de hooks
import ProductoForm from '../components/productos/productoForm.js';
import ProductoLista from '../components/productos/productoLista.js';
import productosService from '../services/productosService.js';
import { Routes, Route, Link } from 'react-router-dom';
import EscanearProducto from '../components/productos/EscanearProducto'; // Para usar EscanearProducto

function Productos() {
  const [productos, setProductos] = useState([]);
  const [productoEditado, setProductoEditado] = useState(null);

  // Obtener todos los productos de la base de datos o servicio
  const obtenerProductos = async () => {
    const data = await productosService.obtenerTodos();
    setProductos(data);
  };

  // Eliminar un producto de la base de datos o servicio
  const eliminarProducto = async (id) => {
    await productosService.eliminarProducto(id);
    obtenerProductos();  // Actualiza la lista de productos después de eliminar
  };

  useEffect(() => {
    obtenerProductos();  // Se ejecuta al montar el componente
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
        {/* Ruta para ver productos y el formulario de productos */}
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

        {/* Ruta para escanear un producto */}
        <Route path="/escanear" element={
          <EscanearProducto onScanSuccess={(codigo) => {
            console.log("Código escaneado:", codigo);
            obtenerProductos();  // Actualiza la lista después de escanear
          }} />
        } />
      </Routes>
    </div>
  );
}

export default Productos;
