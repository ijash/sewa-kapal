const config = require('config')
const jwt = require('jsonwebtoken')
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique:true
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 128
    },
    isAdmin: Boolean,
    address:{
      type: String,
      required: true,
      minlength: 5,
      maxlength: 500
    },
    phone:{
      type: String,
      required: true,
      minlength: 10,
      maxlength: 15,
      unique:true
    }
  }
);
userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
  return token;
};

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  console.log(user);
  
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email:Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(128).required(),
    address: Joi.string().min(10).max(500),
    phone: Joi.string().regex(/([0-9]{4})([0-9]{4,8})/).required()
  };

  return Joi.validate(user, schema);
};

exports.User = User; 
exports.validate = validateUser;