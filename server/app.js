const express = require('express');
const cors = require('cors');
const app = express();

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

app.set('port', process.env.PORT || 3000);

app.get('/', async (req, res) => {
  const ko = 'SELECT * FROM codebook.codebook';
  connection.query(ko, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = connection;
