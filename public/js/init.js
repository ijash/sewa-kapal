//main variables
let userData = null;

let today = new Date();
today.year = today.getFullYear();
today.month = today.getMonth();
today.date = today.getDate();

//Function Declarations
// auth user
async function authUser() {
  const myInit = {
    method: 'GET',
    cache: 'default',
    credentials: "same-origin"
  }
  if (!(document.cookie.indexOf('x_auth_token') < 0)) {
    try {
      const response = await fetch('/api/users/me', myInit);
      userData = await response.json();
    } catch (ex) {
      console.log(ex);
    }
  }
}

//Materialize Init
function materializeInit() {
  M.Parallax.init(document.querySelectorAll('.parallax'));
  M.Sidenav.init(document.querySelectorAll('.sidenav'));
  M.Modal.init(document.querySelectorAll('.modal'));
  M.FormSelect.init(document.querySelectorAll('select'));
  M.Tooltip.init(document.querySelectorAll('.tooltipped'), {
    outDuration: 250,
    enterDelay: 500
  });
  M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'));
  M.Carousel.init(document.querySelectorAll('.carousel'));
}

function changeAuthStatus() {
  if (!userData) {
    console.log('please login...')
  } else {
    authStatus = document.getElementById('authStatus');
    authStatus.href = '/myaccount';
    authStatus.innerText = userData.name
    authStatusMobile = document.getElementById('authStatusMobile');
    authStatusMobile.href = '/myaccount';
    authStatusMobile.innerText = userData.name;
  }
}

function currFormat(value) {
  const currencyFormat = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    currencyDisplay: 'symbol'
  });
  if (!value) return 'Unavailable';
  else return currencyFormat.format(value);
}

function numFormat(value, optionalSuffix) {
  const numberFormat = new Intl.NumberFormat('id-ID', {
    style: 'decimal',
    useGrouping: true
  });
  optionalSuffix = optionalSuffix || ''
  if (!value) return '(unavailable)';
  else return numberFormat.format(value) + optionalSuffix;
}

document.addEventListener('DOMContentLoaded', async function() {
  await authUser();
  await materializeInit();
  await changeAuthStatus();
});