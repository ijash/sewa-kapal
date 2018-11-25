
today = new Date() ;
today.year = today.getFullYear();
today.month = today.getMonth();
today.date = today.getDate();

(function($) {
  $(function() {

    $('.sidenav').sidenav();
    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space
$(document).ready(function() {
  $('.modal').modal();
});

$(document).ready(function() {
  $('select').formSelect();
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

  } else {
    authStatus = document.getElementById('authStatus');
    authStatus.href = '/myaccount'
    authStatus.innerText = userData.name
    authStatusMobile = document.getElementById('authStatusMobile');
    authStatusMobile.href = '/myaccount'
    authStatusMobile.innerText = userData.name
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

$(document).ready(function(){
  $('.tooltipped').tooltip();
});
//number formatter
const currencyFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'IDR'
})


$(document).ready(function(){
  $('.carousel').carousel();
});