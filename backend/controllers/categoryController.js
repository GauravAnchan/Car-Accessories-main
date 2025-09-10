const db = require('../config/db'); // your mysql connection

// Add category
exports.addCategory = (req, res) => {
  const { name, description } = req.body;
  const image = req.file ? req.file.filename : null; // only filename

  if (!name || !description || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.query(
    "INSERT INTO categories (name, description, image) VALUES (?, ?, ?)",
    [name, description, image],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error" });
      }
      res.status(201).json({ message: "✅ Category added successfully" });
    }
  );
};

// Get categories
exports.getCategories = (req, res) => {
  db.query("SELECT * FROM categories", (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });

    const categories = results.map(row => {
      let imageUrl = null;

      if (row.image) {
        const imageStr = String(row.image);  // ✅ force convert to string

        // if it's Base64 → ignore
        if (imageStr.startsWith("data:image")) {
          imageUrl = null;
        } else {
          imageUrl = `http://localhost:5000/uploads/${imageStr}`;
        }
      }

      return {
        id: row.id,
        name: row.name,
        description: row.description,
        image: imageUrl
      };
    });

    res.json(categories);
  });
};
