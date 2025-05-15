// frontend/src/components/common/sideBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaBoxOpen, FaShoppingCart, FaCashRegister, FaChartLine } from 'react-icons/fa';
import './sideBar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="logo">DIAZ360</h2>
      <nav>
        <ul>
          <li>
            <Link to="/"><FaBoxOpen className="icon" /> Productos</Link>
          </li>
          <li>
            <Link to="/compras"><FaShoppingCart className="icon" /> Compras</Link>
          </li>
          <li>
            <Link to="/ventas"><FaCashRegister className="icon" /> Ventas</Link>
          </li>
          <li>
            <Link to="/reportes"><FaChartLine className="icon" /> Reportes</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
