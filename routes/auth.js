const Joi = require('joi')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const {User} = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(404).send(error.details[0].message);//kirim pug //buatin ajax di view
   
  let user = await User.findOne({email:req.body.email});
  if (!user) return res.status(404).send('Invalid username or password...');

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) return res.status(404).send('Invalid username or password...');
  
  const token = user.generateAuthToken(); 
  if(req.body.remember){
    res.cookie('x_auth_token',token,{maxAge: 86400000});
  }
  else{
    res.cookie('x_auth_token',token,{maxAge:518400000});
  }
  
  res.status(200).send('login successful')
});
router.get('/logout', async (req, res) => {
  res.clearCookie("x_auth_token")
  res.redirect('/')

});



function validate(req) {

  const schema = {
    email:Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(128).required(),
    remember: Joi.boolean().default(false)
  };

  return Joi.validate(req, schema);
}

module.exports = router;
