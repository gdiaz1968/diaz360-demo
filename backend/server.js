// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // 👈 IMPORTANTE
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const saleRoutes = require('./routes/saleRoutes');
const reportRoutes = require("./routes/reportRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors()); // 👈 ACTIVAR CORS PARA TODAS LAS RUTAS
app.use(express.json());

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/sales', saleRoutes);
app.use("/api/reportes", reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
