//Rental data Ajax
let userRentalRequest = new XMLHttpRequest();
let userRentData = null;
userRentalRequest.open('GET', '/api/users/rents');
userRentalRequest.onload = function () {
  userRentData = JSON.parse(userRentalRequest.responseText);
  //sort to recent
  userRentData.sort(function(a, b) {
    a = new Date(a.dateOut);
    b = new Date(b.dateOut);
    return a>b ? -1 : a<b ? 1 : 0;
  });
  
}
userRentalRequest.send();

//write user data to field
addLoadEvent(() => {
  document.getElementById('nama').firstChild.textContent = userData.name;
  document.getElementById('telpon').firstChild.textContent = userData.phone;
  document.getElementById('email').firstChild.textContent = userData.email;
  document.getElementById('alamat').firstChild.textContent = userData.address;
  if (userData.isAdmin){
    let adminLink = document.getElementById('nama')
    adminLink.insertAdjacentHTML('beforeend',`<a href="/admin" class="btn btn-small waves-effect waves-light btn" style="float:right">Admin Menu</a>`)
  }
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
      itemPesanan = `
        <a href="/myaccount/rentals/${userRentData[i]._id}" class="collection-item">
          <li>
            <span class="badge ${(userRentData[i].isActive ? 'new"data-badge-caption="& aktif" ' : '"data-badge-caption="& sudah lewat"')}>
              ${(userRentData[i].isPaid? 'Sudah bayar': 'Belum bayar')}
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