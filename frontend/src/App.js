import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/common/sideBar.js';

// Importamos las páginas (sin extensión)
import Productos from './pages/productos';
import Compras from './pages/compras';
import Ventas from './pages/ventas';
import Reportes from './pages/reportes';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ marginLeft: '200px', padding: '20px', width: '100%' }}>
          <Routes>
            <Route path="/" element={<Productos />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/compras" element={<Compras />} />
            <Route path="/ventas" element={<Ventas />} />
            <Route path="/reportes" element={<Reportes />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
