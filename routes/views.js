const pug = require('pug');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {

  res.render('./home/index',{
  // res.render('./home/template-materialize',{
    judul:"SHIPYRD",
    kategoriKapal:"#",
    registrasi:"#",
    loginAction: "#"
  });
});

module.exports = router;