import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Productos from './pages/productos.js';


function App() {
  return (
    <Router>
      <div className="container mt-4">
        <h1 className="mb-4">Gdiaz360</h1>
        <nav className="mb-4">
          <Link to="/" className="btn btn-primary">Productos</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Productos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
