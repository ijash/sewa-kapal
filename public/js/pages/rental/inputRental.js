let shipData = null;

async function shipReq() {
  const myInit = {
    method: 'GET',
    cache: 'default'
  }
  const response = await fetch('/api/ships/' + shipId, myInit)
  shipData = await response.json();
  document.getElementById('shipValueId').value = shipData._id;
  document.getElementById('userDataId').value = userData._id;
}


let dateString = null;
let inpDate = null;

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.datepicker');
  var instances = M.Datepicker.init(elems, {
    format: 'yyyy-mm-dd',
    maxDate: new Date(today.year + 3, today.month, today.date + 2),
    minDate: new Date(today.year, today.month, today.date + 2),
    setDefaultDate: true,
    defaultDate: new Date(Date.now()),
    yearRange: [today.year, today.year + 3]
  });
  document.getElementById('tglKembali').addEventListener("change", rentalFeeCalc);


});

function rentalFeeCalc() {
  dateString = document.getElementById('tglKembali').value
  inpDate = new Date(dateString.match(/^(\d)+/)[0], (parseInt(dateString.match(/(?<=-)(\d)+(?=-)/)[0]) - 1), dateString.match(/(?<=-)(\d+)$/)[0]);
  let diffDays = Math.round(Math.abs((inpDate.getTime() - today.getTime()) / (86400000 /*one day in ms*/ )));

  document.getElementById('priceLabel').innerHTML = currFormat(diffDays * shipData.price)
};

document.addEventListener('DOMContentLoaded', async function() {
  await shipReq();
  await rentalFeeCalc();
});