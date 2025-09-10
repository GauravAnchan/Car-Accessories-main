const db = require("../config/db");

// Add brand
exports.addBrand = (req, res) => {
  const { name } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!name || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "INSERT INTO brands (name, image) VALUES (?, ?)";
  db.query(sql, [name, image], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "✅ Brand added successfully!" });
  });
};

// Get brands
exports.getBrands = (req, res) => {
  const sql = "SELECT * FROM brands";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const data = results.map(row => ({
      ...row,
      image: row.image ? `/uploads/brands/${row.image}` : null,
    }));

    res.json(data);
  });
};

