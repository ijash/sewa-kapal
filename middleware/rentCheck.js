const {Rental} = require('../models/rental');
const {Ship} = require('../models/ship');
const mongoose = require('mongoose');
const Fawn = require('fawn');

Fawn.init(mongoose,'fawn_rentals');

module.exports = async function auth(req, res, next) {
  const rentals = await Rental.find().sort('-dateOut');
  try {
    for (i in rentals) {
      // console.log(i + ' rental ' + rentals[i].ship.name + ' nih.....')
      let timeNow = new Date(Date.now())
      let paymentTimeLimit = new Date(rentals[i].dateOut.getTime() + 86400000)
      let remainingTime = new Date(paymentTimeLimit.getTime() - timeNow.getTime())
      // console.log(i + ' remaining pembayaran(ms)' + ' : ' + remainingTime.getTime())
      if (rentals[i].isActive) {
        let ship = await Ship.findById(rentals[i].ship._id)
        // console.log(i + ' rental aktif : ' + rentals[i].isActive + ' statusnya...');
        if (!ship.available) {
          // console.log(i + ' rental ' + rentals[i].ship.name + ' udah lewat, segera di proses...');
          if (remainingTime.getTime() < 0) {
            if (!rentals[i].isPaid) {
              try {
                new Fawn.Task()
                  .update('rentals', {_id: rentals[i]._id}, {$set: {isActive: false}})
                  .update('ships', {_id: ship._id}, {$set: {available: true}})
                  .run()
                  .then(()=>{console.log('rental: '+rentals[i]._id+' cancelled..')});
              } catch (ex) {
                console.error(ex)
                next(ex)
              };
            };
          };
        }
        else {
          throw new Error('rental was booked but ship is still available...');
        };
      };
    };
  } catch (err) {
    next(err)
    console.error(err)
  };
  next();
}