const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../data/dbConfig');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).send('server is running!');
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

module.exports = server;
