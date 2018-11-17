const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


let defaultSiteValues = {
  judul: 'SEWAKAPAL',
  kategoriKapal: '/categories',
  registrasi: "/register",
  loginAction: "/api/auth",
  colorTheme: 'teal lighten-1',
  about: '/about'
  // userAuthStatus: req.header('x-auth-token')
}
//nanti hapus
router.get('/template', async (req, res) => {
  const pageVariables = Object.assign(defaultSiteValues, {});
  res.render('./home/template-materialize', pageVariables);

});

router.get('/', async (req, res) => {
  const pageVariables = Object.assign(defaultSiteValues, {});
  res.render('./home/index', pageVariables);
  
  
});

router.get('/myaccount', auth, async (req, res) => {
  const pageVariables = Object.assign(defaultSiteValues, {});
  res.render('./user/account', pageVariables);
});

router.get('/about', async (req, res) => {
  const pageVariables = Object.assign(defaultSiteValues, {});
  res.render('./home/about', pageVariables);

});

router.get('/categories', async (req, res) => {
  const pageVariables = Object.assign(defaultSiteValues, {});
  res.render('./home/categories', pageVariables);

});

router.get('/register', async (req, res) => {
  const pageVariables = Object.assign(defaultSiteValues, {
    regisAction: "/api/users/"
  });
  res.render('./home/register', pageVariables);
});

router.get('/home/error/:code', async (req, res) => {
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

  if (!statusCodeList[req.params.code]) currentStatus = '501', req.query.details = `${req.params.code} status code is not implemented yet`
  if (!req.query.details) req.query.details = "we're not sure what was just happened..."

  const pageVariables = Object.assign(defaultSiteValues, {
    status: currentStatus,
    statusDefinition: statusCodeList[currentStatus],
    errorDetails: req.query.details
  });

  res.status(req.params.code).render('./error', pageVariables);
});

router.get('/admin/ships', async (req, res) => {
  const pageVariables = Object.assign(defaultSiteValues, {
    inputKapal: "/api/ships"
  });
  res.render('./admin/ships', pageVariables);
});

module.exports = router;