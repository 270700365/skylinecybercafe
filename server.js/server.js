const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// Setup middleware
app.use(express.json());
app.use(express.static(__dirname)); // Serve index.html, etc.

// Initialize SQLite database
const db = new sqlite3.Database('./skyline.db', (err) => {
  if (err) console.error(err.message);
  console.log("Connected to Skyline DB");
});

// Create users table
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  password TEXT,
  join_date TEXT
)`);

// Create sessions table
db.run(`CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  start_time TEXT,
  end_time TEXT,
  print_pages INTEGER,
  scan_pages INTEGER,
  total_bill REAL,
  FOREIGN KEY (user_id) REFERENCES users(id)
)`);

// Basic test route
app.get('/api/ping', (req, res) => {
  res.send({ message: 'Server is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3000;

// Setup middleware
app.use(express.json());
app.use(express.static(__dirname)); // Serve index.html, etc.

// Initialize SQLite database
const db = new sqlite3.Database('./skyline.db', (err) => {
  if (err) console.error(err.message);
  console.log("Connected to Skyline DB");
});

// Create users table
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  password TEXT,
  join_date TEXT
)`);

// Route for user registration
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const joinDate = new Date().toISOString();

  db.run(`INSERT INTO users (email, password, join_date) VALUES (?, ?, ?)`, 
    [email, hashedPassword, joinDate], function(err) {
      if (err) {
        return res.status(400).send({ error: 'Error registering user' });
      }
      res.status(201).send({ message: 'User registered successfully' });
  });
});

// Route for user login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
    if (err || !user) {
      return res.status(404).send({ error: 'User not found' });
    }

    if (bcrypt.compareSync(password, user.password)) {
      res.send({ message: 'Login successful', userId: user.id });
    } else {
      res.status(401).send({ error: 'Invalid credentials' });
    }
  });
});

// Basic test route
app.get('/api/ping', (req, res) => {
  res.send({ message: 'Server is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
