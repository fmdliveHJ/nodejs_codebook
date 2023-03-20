const express = require('express');

const app = express();

const db = require('./models');

const { Member } = db;

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

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

app.post('/api/members', (req, res) => {
  console.log(req.body);
  const result = req.body;
  res.send(result);
});

app.put('/api/members/:id', (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;
  const member = members.find((m) => m.id === Number(id));

  if (member) {
    Object.keys(newInfo).forEach((prop) => {
      member[prop] = newInfo[prop];
    });
    res.send(member);
  } else {
    res.status(404).send({ message: 'no member id' });
  }
});

app.delete('/api/members/:id', (req, res) => {
  const { id } = req.params;
  const memberCount = members.length;
  members = members.filter((member) => member.id !== Number(id));
  if (members.length < memberCount) {
    res.send({ message: 'Delete' });
  } else {
    res.status(404).send({ message: 'no member id' });
  }
});

app.listen(3001, () => {
  console.log('server is listening..');
});
