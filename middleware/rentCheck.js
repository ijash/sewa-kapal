const {Rental} = require('../models/rental');
const {Ship} = require('../models/ship');

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
        rentals[i].isActive = false;
        if (remainingTime.getTime() < 0) {
          // console.log(i + ' rental ' + rentals[i].ship.name + ' udah lewat, segera di proses...');
          if (!rentals[i].isPaid) {
            let ship = await Ship.findById(rentals[i].ship._id)
            if (!ship.available) {
              ship.available = true;
              await ship.save();
            } else {
              throw new Error('rental was booked but ship is still available...');
            };
          };
        };
      };
    };
  } catch (err) {
    res.status(500).send('internal server error..')
    console.log(err)
  };
  next();
}