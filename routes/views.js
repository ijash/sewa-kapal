const pug = require('pug');
const express = require('express');
const router = express.Router();

let defaultSiteValues = {
    judul:'B.E.B.E.',
    kategoriKapal:"#",
    registrasi:"/register",
    loginAction: "/api/auth",
    colorTheme: 'blue'
  }

router.get('/', async (req, res) => {
  const pageVariables = Object.assign(defaultSiteValues,{
  });
  res.render('./home/index',pageVariables);
});

router.get('/register', async (req, res) => {
  const pageVariables = Object.assign(defaultSiteValues,{
    regisAction: "/api/users/"
  });
  res.render('./register',pageVariables);
});

router.get('/error/:code', async (req, res) => {
  let currentStatus = req.params.code
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

  
  if (!statusCodeList[req.params.code]) currentStatus = '501' ,req.query.details = `${req.params.code} status code is not implemented yet`
  if (!req.query.details) req.query.details = "we're not sure what was just happened..."
  
  const pageVariables = Object.assign(defaultSiteValues,{
    status:currentStatus,
    statusDefinition:statusCodeList[currentStatus] ,
    errorDetails:req.query.details
  });

  res.status(req.params.code).render('./error',pageVariables);
});

module.exports = router;