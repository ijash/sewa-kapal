today = new Date();
today.year = today.getFullYear();
today.month = today.getMonth();
today.date = today.getDate();

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.parallax');
  var instances = M.Parallax.init(elems);
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
});

// tooltip
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.tooltipped');
  var instances = M.Tooltip.init(elems, {
    outDuration: 250,
    enterDelay: 500
  });
});


document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.dropdown-trigger');
  var instances = M.Dropdown.init(elems);
});

let httpReq = new XMLHttpRequest();
//auth ajax
let userData = null
httpReq.open('GET', '/api/users/me');
httpReq.onload = function() {
  userData = JSON.parse(httpReq.responseText);

}
httpReq.send();


function changeAuthStatus() {
  if (!userData) {

  } 
  else {
    authStatus = document.getElementById('authStatus');
    authStatus.href = '/myaccount';
    authStatus.innerText = userData.name
    authStatusMobile = document.getElementById('authStatusMobile');
    authStatusMobile.href = '/myaccount';
    authStatusMobile.innerText = userData.name;
  }
}

// supaya bisa multiple ajax.
function addLoadEvent(func) {
  let oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}
addLoadEvent(changeAuthStatus);
//number formatter
const currencyFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'IDR'
})


document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.carousel');
  var instances = M.Carousel.init(elems);
});