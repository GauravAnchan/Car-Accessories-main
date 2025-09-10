const db = require("../config/db");

exports.addProduct = (req, res) => {
  const { name, description, category_id, brand_id, quantity, price, discount } = req.body;
  const image = req.file ? req.file.filename : null;
  const final_price = price - (price * discount / 100);

  if (!name || !description || !category_id || !brand_id || !quantity || !price || !discount || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = `INSERT INTO products 
    (name, description, image, category_id, brand_id, quantity, price, discount, final_price) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [name, description, image, category_id, brand_id, quantity, price, discount, final_price],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "✅ Product added successfully!" });
    }
  );
};

exports.getProducts = (req, res) => {
  const sql = `
    SELECT p.*, 
           c.name AS category_name, 
           b.name AS brand_name 
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN brands b ON p.brand_id = b.id`;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const data = results.map(row => ({
      ...row,
      image: row.image ? `/uploads/products/${row.image}` : null
    }));

    res.json(data);
  });
};
