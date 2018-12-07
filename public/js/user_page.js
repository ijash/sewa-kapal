//Rental data Ajax
let userRentalRequest = new XMLHttpRequest();
let userRentData = null;
userRentalRequest.open('GET', '/api/users/rents');
userRentalRequest.onload = function () {
  userRentData = JSON.parse(userRentalRequest.responseText);
}
userRentalRequest.send();

//write user data to field
addLoadEvent(() => {
  document.getElementById('nama').firstChild.textContent = userData.name;
  document.getElementById('telpon').firstChild.textContent = userData.phone;
  document.getElementById('email').firstChild.textContent = userData.email;
  document.getElementById('alamat').firstChild.textContent = userData.address;
});

// write user's rent data
addLoadEvent(() => {
  if ((userRentData.length == 0)) console.log('no data');
  else {

    let pesanan = document.getElementById('pesanan');
    pesanan.insertAdjacentHTML('beforebegin', `<br/><h4 class="center">Pesanan Saya</h4><br/>`);
    pesanan.insertAdjacentHTML('beforeend', `<ul class="collection container z-depth-4"></ul>`);
    pesanan = pesanan.firstChild;

    for (let i in userRentData) {
      let paymentStatus = () => {
        if (userRentData[i].isPaid) {
          return 'Sudah bayar';
        } else {
          return 'Belum bayar'
        }
      }
      let activeRental = ()=>{
        if (userRentData[i].isActive) return 'new"data-badge-caption="- Aktif" ';
        else return '"data-badge-caption="- sudah lewat"'
      }
      itemPesanan = `
        <a href="/myaccount/rentals/${userRentData[i]._id}" class="collection-item">
          <li>
            <span class="badge ${activeRental()}>
              ${paymentStatus()}
            </span>
            <span style="font-weight: bold;">
            ${userRentData[i].ship.name}
            </span>
          </li>
        </a>
      `
      pesanan.insertAdjacentHTML('beforeend', itemPesanan)
    };
  };
});

// logout function
let btnLogout = document.getElementById('logout')
btnLogout.addEventListener("click",function(){
  window.location.replace('api/auth/logout');
  });