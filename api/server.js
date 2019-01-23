const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const cors = require('cors');
const db = require('../data/dbConfig');

const sessionConfig = {
  name: 'foobarbanana',
  secret: 'woefasn.asdfji--sdfjio_asjfAjifOsdfjqeo',
  cookie: {
    maxAge: 10 * 60 * 1000, // 10 minutes
    secure: false, // USE TRUE IN PRODUCTION!
  },
  httpOnly: true,
  resave: false, // read more about this
  saveUnitialized: false, // and this
  store: 
    new KnexSessionStore({ 
      tablename: 'sessions',
      sidfieldname: 'sid',
      knex: db,
      createTable: true, 
      clearInterval: 1000 * 60 * 60, // clear expired sessions every hour
    })
}

const server = express();
server.use(express.json());
server.use(session(sessionConfig));
server.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

server.get('/', (req, res) => {
  res.status(200).send('server is running!');
});

function protect(req, res, next) {
  console.log(req.session.user);
  
  
  if(req.session && req.session.user) {
    next();
  } else {
    
    res.status(401).json({message: 'you are not authorized. please log in'})
  }
}

// protect this route, user must be logged in
server.get('/api/users', protect, (req, res) => {
  console.log('headers: \n', req.headers);
  
  db('users')
    .select('username', 'id')
    .then(list => {
      console.log(list);
      
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
      console.log(id);
      
      res.status(201).json(id);
    })
    .catch(err => res.status(500).json(err));
});

server.post('/api/login', (req, res) => {
  console.log(req.body);
  
  db('users')
    .where({username: req.body.username})
    .first()
    .then(user => {
      
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        req.session.user = user;
        res.status(200).json(`thanks for logging in, ${req.body.username}`);
      } else {
        res.status(401).json({message: 'thou shalt not pass! invalid username or password'});
      }
    })
    .catch(err => res.status(500).json({error: `oh no! ${err}`}));
});

server.get('/api/logout', (req, res) => {
  if (req.session && req.session.user) {
    req.session.destroy(err => {
      if (err) {
        res.status(500).json({error: `there was an error when logging out: ${err}`})
      } else {
        res.status(200).json({message: 'you have been logged out'})
      }
    })
  } else {
    res.json({message: 'try logging in before you log out ;p'})
  }
})

module.exports = server;
