// frontend/src/components/common/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './sideBar.css'; // Aquí debe coincidir con 'sidebar.css'


const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/">Productos</Link></li>
        <li><Link to="/compras">Compras</Link></li>
        <li><Link to="/ventas">Ventas</Link></li>
        <li><Link to="/reportes">Reportes</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
