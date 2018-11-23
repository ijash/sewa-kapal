// CUSTOMER GA DIPAKAI LAGI
// DIGANTI KE RENTAL LANGSUNG
const Joi = require('joi');
const mongoose = require('mongoose');


const Customer = mongoose.model('Customer', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  deliveryLocation: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1000
  },
  phone:{
    type: String,
    required: true,
    minlength: 10,
    maxlength: 15,
    unique:true
  }      
}));

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    deliveryLocation: Joi.string().min(5).max(1000).required(),
  };

  return Joi.validate(customer, schema);
}


exports.Customer = Customer; 
exports.validate = validateCustomer;