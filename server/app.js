const express = require('express');
const cors = require('cors');
const app = express();

const db = require('./models');

const { Member } = db;

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.get('/api/members', async (req, res) => {
  const { team } = req.query;
  if (team) {
    const teamMembers = await Member.findAll({ where: { team: team } });
    res.send(teamMembers);
  } else {
    const members = await Member.findAll();
    res.send(members);
  }
});

app.get('/api/members/:id', async (req, res) => {
  const { id } = req.params;
  const member = await Member.findOne({ where: { id: id } });
  if (member) {
    res.send(member);
  } else {
    res.status(404).send('no member');
  }
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/api/members', (req, res) => {
  res.send('API response');
});

app.listen(3001, () => {
  console.log('server is listening..');
});

// var express = require('express');
// var app = express();

// app.use(express.static(__dirname + '../client/build'));

// app.get('/', (req, res) => {
//   res.sendFile('../client/build/index.html');
// });

// app.listen(3001, '0.0.0.0', () => {
//   console.log('Server is running : port 3001');
// });

// const express = require('express');
// const path = require('path');
// const app = express();

// app.use(express.static(path.join(__dirname, '../client/build')));

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

// app.listen(8080, function () {
//   console.log('listening on 8080');
// });
