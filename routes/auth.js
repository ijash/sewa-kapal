const Joi = require('joi')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const {User} = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.redirect('../error/400?details='+error.details[0].message);//kirim pug //buatin ajax di view
   
  let user = await User.findOne({email:req.body.email});
  if (!user) return res.redirect('../error/404?details=invalid username or password...');

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) return res.redirect('../error/404?details=invalid username or password...');
  
  const token = user.generateAuthToken(); 
  res.send(token);// buat pug
});

function validate(req) {

  const schema = {
    email:Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(128).required()
  };

  return Joi.validate(req, schema);
}

module.exports = router;
