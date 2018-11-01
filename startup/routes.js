
const express = require('express');
const views = require('../routes/views');


module.exports = function(app){
  app.set('view engine','pug')
  app.set('views','./views')
  //for reading application/x-www-form-urlencoded on POST method
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static('public'));

  app.use('', views);

  
};