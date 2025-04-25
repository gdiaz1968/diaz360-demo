import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Productos from './pages/productos';
import EscanearProducto from './components/productos/EscanearProducto';

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <h1 className="mb-4">Gdiaz360</h1>
        <nav className="mb-4">
          <Link to="/" className="btn btn-primary">Productos</Link>
          <Link to="/escanear" className="btn btn-secondary">Escanear Producto</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Productos />} />
          <Route path="/escanear" element={<EscanearProducto />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
