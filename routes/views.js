const pug = require('pug');
const express = require('express');
const router = express.Router();

judulWebsite = 'SEWAKAPAL'
temaWarna = 'blue'
router.get('/', async (req, res) => {

  res.render('./home/index',{
  // res.render('./home/template-materialize',{
    judul:judulWebsite,
    kategoriKapal:"#",
    registrasi:"/register",
    loginAction: "/api/auth",
    colorTheme: temaWarna
  });
});

router.get('/register', async (req, res) => {

  res.render('./register',{
  // res.render('./home/template-materialize',{
    judul:judulWebsite,
    kategoriKapal:"#",
    regisAction: "/api/users/",
    registrasi:"/register",
    loginAction: "/api/auth",
    colorTheme: temaWarna
  });
});

module.exports = router;