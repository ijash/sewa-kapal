const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

let defaultSiteValues = {
  judul: 'SAILINER',
  kategoriKapal: '/categories',
  registrasi: "/register",
  edit: "/admin/ships",
  loginAction: "/api/auth",
  colorTheme: 'teal lighten-1',
  colorThemeText: 'teal',
  about: '/about',
  upPageLevel: ''
}

//nanti hapus
router.get('/template', async (req, res) => {
  const pageVariables = Object.assign(defaultSiteValues, { /*add specific variables here*/ });
  res.render('./home/template-materialize', pageVariables);
});

router.get('/admin', auth, async (req, res) => {
  const pageVariables = Object.assign(defaultSiteValues, { upPageLevel: '../../' });
  res.render('./admin/admin_nav', pageVariables);
});

router.get('/', async (req, res) => {
  const pageVariables = Object.assign(defaultSiteValues, { /*add specific variables here*/ });
  res.render('./home/index', pageVariables);
});

router.get('/myaccount', auth, async (req, res) => {
  const pageVariables = Object.assign(defaultSiteValues, { /*add specific variables here*/ });
  res.render('./user/account', pageVariables);
});

router.get('/myaccount/rentals/:rentId', auth, async (req, res) => {

  const pageVariables = Object.assign(defaultSiteValues, { myRentId: req.params.rentId, upPageLevel: '../../' });
  if (!req.params.rentId) return res.redirect("../error/404?details=There's no such recipt..");
  res.render('./user/rents', pageVariables);
});

router.get('/about', async (req, res) => {
  const pageVariables = Object.assign(defaultSiteValues, { /*add specific variables here*/ });
  res.render('./home/about', pageVariables);

});

router.get('/categories', async (req, res) => {
  const pageVariables = Object.assign(defaultSiteValues, {});
  // masukin kode admin view


  res.render('./home/categories', pageVariables);

});

router.get('/categories/:shipId', async (req, res) => { // nanti kalau sedang di sewa, tombol pesan sekarangnya kehapus
  const pageVariables = Object.assign(defaultSiteValues, { shipId: req.params.shipId, upPageLevel: '../', authLink: '' });
  if (!req.params.shipId) return res.redirect("../error/404?details=We can't find the boat.");
  if (!req.cookies.x_auth_token) { pageVariables.authLink = '#modal_login'; } else {
    pageVariables.authLink = '/categories/' + pageVariables.shipId + '/rent';
  }

  res.render('./home/shipdetail', pageVariables);
});

router.get('/categories/:shipId/rent', auth, async (req, res) => {
  const pageVariables = Object.assign(defaultSiteValues, { shipId: req.params.shipId, upPageLevel: '../../' });
  if (!req.params.shipId) return res.redirect("../error/404?details=We can't find the boat.");
  res.render('./user/inputrental', pageVariables);
});

router.get('/register', async (req, res) => {
  const pageVariables = Object.assign(defaultSiteValues, {
    regisAction: "/api/users/"
  });
  res.render('./home/register', pageVariables);
});

router.get('/error/:code', async (req, res) => {
  let currentStatus = req.params.code
  let statusCodeList = {
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
  console.log(req.url);

  res.status(req.params.code).render('./home/error', pageVariables);
});

router.get('/admin/addboat', auth, async (req, res) => {
  const pageVariables = Object.assign(defaultSiteValues, {
    inputKapal: "/api/ships"
  });
  res.render('./admin/addboat', pageVariables);
});

router.get('/admin/boats', auth, async (req, res) => {
  const pageVariables = Object.assign(defaultSiteValues, {
    boatApi: "/api/ships"
  });
  res.render('./admin/boats', pageVariables);
});

router.get('/admin/rents', auth, async (req, res) => {
  const pageVariables = Object.assign(defaultSiteValues, {
    rentals: "/api/rents",
    upPageLevel: '../'
  });
  res.render('./admin/rentals', pageVariables);
});



module.exports = router;