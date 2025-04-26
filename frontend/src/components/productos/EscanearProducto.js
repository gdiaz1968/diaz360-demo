import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode'; // Usamos la librería para escanear

function EscanearProducto({ onScanSuccess }) {
  const scannerRef = useRef(null);

  useEffect(() => {
    if (!scannerRef.current) {
      scannerRef.current = new Html5QrcodeScanner(
        "reader", 
        {
          fps: 10, // Frames por segundo
          qrbox: { width: 250, height: 250 }, // Tamaño del área de escaneo
        },
        /* verbose= */ false
      );

      scannerRef.current.render(
        (decodedText, decodedResult) => {
          console.log(`Código escaneado: ${decodedText}`, decodedResult);
          if (onScanSuccess) {
            onScanSuccess(decodedText);
          }
        },
        (errorMessage) => {
          console.warn(`Error de escaneo: ${errorMessage}`);
        }
      );
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(error => {
          console.error("Error limpiando el scanner", error);
        });
      }
    };
  }, [onScanSuccess]);

  return (
    <div>
      <h2>Escanear Producto</h2>
      <div id="reader" style={{ width: "300px", margin: "auto" }}></div>
    </div>
  );
}

export default EscanearProducto;
