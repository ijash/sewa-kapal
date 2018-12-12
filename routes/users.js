const auth = require('../middleware/auth'); //authorization
const bcrypt = require('bcrypt')
const _ = require('lodash');
const { User, validate } = require('../models/user');
const { Rental } = require('../models/rental');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
})


router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({$or:[{ email: req.body.email },{ phone: req.body.phone }]});
  if (user) return res.status(400).send('Phone/email already registered');

  user = new User(_.pick(req.body, ['name', 'email', 'password', 'phone', 'address']))
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email'])); 
});
//buat ngambil daftar rental user
router.get('/rents', auth, async (req, res) => {
  const user = await User.findById(req.user).select('-password -__v');
  const rents = await Rental.find({'user.email': user.email}).select(' -__v');
  
  res.send(rents);
})



module.exports = router;