const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Initialize SQLite database
const db = new sqlite3.Database(path.resolve(__dirname, 'database.sqlite'));

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      role TEXT
    )
  `);

  db.run(`
    CREATE TABLE stock (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mo_number TEXT,
      date TEXT,
      qty INTEGER,
      type TEXT
    )
  `);

  db.run(`
    CREATE TABLE bom (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      finished_good_id INTEGER,
      component_id INTEGER,
      qty INTEGER
    )
  `);

  db.run(`
    CREATE TABLE settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      language TEXT,
      system_title TEXT,
      system_logo TEXT
    )
  `);

  // Insert default admin user with hashed password
  const defaultPassword = 'admin123';
  bcrypt.hash(defaultPassword, 10, (err, hash) => {
    if (err) {
      console.error('Error hashing default password', err);
      return;
    }
    const stmt = db.prepare("INSERT INTO users (username, password, role) VALUES (?, ?, ?)");
    stmt.run("admin", hash, "admin");
    stmt.finalize();
  });

  // Insert default settings
  const settingsStmt = db.prepare("INSERT INTO settings (language, system_title, system_logo) VALUES (?, ?, ?)");
  settingsStmt.run("indonesian", "Sistem Pengontrol Barang", "");
  settingsStmt.finalize();
});

// Simple login route with bcrypt password check
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    if (!row) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Compare hashed password
    bcrypt.compare(password, row.password, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error checking password' });
      }
      if (!result) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      req.session.user = { id: row.id, username: row.username, role: row.role };
      res.json({ message: 'Login successful', user: req.session.user });
    });
  });
});

// Middleware to check authentication
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
}

// Example protected route
app.get('/stock', isAuthenticated, (req, res) => {
  db.all("SELECT * FROM stock", (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
