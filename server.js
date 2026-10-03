const express = require('express');
const { exec } = require('child_process');
const mysql = require('mysql');

const app = express();
const port = 3000;

// DevOps Trap 1: Hardcoded Secrets (Should be caught by Gitleaks)
const AWS_ACCESS_KEY_ID = "AKIAIOSFODNN7EXAMPLE";
const AWS_SECRET_ACCESS_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";

// DevOps Trap 2: Insecure Database Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'supersecretpassword123', // Hardcoded DB password
  database: 'test_db'
});

app.get('/', (req, res) => {
  res.send('DevOps Test Server Running')
});

// DevOps Trap 3: SQL Injection (Should be caught by Semgrep)
app.get('/users', (req, res) => {
  const userId = req.query.id;
  // VULNERABILITY: Raw SQL string concatenation
  const query = "SELECT * FROM users WHERE id = " + userId;
  
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// DevOps Trap 4: Command Injection (Should be caught by Semgrep)
app.get('/ping', (req, res) => {
  const target = req.query.ip;
  // VULNERABILITY: Executing raw user input
  exec("ping -c 4 " + target, (error, stdout) => {
    if (error) {
      res.status(500).send(error.message);
      return;
    }
    res.send(stdout);
  });
});

// CONFLICT LINE: The text below will be modified differently in two branches
const welcomeMessage = "Welcome to the DevOps Pipeline! (Main Branch Hotfix)";

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
  console.log(welcomeMessage);
});
