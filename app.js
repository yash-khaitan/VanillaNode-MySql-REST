// importing required modules.
const { createServer } = require('http');
const mysql = require('mysql');

// establish connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'sqluser',
  password: 'password',
  database: 'sociallife',
});

// connect to the database
db.connect((err) => {
  if (err) return console.log(err);

  console.log('connected to database');
});

// create server
const server = createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  // CREATE row data in sociallife database
  if (url === '/api/sociallife/post' && method === 'POST') {
    const sql = "INSERT INTO  friends (fname,nature) VALUES ('kaushik','good')";
    db.query(sql, (err, result, fields) => {
      if (err) return console.log(err);

      console.log(result);
      return res.end();
    });
  }

  // READ all row data
  if (url === '/api/sociallife' && method === 'GET') {
    const sql = 'SELECT * FROM friends';
    db.query(sql, (err, result, fields) => {
      if (err) return console.log(err);

      console.log(result);
      return res.end();
    });
  }

  // READ a row data
  if (url.match(/\/api\/sociallife\/[0-9]/) && method === 'GET') {
    const id = req.url.split('/')[3];
    const sql = 'SELECT * FROM friends WHERE id = ?';
    db.query(sql, id, (err, result, fields) => {
      if (err) return console.log(err);

      console.log(result);
      return res.end();
    });
  }

  // UPDATE the post
  if (url.match(/\/api\/sociallife\/[0-9]/) && method === 'PUT') {
    const id = req.url.split('/')[3];
    const sql = `UPDATE friends SET fname = 'Golu' WHERE id = ?`;
    db.query(sql, id, (err, result, fields) => {
      if (err) return console.log(err);

      console.log(result);
      return res.end();
    });
  }

  // DELETE the post
  if (url.match(/\/api\/sociallife\/[0-9]/) && method === 'DELETE') {
    const id = req.url.split('/')[3];
    const sql = `DELETE FROM friends WHERE id = ?`;
    db.query(sql, id, (err, result, fields) => {
      if (err) return console.log(err);

      console.log(result);
      return res.end();
    });
  }
});

server.listen(5000, () => console.log('listening at port:5000'));
