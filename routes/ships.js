const express = require('express');
const _ = require('lodash');
const { cleanNullValue, Ship, validate } = require('../models/ship');
const router = express.Router();

router.get('/', async (req, res) => {
  const ship = await Ship.find().sort('name');
  res.send(ship); // kasih view atau ganti ke pug
});

router.post('/', async (req, res) => { // tambahin auth untuk admin
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message);

  let query = {
    name: req.body.name,
    model: req.body.model,
    type: req.body.type,
    price: req.body.price,
    available: req.body.available,
    details: {
      yearOfManufactured: req.body.yearOfManufactured,
      lengthOverall: req.body.lengthOverall,
      beam: req.body.beam,
      draft: req.body.draft,
      displacement: req.body.displacement,
      engine: req.body.engine,
      fuel: req.body.fuel,
      fuelCapacity: req.body.fuelCapacity,
      maximumSpeed: req.body.maximumSpeed,
      cruisingSpeed: req.body.cruisingSpeed,
      numberOfCabins: req.body.numberOfCabins,
      numberOfBerths: req.body.numberOfBerths
    }
  }
  cleanNullValue(query);

  const ship = new Ship(query);
  ship.save();
  res.send(ship);

});

router.put('/:id', async (req, res) => { // tambahin auth untuk admin
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message);

  let query = {
    name: req.body.name,
    model: req.body.model,
    type: req.body.type,
    price: req.body.price,
    available: req.body.available,
    details: {
      yearOfManufactured: req.body.yearOfManufactured,
      lengthOverall: req.body.lengthOverall,
      beam: req.body.beam,
      draft: req.body.draft,
      displacement: req.body.displacement,
      engine: req.body.engine,
      fuel: req.body.fuel,
      fuelCapacity: req.body.fuelCapacity,
      maximumSpeed: req.body.maximumSpeed,
      cruisingSpeed: req.body.cruisingSpeed,
      numberOfCabins: req.body.numberOfCabins,
      numberOfBerths: req.body.numberOfBerths
    }
  }
  cleanNullValue(query);

  try {
    const ship = await Ship.findOneAndUpdate(req.params.id, query, { new: true, runValidators: true, context: 'query' });

    if (!ship) return res.status(404).send('Id not found.');

    res.send(ship); // view untuk konfirmasi berhasil
  } catch (err) {
    res.send(err.message)
  }
});

router.delete('/:id', async (req, res) => { // tambahin auth untuk admin
  const ship = await Ship.findByIdAndDelete(req.params.id);
  if (!ship) return res.status(404).send('Id not found.');

  res.send(ship); // view untuk konfirmasi berhasil
});

router.get('/:id', async (req, res) => {
  const ship = await Ship.findById(req.params.id);
  if (!ship) return res.status(404).send('Id not found.');

  res.send(ship);
});

module.exports = router;