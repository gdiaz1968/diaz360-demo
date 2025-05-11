// backend/controllers/reportController.js
const PDFDocument = require("pdfkit");
const Producto = require("../models/productModels");

const generarReporteStock = async (req, res) => {
  try {
    const productos = await Producto.find();

    const doc = new PDFDocument();
    let buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      let pdfData = Buffer.concat(buffers);
      res
        .writeHead(200, {
          "Content-Length": Buffer.byteLength(pdfData),
          "Content-Type": "application/pdf",
          "Content-Disposition": "attachment;filename=stock.pdf",
        })
        .end(pdfData);
    });

    // Encabezado
    doc.fontSize(20).text("Reporte de Stock", { align: "center" });
    doc.moveDown();

    // Tabla
    doc.fontSize(12);
    productos.forEach((p, index) => {
      doc.text(
        `${index + 1}. ${p.codigo || "-"} - ${p.nombre} - Stock: ${p.stock}`,
        {
          continued: false,
        }
      );
    });

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al generar el reporte.");
  }
};

module.exports = { generarReporteStock };
