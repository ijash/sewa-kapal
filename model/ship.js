const Joi = require('joi'); // to catch any error during request
const mongoose = require('mongoose');

const Ship = mongoose.model('Ships', new mongoose.Schema({
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
  type: {
    type: String,
    required: true,
    enum: ['besar', 'sedang', 'kecil']
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 1000000000
  },
  detail: {
    type: {
      yearOfManufactured: { type: String },
      lengthOverall: { type: String },
      beam: { type: String },
      location: { type: String }
    }
  },
  available: {
    type: Boolean,
    required: true,
    default: true
  }
}));

function validateShip(ship) {
  const schema = {
    name: Joi.string().min(3).max(25).required(),
    model: Joi.string().min(3).max(50).required(),
    type: Joi.string().valid('besar', 'sedang', 'kecil').required(),
    price: Joi.number().min(0).max(1000000000).required(),
    yearOfManufactured: Joi.string(),
    lengthOverall: Joi.string(),
    beam: Joi.string(),
    location: Joi.string(),
    available: Joi.boolean().required()
  };

  return Joi.validate(ship, schema);
};

exports.Ship = Ship
exports.validate = validateShip