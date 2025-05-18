import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import productosService from '../services/productosService.js';
import './productos.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// --- FORMULARIO ---
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
    } else {
      setProducto({
        nombre: '',
        categoria: '',
        precio_compra: '',
        precio_venta: '',
        stock: ''
      });
    }
  }, [productoEditado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (producto._id) {
        await productosService.actualizarProducto(producto._id, producto);
      } else {
        await productosService.crearProducto(producto);
      }
      obtenerProductos();
      limpiarSeleccion();
    } catch (error) {
      console.error('Error al guardar el producto:', error);
    }
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

// --- LISTADO ---
function ProductoLista({ productos, editarProducto, eliminarProducto }) {
  return (
    <table className="table table-bordered table-striped mt-3">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Categoría</th>
          <th>Precio Compra</th>
          <th>Precio Venta</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((p, index) => (
          <tr key={p._id || index}>
            <td>{p.nombre}</td>
            <td>{p.categoria}</td>
            <td>${p.precio_compra}</td>
            <td>${p.precio_venta}</td>
            <td>{p.stock}</td>
            <td>
              <button className="btn btn-sm btn-warning me-2" onClick={() => editarProducto(p)}>Editar</button>
              <button className="btn btn-sm btn-danger" onClick={() => eliminarProducto(p._id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// --- ESCANEAR ---
function EscanearProducto({ onScanSuccess }) {
  return (
    <div className="text-center">
      <h3>Escanear Producto</h3>
      <p>Aquí se puede integrar lector de código de barras o cámara con QuaggaJS / ZXing.</p>
      <button onClick={() => onScanSuccess("123456789")} className="btn btn-success">
        Simular Escaneo
      </button>
    </div>
  );
}

// --- COMPONENTE PRINCIPAL ---
function Productos() {
  const [productos, setProductos] = useState([]);
  const [productoEditado, setProductoEditado] = useState(null);

  const obtenerProductos = async () => {
    try {
      const data = await productosService.obtenerTodos();
      setProductos(data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await productosService.eliminarProducto(id);
      obtenerProductos();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <div className="container productos-pagina py-4">
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
            <div className="row">
              {/* Formulario CRUD */}
              <div className="col-12 col-md-4 mb-4">
                <h4>Formulario</h4>
                <ProductoForm
                  productoEditado={productoEditado}
                  obtenerProductos={obtenerProductos}
                  limpiarSeleccion={() => setProductoEditado(null)}
                />
              </div>

              {/* Lista de Productos */}
              <div className="col-12 col-md-8">
                <h4>Lista de Productos</h4>
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
