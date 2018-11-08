const mongoose = require('mongoose');
const express = require('express');
const _ = require('lodash');
const { Ship, validate } = require('../models/ship');
const router = express.Router();

router.get('/', async (req, res) => {
  const ship = await Ship.find().sort('name');
  res.send(ship); // kasih view atau ganti ke pug
});

router.post('/', async (req, res) => { // tambahin auth untuk admin
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message);

  const ship = new Ship({
    name: req.body.name,
    model: req.body.model,
    type: req.body.type,
    price: req.body.price,
    available: req.body.available,
    details: {
      yearOfManufactured: req.body.yearOfManufactured,
      lengthOveral: req.body.lengthOveral,
      beam: req.body.beam,
      draft: req.body.draft,
      displacement: req.body.displacement,
      engine: req.body.engine,
      fuel: req.body.fuel,
      fuelCapacity: req.body.fuelCapacity,
      maximumSpeed: req.body.maximumSpeed,
      cruisingSpeed: req.body.cruisingSpeed,
      numberOfCabins: req.body.numberOfCabins,
      numberOfBerths: req.body.numberOfBerths,
      location: req.body.location
    }
  })

  await ship.save();

  res.send(ship); // kasih view atau ganti ke pug
});

router.put('/:id', async (req, res) => { // tambahin auth untuk admin
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message);

  function updating(param) {
    if (!param) return Ship.$unset = undefined
    else {
      return param;
    }
  }

  const ship = await Ship.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    model: req.body.model,
    type: req.body.type,
    price: req.body.price,
    available: req.body.available,
    details: {
      yearOfManufactured: req.body.yearOfManufactured,
      lengthOveral: req.body.lengthOveral,
      beam: req.body.beam,
      draft: req.body.draft,
      displacement: updating(req.body.displacement),
      engine: req.body.engine,
      fuel: req.body.fuel,
      fuelCapacity: req.body.fuelCapacity,
      maximumSpeed: req.body.maximumSpeed,
      cruisingSpeed: req.body.cruisingSpeed,
      numberOfCabins: req.body.numberOfCabins,
      numberOfBerths: req.body.numberOfBerths,
      location: req.body.location
    }
  }, { new: true });

  if (!ship) return res.status(404).send('Id not found.');

  res.send(ship);
});

router.delete('/:id', async (req, res) => { // tambahin auth untuk admin
  const ship = await Ship.findByIdAndDelete(req.params.id);
  if (!ship) return res.status(404).send('Id not found.');

  res.send(ship);
});

module.exports = router;