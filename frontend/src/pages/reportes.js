import React from "react";
import { descargarReporteStock } from "../services/reportesService";

const Reportes = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Reportes del Sistema</h2>
      <button onClick={descargarReporteStock}>Descargar Reporte de Stock</button>
    </div>
  );
};

export default Reportes;
