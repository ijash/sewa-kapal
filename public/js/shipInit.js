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

let shipReq = new XMLHttpRequest();
let shipData = null
shipReq.open('GET', '/api/ships');
shipReq.onload = function() {
  shipData = JSON.parse(shipReq.responseText);
}
shipReq.send();

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