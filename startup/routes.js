const express = require('express');
const cookieParser = require('cookie-parser')

const users = require('../routes/users');
const auth = require('../routes/auth')

const views = require('../routes/views');
const ships = require('../routes/ships');



module.exports = function(app) {
  app.set('view engine', 'pug')
  app.set('views', './views')

  app.use('/public', express.static('public'));

  app.use(cookieParser())
//for reading application/x-www-form-urlencoded on POST method
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  

  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use('/api/ships', ships);
  app.use('', views);
  app.use((req, res, next) => {
    res.redirect('/error/404/?details=Nothing to do here...');
  });
};