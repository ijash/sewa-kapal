async function shipReq() {
  const myInit = {
    method: 'GET',
    cache: 'default'
  }
  const response = await fetch('/api/ships', myInit)
  shipData = await response.json();
}

function loadShip() {
  let row = document.getElementById('row');
  let htmlColor = "#{colorThemeText}";
  let edit = "#{edit}";

  for (i in shipData) {
    row.insertAdjacentHTML("afterbegin",
      `<div class="col s3" style="min-width: 15em;">
      <div class="card z-depth-2">
        <div class="card-image waves-effect waves-block waves-light">

            <img class="activator responsive-img" id="gambar" src="/" alt="Boat" onerror="this.onerror=null;this.src='/public/img/site/noshippic.png';" style="width:100%;height:14.8em;object-fit: cover;" />

        </div>
        <div class="card-content">
        <span class="card-title activator ${htmlColor}-text text-darken-4" id="nama"><h5 class="truncate"><p class="flow-text">-</p></h5></span>
          <p><a id="shipId" class="btn ${htmlColor}" href="#">Detail</a></p>
        </div>
        <div class="card-reveal"><span class="card-title ${htmlColor}-text text-darken-4" id="model">-<i class="material-icons right">close</i></span>
          <p class="${htmlColor}-text text-darken-4" id="tipe">-</p>
          <p class="${htmlColor}-text text-darken-4" id="harga">-</p>
          <p class="${htmlColor}-text text-darken-4" id="tanggalPembuatan">-</p>
          <p class="${htmlColor}-text text-darken-4" id="panjangKapal">-</p>
        </div>
      </div>
    </div>`);

    document.getElementById('shipId').href = "categories/" + shipData[i]._id;
    document.getElementById('gambar').src = shipData[i].picture;
    document.getElementById('nama').firstChild.textContent = shipData[i].name;
    document.getElementById('model').firstChild.textContent = shipData[i].model;
    document.getElementById('tipe').firstChild.textContent = `Tipe Kapal: ${shipData[i].type}`;
    document.getElementById('harga').firstChild.textContent = `Harga Kapal: ${shipData[i].price}`;
    document.getElementById('tanggalPembuatan').firstChild.textContent = `Tanggal Pembuatan: ${shipData[i].details.yearOfManufactured}`;
    document.getElementById('panjangKapal').firstChild.textContent = `Panjang Kapal: ${shipData[i].details.lengthOverall}`
  }
}

document.addEventListener('DOMContentLoaded', async function() {
  await shipReq();
  await loadShip();
});