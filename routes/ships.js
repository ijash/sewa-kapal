const mongoose = require('mongoose');
const express = require('express');
const { Ship, validate } = require('../model/ship');
const router = express.Router();

router.get('/', async (req, res) => {
  const ship = await Ship.find().sort('name');
  res.send(ship);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body)
  // 400 bad request
  if (error) return res.status(400).send(error.details[0].message);

  const ship = new Ship({
    name: req.body.name,
    model: req.body.model,
    type: req.body.type,
    price: req.body.price,
    detail: {
      yearOfManufactured: req.body.yearOfManufactured,
      lengthOverall: req.body.lengthOverall,
      beam: req.body.beam,
      location: req.body.location
    },
    available: req.body.available
  });
  await ship.save();

  res.send(ship);
});

router.delete('/:id', async (req, res) => {
  const ship = await Ship.findByIdAndDelete(req.params.id);
  // 404 not found
  if (!ship) return res.status(404).send('Id not found.');

  res.send(ship);
})

module.exports = router;