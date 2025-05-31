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
  // Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      role TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Materials table (raw materials)
  db.run(`
    CREATE TABLE IF NOT EXISTS materials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE,
      name TEXT,
      description TEXT,
      unit TEXT,
      min_stock INTEGER,
      max_stock INTEGER,
      current_stock INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Semi-finished goods table
  db.run(`
    CREATE TABLE IF NOT EXISTS semi_finished_goods (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE,
      name TEXT,
      description TEXT,
      unit TEXT,
      min_stock INTEGER,
      max_stock INTEGER,
      current_stock INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Finished goods table
  db.run(`
    CREATE TABLE IF NOT EXISTS finished_goods (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE,
      name TEXT,
      description TEXT,
      unit TEXT,
      min_stock INTEGER,
      max_stock INTEGER,
      current_stock INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Bill of Materials (BOM) table
  db.run(`
    CREATE TABLE IF NOT EXISTS bom (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      finished_good_id INTEGER,
      component_id INTEGER,
      component_type TEXT CHECK(component_type IN ('material', 'semi_finished')),
      quantity INTEGER,
      unit TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (finished_good_id) REFERENCES finished_goods(id),
      FOREIGN KEY (component_id) REFERENCES materials(id)
    )
  `);

  // Stock movements table
  db.run(`
    CREATE TABLE IF NOT EXISTS stock_movements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mo_number TEXT,
      item_id INTEGER,
      item_type TEXT CHECK(item_type IN ('material', 'semi_finished', 'finished')),
      movement_type TEXT CHECK(movement_type IN ('in', 'out')),
      quantity INTEGER,
      date DATETIME,
      notes TEXT,
      created_by INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (created_by) REFERENCES users(id)
    )
  `);

  // Settings table
  db.run(`
    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      language TEXT DEFAULT 'indonesian',
      system_title TEXT DEFAULT 'Sistem Pengontrol Barang',
      system_logo TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
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

  // Insert default settings if not exists
  db.get("SELECT * FROM settings LIMIT 1", [], (err, row) => {
    if (!row) {
      const settingsStmt = db.prepare("INSERT INTO settings (language, system_title) VALUES (?, ?)");
      settingsStmt.run("indonesian", "Sistem Pengontrol Barang");
      settingsStmt.finalize();
    }
  });

  // Insert sample material data
  db.get("SELECT * FROM materials LIMIT 1", [], (err, row) => {
    if (!row) {
      const materialStmt = db.prepare(`
        INSERT INTO materials (code, name, description, unit, min_stock, max_stock, current_stock) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      materialStmt.run("MAT001", "Bahan Baku A", "Deskripsi bahan baku A", "kg", 100, 1000, 500);
      materialStmt.run("MAT002", "Bahan Baku B", "Deskripsi bahan baku B", "liter", 50, 500, 250);
      materialStmt.finalize();
    }
  });

  // Insert sample semi-finished goods
  db.get("SELECT * FROM semi_finished_goods LIMIT 1", [], (err, row) => {
    if (!row) {
      const semiFinishedStmt = db.prepare(`
        INSERT INTO semi_finished_goods (code, name, description, unit, min_stock, max_stock, current_stock) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      semiFinishedStmt.run("SEMI001", "Komponen A", "Komponen setengah jadi A", "pcs", 50, 200, 100);
      semiFinishedStmt.run("SEMI002", "Komponen B", "Komponen setengah jadi B", "pcs", 30, 150, 75);
      semiFinishedStmt.finalize();
    }
  });

  // Insert sample finished goods
  db.get("SELECT * FROM finished_goods LIMIT 1", [], (err, row) => {
    if (!row) {
      const finishedStmt = db.prepare(`
        INSERT INTO finished_goods (code, name, description, unit, min_stock, max_stock, current_stock) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      finishedStmt.run("FIN001", "Produk A", "Produk jadi A", "unit", 20, 100, 40);
      finishedStmt.run("FIN002", "Produk B", "Produk jadi B", "unit", 15, 80, 30);
      finishedStmt.finalize();

      // Insert sample BOM relationships
      const bomStmt = db.prepare(`
        INSERT INTO bom (finished_good_id, component_id, component_type, quantity, unit) 
        VALUES ((SELECT id FROM finished_goods WHERE code = ?), 
                (SELECT id FROM materials WHERE code = ?), 
                ?, ?, ?)
      `);
      bomStmt.run("FIN001", "MAT001", "material", 2, "kg");
      bomStmt.run("FIN001", "MAT002", "material", 1.5, "liter");
      bomStmt.finalize();
    }
  });
});

// API Endpoints

// Materials API
app.get('/api/materials', isAuthenticated, (req, res) => {
  db.all("SELECT * FROM materials ORDER BY code", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/materials', isAuthenticated, (req, res) => {
  const { code, name, description, unit, min_stock, max_stock, current_stock } = req.body;
  const sql = `
    INSERT INTO materials (code, name, description, unit, min_stock, max_stock, current_stock)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.run(sql, [code, name, description, unit, min_stock, max_stock, current_stock], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

// Stock Movements API
app.post('/api/stock/movement', isAuthenticated, (req, res) => {
  const { mo_number, item_id, item_type, movement_type, quantity, date, notes } = req.body;
  const sql = `
    INSERT INTO stock_movements (mo_number, item_id, item_type, movement_type, quantity, date, notes, created_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.run(sql, [mo_number, item_id, item_type, movement_type, quantity, date, notes, req.session.user.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    
    // Update current stock in respective table
    const updateTable = item_type === 'material' ? 'materials' : 
                       item_type === 'semi_finished' ? 'semi_finished_goods' : 'finished_goods';
    const stockChange = movement_type === 'in' ? quantity : -quantity;
    
    db.run(`
      UPDATE ${updateTable} 
      SET current_stock = current_stock + ? 
      WHERE id = ?
    `, [stockChange, item_id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    });
  });
});

// BOM API
app.post('/api/bom', isAuthenticated, (req, res) => {
  const { finished_good_id, component_id, component_type, quantity, unit } = req.body;
  const sql = `
    INSERT INTO bom (finished_good_id, component_id, component_type, quantity, unit)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.run(sql, [finished_good_id, component_id, component_type, quantity, unit], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

// Get BOM for a finished good
app.get('/api/bom/:finished_good_id', isAuthenticated, (req, res) => {
  const sql = `
    SELECT b.*, 
           CASE 
             WHEN b.component_type = 'material' THEN m.name
             WHEN b.component_type = 'semi_finished' THEN s.name
           END as component_name
    FROM bom b
    LEFT JOIN materials m ON b.component_id = m.id AND b.component_type = 'material'
    LEFT JOIN semi_finished_goods s ON b.component_id = s.id AND b.component_type = 'semi_finished'
    WHERE b.finished_good_id = ?
  `;
  db.all(sql, [req.params.finished_good_id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Semi-finished goods API
app.get('/api/semi-finished', isAuthenticated, (req, res) => {
  db.all("SELECT * FROM semi_finished_goods ORDER BY code", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/semi-finished', isAuthenticated, (req, res) => {
  const { code, name, description, unit, min_stock, max_stock, current_stock } = req.body;
  const sql = `
    INSERT INTO semi_finished_goods (code, name, description, unit, min_stock, max_stock, current_stock)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.run(sql, [code, name, description, unit, min_stock, max_stock, current_stock], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

// Finished goods API
app.get('/api/finished-goods', isAuthenticated, (req, res) => {
  db.all("SELECT * FROM finished_goods ORDER BY code", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/finished-goods', isAuthenticated, (req, res) => {
  const { code, name, description, unit, min_stock, max_stock, current_stock } = req.body;
  const sql = `
    INSERT INTO finished_goods (code, name, description, unit, min_stock, max_stock, current_stock)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.run(sql, [code, name, description, unit, min_stock, max_stock, current_stock], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

// User management API
app.get('/api/users', isAuthenticated, (req, res) => {
  db.all("SELECT id, username, role, created_at FROM users", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/users', isAuthenticated, (req, res) => {
  const { username, password, role } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: err.message });
    const sql = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
    db.run(sql, [username, hash, role], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    });
  });
});

// Settings API
app.get('/api/settings', isAuthenticated, (req, res) => {
  db.get("SELECT * FROM settings ORDER BY id LIMIT 1", [], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

app.put('/api/settings', isAuthenticated, (req, res) => {
  const { language, system_title, system_logo } = req.body;
  const sql = `
    UPDATE settings 
    SET language = ?, system_title = ?, system_logo = ?, updated_at = CURRENT_TIMESTAMP 
    WHERE id = 1
  `;
  db.run(sql, [language, system_title, system_logo], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ changes: this.changes });
  });
});

// Login route with bcrypt password check
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
