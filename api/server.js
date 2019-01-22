const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../data/dbConfig');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).send('server is running!');
});

server.get('/api/users', (req, res) => {
  db('users')
    .select('username', 'id')
    .then(list => {
      res.status(200).json(list);
    });
});

server.post('/api/register', (req, res) => {
  const creds = req.body;

  // hash password
  creds.password = bcrypt.hashSync(creds.password, 14);

  // add user
  db('users')
    .insert(creds)
    .then(id => {
      res.status(201).send(id);
    })
    .catch(err => res.status(500).json(err));
});

server.post('/api/login', (req, res) => {
  console.log(req.body);
  db('users')
    .where({username: req.body.username})
    .first()
    .then(user => {
      console.log(user);
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        res.status(200).json('logged in!');
      } else {
        res.status(401).json({message: 'thou shalt not pass'});
      }
    })
    .catch(err => res.status(500).json({error: `oh no! ${err}`}));
});

module.exports = server;
