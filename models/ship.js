const BaseJoi = require('joi');
const Extension = require('joi-date-extensions')
const Joi = BaseJoi.extend(Extension)
const mongoose = require('mongoose');

const Ship = mongoose.model('Ships', new mongoose.Schema({
  picture: {
    type: String,
    required: true,
    maxlength: 4096
  },
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
  available: {
    type: Boolean,
    default: true
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
        max: 2000000
      },
      engine: {
        type: String,
        minlength: 3,
        maxlength: 50
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
      }
    }
  }
}));

function validateShip(ship) {
  const schema = {
    picture: Joi.string(),
    name: Joi.string().min(3).max(25).required(),
    model: Joi.string().min(3).max(50).required(),
    type: Joi.string().valid('besar', 'sedang', 'kecil').required(),
    price: Joi.number().min(0).max(1000000000000).required(),
    available: Joi.boolean(),
    yearOfManufactured: Joi.date().format('YYYY-MM-DD').required(),
    lengthOverall: Joi.number().min(3).max(1000).allow(null).allow(''),
    beam: Joi.number().min(1).max(250).allow(null).allow(''),
    draft: Joi.number().min(1).max(250).allow(null).allow(''),
    displacement: Joi.number().min(5).max(2000000).allow(null).allow(''),
    engine: Joi.string().min(3).max(50).allow(null).allow(''),
    fuel: Joi.string().valid('diesel', 'electric', 'gas', 'gasoline', 'steam').allow(null).allow(''),
    fuelCapacity: Joi.number().min(20).max(10000).allow(null).allow(''),
    maximumSpeed: Joi.number().min(10).max(200).allow(null).allow(''),
    cruisingSpeed: Joi.number().min(10).max(200).allow(null).allow(''),
    numberOfCabins: Joi.number().min(1).max(100).allow(null).allow(''),
    numberOfBerths: Joi.number().min(1).max(100).allow(null).allow('')
  };

  return Joi.validate(ship, schema);
};

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

exports.cleanNullValue = cleanNullValue
exports.Ship = Ship
exports.validate = validateShip