// frontend/src/services/reportesService.js
import axios from "axios";

export const descargarReporteStock = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/reportes/stock", {
      responseType: "blob", // importante para archivos binarios
    });

    // Crear enlace para descarga
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "reporte_stock.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Error al descargar el reporte:", error);
  }
};
