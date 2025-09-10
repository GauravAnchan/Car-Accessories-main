const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../config/db');  // adjust if needed

const router = express.Router();

// ✅ storage for brand images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/brands')); 
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// ✅ POST /api/brands/add
router.post('/add', upload.single('image'), (req, res) => {
  const { name } = req.body;
  const file = req.file;

  if (!name || !file) {
    return res.status(400).json({ message: 'Name and image required' });
  }

  const sql = "INSERT INTO brands (name, image) VALUES (?, ?)";
  db.query(sql, [name, '/uploads/brands/' + file.filename], (err, result) => {
    if (err) {
      console.error("DB insert error:", err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json({ message: '✅ Brand added successfully!' });
  });
});

// ✅ GET /api/brands
router.get('/', (req, res) => {
  db.query("SELECT id, name, image FROM brands", (err, rows) => {
    if (err) {
      console.error("DB fetch error:", err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(rows);
  });
});

module.exports = router;
