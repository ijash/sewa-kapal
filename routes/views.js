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
router.get('/error/:code', async (req, res) => {
  statusCodeList = {
    301: 'Moved Permanently',
    400: 'Bad Request',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    501: 'Not Implemented'
  };
  let currentStatus = req.params.code
  if (!statusCodeList[req.params.code]) currentStatus = '501' ,req.query.details = `${req.params.code} status code is not implemented yet`
  if (!req.query.details) req.query.details = "we're not sure what was just happened..."
  res.status(req.params.code).render('./error',{
    status:currentStatus,
    statusDefinition:statusCodeList[currentStatus] ,
    errorDetails:req.query.details,
    judul:judulWebsite,
    colorTheme: temaWarna
  });
});

module.exports = router;