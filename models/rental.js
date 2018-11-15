const Joi = require('joi');
const mongoose = require('mongoose');

const Rental = mongoose.model('Rental', new mongoose.Schema({
  customer: { 
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
      deliveryLocation: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 1000
      },
      phone:{
        type: String,
        required: true,
        minlength: 10,
        maxlength: 15,
        unique:true
      }      
    }),  
    required: true
  },
  ship: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 25
      },
      model: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
      },
      price: {
        type: Number,
        required: true,
        min: 0,
        max: 1000000000000
      }
      //tambahin object buat image path kapal
    }),
    required: true
  },
  dateOut: { 
    type: Date, 
    required: true,
    default: Date.now
  },
  dateReturned: { 
    type: Date
  },
  rentalFee: { 
    type: Number, 
    min: 0
  },
  notes:{
    type: String,
    min: 0,
    max: 5000
  }
}));

function validateRental(rental) {
  const schema = {
    customerId: Joi.objectId().required(),
    shipId: Joi.objectId().required()
  };

  return Joi.validate(rental, schema);
}

exports.Rental = Rental; 
exports.validate = validateRental;