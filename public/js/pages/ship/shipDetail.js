let shipData = null

async function shipReq() {
  const myInit = {
    method: 'GET',
    cache: 'default'
  }
  const response = await fetch('/api/ships/' + shipId, myInit)
  shipData = await response.json();
}

function addContent(target, value) {
  if (!value) {
    document.getElementById(target).firstChild.textContent = '-';
  } else document.getElementById(target).firstChild.textContent = value;
}

function populateTable() {

  addContent('judulPage', shipData.name);
  document.getElementById('available').firstChild.textContent = (() => {
    if (shipData.available) return 'Tersedia';
    else {
      document.getElementById('pesanButton').firstChild.remove();
      return 'Tidak Tersedia'
    }
  })();
  addContent('_id', shipData._id);
  addContent('name', shipData.name);
  addContent('model', shipData.model);
  addContent('type', 'Kapal ukuran ' + shipData.type);
  addContent('price', currFormat(shipData.price));
  addContent('yearOfManufactured', shipData.details.yearOfManufactured);
  addContent('lengthOverall', numFormat(shipData.details.lengthOverall, ' m'));
  addContent('beam', numFormat(shipData.details.beam, ' m'));
  addContent('draft', numFormat(shipData.details.draft, ' m'));
  addContent('displacement', numFormat(shipData.details.displacement, ' kg'));
  addContent('engine', shipData.details.engine);
  addContent('fuel', shipData.details.fuel);
  addContent('fuelCapacity', numFormat(shipData.details.fuelCapacity, ' ℓ'));
  addContent('maximumSpeed', numFormat(shipData.details.maximumSpeed, ' km/j'));
  addContent('cruisingSpeed', numFormat(shipData.details.cruisingSpeed, ' km/j'));
  addContent('numberOfCabins', numFormat(shipData.details.numberOfCabins, ' kabin'));
  addContent('numberOfBerths', numFormat(shipData.details.numberOfBerths, ' orang'));

  document.getElementById('gambar').src = '../' + shipData.picture
};

document.addEventListener('DOMContentLoaded', async function() {
  await shipReq();
  await populateTable();
});