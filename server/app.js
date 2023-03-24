const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '98421234aQ!',
  database: 'codebook',
});

connection.connect(function (err) {
  if (err) throw err;
  console.log('Connected');
});

app.set('port', process.env.PORT || 3001);

app.get('/', async (req, res) => {
  const sql = 'SELECT * FROM codebook.codebook';
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/', function (req, res) {
  let id = req.body.id;
  let name = req.body.name;
  let ko = req.body.ko;
  let en = req.body.en;
  let sql =
    'INSERT INTO codebook.codebook (id, name, ko, en) VALUES (?, ?, ?, ?)';
  connection.query(sql, [id, name, ko, en], function (err, result, field) {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server  Error');
    }
  });
});

app.put('/:id', function (req, res) {
  let id = req.params.id;
  let name = req.body.name;
  let ko = req.body.ko;
  let en = req.body.en;
  let sql = 'UPDATE codebook.codebook SET name=?, ko=?, en=? WHERE id=?';
  connection.query(sql, [name, ko, en, id], function (err, result, field) {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send('Update successful');
    }
  });
});

app.delete('/:name', function (req, res) {
  let name = req.params.name;
  let sql = 'DELETE FROM codebook.codebook WHERE name=?';
  connection.query(sql, [name], function (err, result, field) {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send('Delete successful');
    }
  });
});

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = connection;
