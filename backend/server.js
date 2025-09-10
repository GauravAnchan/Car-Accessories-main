const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require("path");
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes'); // ✅ only once
const brandRoutes = require("./routes/brandRoutes");
const productRoutes = require("./routes/productRoutes");


dotenv.config();
const app = express();

// ✅ Allow JSON body parsing
app.use(express.json({ limit: '10mb' }));

// ✅ Allow frontend requests
app.use(cors());

// ✅ Serve images as static files
app.use('/uploads', express.static('uploads'));


// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/products", productRoutes);


app.listen(5000, () => {
  console.log('🚀 Server running on port 5000');
});
