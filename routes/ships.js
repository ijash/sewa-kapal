const express = require('express');
const rentCheck = require('../middleware/rentCheck');
const _ = require('lodash');
const multer = require("multer");
const { cleanNullValue, Ship, validate } = require('../models/ship');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function(req, file, cb) { // define target path
    cb(null, './public/img/ships');
  },
  filename: function(req, file, cb) {
    cb(null, `${file.originalname}`); // define saved file name
  }
});

const upload = multer({ storage: storage }); // use limit: {fileSize: to define max fileSize}

router.get('/', rentCheck, async (req, res) => {
  const ship = await Ship.find().sort('name');
  res.send(ship);
});

router.get('/devel', rentCheck, async (req, res) => {
  const currShip = 'speed 2'
  const ship = await Ship.find({_id:'5bf06100334dcd4529882990', available: false}).select('name available -_id');
  if(ship.length>0){
    
  }
  console.log()
  res.send(ship); 
});

router.post('/', upload.single("picture"), async (req, res) => { // tambahin auth untuk admin
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message);

  console.log(req.file.path);

  let query = {
    picture: req.file.path,
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

  await ship.save();

  res.send(ship);

});

router.put('/:id', upload.single("picture"), async (req, res) => { // tambahin auth untuk admin
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message);

  let query = {
    picture: req.file.path,
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

router.get('/:id', rentCheck, async (req, res) => {
  const ship = await Ship.findById(req.params.id);
  if (!ship) return res.status(404).send('Id not found.');

  res.send(ship);
});

module.exports = router;