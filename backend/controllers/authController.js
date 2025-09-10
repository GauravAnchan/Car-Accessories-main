const db = require('../config/db');
const bcrypt = require('bcryptjs');

// ✅ REGISTER USER
exports.registerUser = async (req, res) => {
  console.log('📩 Incoming body:', req.body);

  const { fullname, mobile_number, email, password } = req.body;

  if (!fullname || !mobile_number || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // ✅ Check if user already exists
    const checkSql = 'SELECT * FROM tbl_users WHERE email = ? OR mobile_number = ?';
    db.query(checkSql, [email, mobile_number], async (err, results) => {
      if (err) {
        console.error('❌ DB error:', err);
        return res.status(500).json({ message: 'Database error' });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // ✅ Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // ✅ Insert new user
      const sql = 'INSERT INTO tbl_users (fullname, mobile_number, email, password) VALUES (?, ?, ?, ?)';
      db.query(sql, [fullname, mobile_number, email, hashedPassword], (err, result) => {
        if (err) {
          console.error('❌ Insert error:', err.sqlMessage);
          return res.status(500).json({ message: 'Server error: ' + err.sqlMessage });
        }
        console.log('✅ Inserted ID:', result.insertId);
        res.status(200).json({ message: 'Registered successfully!' });
      });
    });
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// ✅ LOGIN USER
exports.loginUser = (req, res) => {
  const { mobile_number, password } = req.body;

  if (!mobile_number || !password) {
    return res.status(400).json({ message: 'Fields required' });
  }

  const sql = 'SELECT * FROM tbl_users WHERE mobile_number = ?';
  db.query(sql, [mobile_number], async (err, results) => {
    if (err) {
      console.error('Login error:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful!' });
  });
};


exports.resetPassword = async (req, res) => {
  const { mobile_number, email, password } = req.body;

  if (!mobile_number || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedMobile = mobile_number.trim();

  const checkUserSql = `
    SELECT * FROM tbl_users 
    WHERE mobile_number = ? 
    AND LOWER(TRIM(email)) = ?
  `;
  db.query(checkUserSql, [normalizedMobile, normalizedEmail], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Mobile number and email do not match any registered user' });
    }

    // ✅ Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    const updateSql = `
      UPDATE tbl_users 
      SET password = ? 
      WHERE mobile_number = ? 
      AND LOWER(TRIM(email)) = ?
    `;
    db.query(updateSql, [hashedPassword, normalizedMobile, normalizedEmail], (err2) => {
      if (err2) {
        console.error(err2);
        return res.status(500).json({ message: 'Server error' });
      }
      res.status(200).json({ message: 'Password updated successfully' });
    });
  });
};
