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

let currentYear = new Date

$(document).ready(function() {
  $('.datepicker').datepicker({
    format: 'yyyy-mm-dd',
    maxDate: new Date(Date.now()),
    setDefaultDate: true,
    defaultDate: new Date(Date.now()),
    yearRange: [1970, currentYear.getFullYear()]
  });
});