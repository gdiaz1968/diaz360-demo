import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Productos from './pages/productos';

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <h1 className="mb-4">Gdiaz360</h1>
        <Routes>
          {/* Todas las rutas serán manejadas dentro de Productos */}
          <Route path="/*" element={<Productos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
