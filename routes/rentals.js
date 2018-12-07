const auth = require('../middleware/auth');
const rentCheck = require('../middleware/rentCheck');
const { Rental, validate,} = require('../models/rental');
const { Ship } = require('../models/ship');
const { User } = require('../models/user');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

Fawn.init(mongoose);

router.get('/', auth, rentCheck, async (req, res) => {//tambahin is admin nanti
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
});

router.get('/:rentId', auth, rentCheck, async (req, res) => {//tambahin is admin nanti
  const rental = await Rental.findById(req.params.rentId).sort('-dateOut');
  if (!rental) return res.status(404).send('The rental with the given ID was not found.');
  res.send(rental);
});

router.delete('/:rentId', auth, rentCheck, async (req, res) => {//tambahin is admin nanti
  //UNFINISHED
  const rental = await Rental.findById(req.params.rentId).sort('-dateOut');
  if (!rental) return res.status(404).send('The rental with the given ID was not found.');
  res.send(rental);
});

router.put('/:rentId', auth, rentCheck, async (req, res) => {//tambahin is admin nanti
  //UNFINISHED
  const rental = await Rental.findById(req.params.rentId).sort('-dateOut');
  if (!rental) return res.status(404).send('The rental with the given ID was not found.');
  res.send(rental);
});

router.post('/', async (req, res) => {//nanti kasi auth middleware
  let rentDate = new Date(Date.now())
  let returnDate = new Date(req.body.dateReturned)
  
  const { error } = validate(req.body);
  if (error) return res.redirect("../error/400?details=Error: " + error.details[0].message);
  
  const ship = await Ship.findById(req.body.shipId);
  if (!ship) return res.redirect("../error/400?details=Invalid ship.....");

  const user = await User.findById(req.body.userId);//kayaknya salah, harusnya ambil di JWT
  if (!user) return res.redirect("../error/400?details=Invalid user.....");

  rentalFeeResult = (() => {
    let diffDays = Math.round(Math.abs((rentDate.getTime() - returnDate.getTime()) / 86400000/*one day in ms*/));
    return diffDays * ship.price
  })();
  
  
  let rental = new Rental({
    user: {
      name: user.name,
      email: user.email
    },
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
    dateReturned: returnDate,
    rentalFee: rentalFeeResult,
    isPaid: false

  });
  // Atur 24H cancellation logic... & masih error duplikat
  try {
    new Fawn.Task()
      .save('rentals', rental)
      .update('ships', { _id: ship._id }, {
        $set: { available: false }
      })
      .run();
    
    // res.status(201).send(rental);
    res.redirect('../../../myaccount/rentals/'+rental.id)
  }
  catch (ex) {
    res.status(500).send('something failed..');
  }

});

module.exports = router;