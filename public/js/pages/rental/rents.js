let rentData = null;

async function getRent(rentId) {
  const myInit = {
    method: 'GET',
    cache: 'default'
  }
  const rentHttpReq = await fetch('/api/rentals/' + rentId, myInit)
  rentData = await rentHttpReq.json();
}

// Set the date we're counting down to
let countDownDate = new Date().getTime();
// Update the count down every 1 second
let x = setInterval(function() {
  // Get todays date and time
  const now = new Date().getTime();
  // Find the distance between now and the count down date
  let distance = countDownDate - now;
  // Time calculations for days, hours, minutes and seconds
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  // Output the result in an element with id="demo"
  document.getElementById("bayar").firstChild.textContent = (rentData.isPaid ? 'Sudah dibayar' : days + "d " + hours + "h " + minutes + "m " + seconds + "s ");
  // If the count down is over, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("bayar").firstChild.textContent = "Waktu bayar habis";
  }
}, 1000);

function loadRent() {
  document.getElementById('customer').firstChild.textContent = rentData.customer.name;
  document.getElementById('alamat').firstChild.textContent = rentData.customer.deliveryLocation;
  document.getElementById('biaya').firstChild.textContent = currFormat(rentData.rentalFee) + (rentData.isPaid ? '  (Lunas)' : '  (Belum dibayar)');
  document.getElementById('kapal').firstChild.textContent = rentData.ship.name;
  document.getElementById("kapal").href = "../../categories/" + rentData.ship._id;
  document.getElementById('phone').firstChild.textContent = rentData.customer.phone;
  document.getElementById('pengembalian').firstChild.textContent = rentData.dateReturned.slice(0, -14);
  countDownDate = new Date(rentData.dateOut).getTime() + 86400000;
};

document.addEventListener('DOMContentLoaded', async function() {
  await getRent(myRentId);
  await loadRent();
});