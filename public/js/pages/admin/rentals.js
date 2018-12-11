rentData = null;
let userRentData = null;

async function rentReq() {
  const myInit = {
    method: 'GET',
    cache: 'default'
  }
  const response = await fetch('/api/rentals', myInit)
  rentData = await response.json();
}

async function confirmRent(idRental) {
  const myInit = {
    method: 'PUT',
    cache: 'default',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isPaid: true }),
    referrer: "no-referrer"
  }
  const response = await fetch('/api/rentals/' + idRental, myInit)
  const json = await response.json();
  location.reload(true)
}

async function closeRent(idRental) {
  const myInit = {
    method: 'PUT',
    cache: 'default',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isActive: false }),
    referrer: "no-referrer"
  }
  const response = await fetch('/api/rentals/' + idRental, myInit)
  const json = await response.json();
  location.reload(true)
}

async function delRent(idRental) {
  const myInit = {
    method: 'DELETE',
    cache: 'default',
    headers: { "Content-Type": "application/json" },
    referrer: "no-referrer"
  }
  const response = await fetch('/api/rentals/' + idRental, myInit)
  const json = await response.json();
  location.reload(true)
}

function loadRent() {
  let rental = document.getElementById('rental-body');
  for (let i in rentData) {

    dataRow = `
      <tr>
        <td>
          <a href="${upLevel}myaccount/rentals/${rentData[i]._id}">
            <p>${rentData[i].user.email}</p>
          </a>
        </td>
        <td>
            ${(rentData[i].isPaid === false && rentData[i].isActive === true? '<p>Belum bayar</p><button onclick="confirmRent(\''+rentData[i]._id+'\')" class="btn btn-small waves-light waves-effect" id="btnConfirm">konfirmasi</button>': '<p class="">Selesai...</p>')}
        </td>
        <td>
          ${(rentData[i].isActive?'<p>Aktif..</p><button onclick="closeRent(\''+rentData[i]._id+'\')" class="btn btn-small waves-light waves-effect" id="btnConfirm">tutup</button>':'Selesai...')}
        </td>
        <td>
          ${rentData[i].dateReturned.slice(0,-14)}
        </td>
        <td>
          <button onclick="delRent('${rentData[i]._id}')" class="btn red darken-4" id="btnDel">
            <i class="material-icons")>delete</i>
          </button>

        </td>
      </tr>
      `;
    rental.insertAdjacentHTML('beforeend', dataRow)
  }
}

document.addEventListener('DOMContentLoaded', async function() {
  await rentReq();
  await loadRent();
});