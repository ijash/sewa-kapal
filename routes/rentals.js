// Atur 24H cancellation logic


const auth = require('../middleware/auth');
const {Rental, validate, cleanNullValue} = require('../models/rental'); 
const {Ship} = require('../models/ship'); 
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

Fawn.init(mongoose);

router.get('/', auth, async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
});

router.post('/', async (req, res) => {//nanti kasi auth middleware
  let rentDate = new Date(Date.now())
  let retDate = new Date(req.body.dateReturned)

  const { error } = validate(req.body); 
  if (error) return res.redirect("../error/400?details=Error: "+error.details[0].message);
  
  const ship = await Ship.findById(req.body.shipId);
  if (!ship) return res.redirect("../error/400?details=Invalid ship.....");

  //rental fee Calculation IFFE
  rentalFeeResult = (()=>{
    let diffDays = Math.round(Math.abs((rentDate.getTime() - retDate.getTime())/(86400000/*one day in ms*/)));
    return diffDays * ship.price
  })();

  console.log(rentalFeeResult)
  let rental = new Rental({ 
    customer: {
      name: req.body.custName,
      deliveryLocation: req.body.deliveryLocation,
      phone: req.body.phone
    },
    ship: {
      _id: ship._id,
      name: ship.name,
      model: ship.model,
      price: ship.price,
      picture: ship.picture
    },
    dateOut: rentDate,
    dateReturned: retDate,
    rentalFee: rentalFeeResult,
    isPaid: false

  });
  // Atur 24H cancellation logic...
  try {
    new Fawn.Task()
      .save('rentals', rental)
      .update('ships', { _id: ship._id }, { 
        $set: { available: false }
      })
      .run();
  
    res.send(rental);
  }
  catch(ex) {
    res.status(500).send('Something failed.');
  }

});

module.exports = router;