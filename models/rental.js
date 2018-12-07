const Joi = require('joi');
const mongoose = require('mongoose');

const Rental = mongoose.model('Rental', new mongoose.Schema({
  user:{
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
    },
  },
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
      },
      picture: {
        type: String,
        required: true,
        maxlength: 4096
      },
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
  },
  isPaid: Boolean,
  isActive: {
    type: Boolean,
    default: true
  }
}));

function validateRental(rental) {
  const schema = {
    shipId: Joi.objectId().required(),
    userId: Joi.objectId().required(),
    custName: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    deliveryLocation: Joi.string().min(5).max(1000).required(),
    dateReturned: Joi.date().required(),
    notes: Joi.string().min(0).max(5000)
  };

  return Joi.validate(rental, schema);
}
function cleanNullValue(query) {
  for (i in query) {
    if (typeof query[i] === "object") {
      for (n in query[i]) {
        if (!query[i][n]) delete query[i][n]
      };
    };
    if (!query[i]) delete query[i]
  };
  return query
};
exports.Rental = Rental; 
exports.validate = validateRental;
exports.cleanNullValue = cleanNullValue