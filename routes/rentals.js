const auth = require('../middleware/auth');
const {Rental, validate} = require('../models/rental'); 
const {Ship} = require('../models/movie'); 
const {Customer} = require('../models/customer'); 
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

Fawn.init(mongoose);

router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.redirect("../error/400?details=Error: "+error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.redirect("../error/400?details=Invalid customer.....");

  const ship = await Ship.findById(req.body.shipId);
  if (!ship) return res.redirect("../error/400?details=Invalid ship.....");

  let rental = new Rental({ 
    customer: {
      _id: customer._id,
      name: customer.name, 
      phone: customer.phone
    },
    ship: {
      _id: ship._id,
      name: ship.name,
      model: ship.model,
      price: ship.price,
      picture: ship.picture
    }//nanti tambahin date in-out

  });
  try {
    new Fawn.Task()
      .save('rentals', rental)
      .update('movies', { _id: ship._id }, { 
        $set: { available: false }
      })
      .run();
  
    res.send(rental);
  }
  catch(ex) {
    res.status(500).send('Something failed.');
  }

});

