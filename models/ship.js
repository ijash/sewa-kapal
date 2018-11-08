const BaseJoi = require('joi');
const Extension = require('joi-date-extensions')
const Joi = BaseJoi.extend(Extension)
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
    max: 1000000000000
  },
  details: {
    type: {
      yearOfManufactured: {
        type: Date,
        default: Date.now,
        min: new Date(1800, 1, 1),
        max: Date.now,
        required: true
      },
      lengthOverall: {
        type: Number,
        min: 3,
        max: 1000
      },
      beam: {
        type: Number,
        min: 1,
        max: 250
      },
      draft: {
        type: Number,
        min: 1,
        max: 250
      },
      displacement: {
        type: Number,
        min: 5,
        max: 2000
      },
      engine: {
        type: String
      },
      fuel: {
        type: String,
        enum: ['diesel', 'electric', 'gas', 'gasoline', 'steam']
      },
      fuelCapacity: {
        type: Number,
        min: 20,
        max: 10000
      },
      maximumSpeed: {
        type: Number,
        min: 10,
        max: 200
      },
      cruisingSpeed: {
        type: Number,
        min: 10,
        max: 200
      },
      numberOfCabins: {
        type: Number,
        min: 1,
        max: 100
      },
      numberOfBerths: {
        type: Number,
        min: 1,
        max: 100
      },
      location: { type: String }
    }
  },
  available: {
    type: Boolean,
    default: true
  }
}));

function validateShip(ship) {
  const schema = {
    name: Joi.string().min(3).max(25).required(),
    model: Joi.string().min(3).max(50).required(),
    type: Joi.string().valid('besar', 'sedang', 'kecil').required(),
    price: Joi.number().min(0).max(1000000000).required(),
    yearOfManufactured: Joi.date().format('YYYY-MM-DD'),
    lengthOverall: Joi.number().min(3).max(1000),
    beam: Joi.number().min(1).max(250),
    draft: Joi.number().min(1).max(250),
    displacement: Joi.number().min(5).max(2000),
    engine: Joi.string(),
    fuel: Joi.string().valid('diesel', 'electric', 'gas', 'gasoline', 'steam'),
    fuelCapacity: Joi.number().min(20).max(10000),
    maximumSpeed: Joi.number().min(10).max(200),
    cruisingSpeed: Joi.number().min(10).max(200),
    numberOfCabins: Joi.number().min(1).max(100),
    numberOfBerths: Joi.number().min(1).max(100),
    location: Joi.string(),
    available: Joi.boolean()
  };

  return Joi.validate(ship, schema);
};

exports.Ship = Ship
exports.validate = validateShip