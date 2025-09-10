const express = require("express");
const multer = require("multer");
const path = require("path");
const { addBrand, getBrands } = require("../controllers/brandController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/brands/",
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

router.post("/add", upload.single("image"), addBrand);
router.get("/", getBrands);

module.exports = router;
