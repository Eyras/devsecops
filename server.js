require("dotenv").config();
const express = require("express");
const mysql = require("mysql");

const app = express();
app.use(express.json());

// Connexion à la base de données
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ Connecté à la base de données MySQL !");
});

// Route vulnérable à l'injection SQL
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  db.query(query, (err, result) => {
    if (err) throw err;
    res.json(result.length > 0 ? { message: "Authentification réussie" } : { message: "Échec" });
  });
});

/** CORRECTION
  app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const query = "SELECT * FROM users WHERE username = ? AND password = ?";
    
    db.query(query, [username, password], (err, result) => {
      if (err) throw err;
      res.json(result.length > 0 ? { message: "Authentification réussie" } : { message: "Échec" });
    });
  });
*/

app.listen(3000, () => console.log("🚀 Serveur lancé sur http://localhost:3000"));