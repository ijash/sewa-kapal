const upLevel = '../../'
loadBoatData()

async function loadBoatData() {
  const myInit = {
    method: 'GET',
    cache: 'default'
  }
  const response = await fetch("/api/ships", myInit)
  const boatData = await response.json();
  document.addEventListener('DOMContentLoaded', renderData(boatData));
}

async function setStatus(idBoat){
  const myInit = {
    method: 'PUT',
    cache: 'default' ,
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({available: true}),
    referrer: "no-referrer"
    }
  const response = await fetch('/api/ships/'+idBoat,myInit)
  const json = await response.json();
  location.reload(true)
}

async function delBoat(idBoat){
  const myInit = {
    method: 'DELETE',
    cache: 'default' ,
    headers: {"Content-Type": "application/json"},
    referrer: "no-referrer"
    }
  const response = await fetch('/api/rentals/'+idBoat,myInit)
  const json = await response.json();
  location.reload(true)
}

function renderData(data){
  const boatData = data;

    let rental = document.getElementById('kapal-body');
    for (let i in boatData) {
  
      dataRow = `
        <tr>
          <td> 
            <a href="${upLevel}categories/${boatData[i]._id}">
              <p>${boatData[i].name}</p>
            </a>
          </td>
          <td>
              ${(boatData[i].available? '<p>Tersedia di dermaga</p>':'Tidak Aktif / Maintenance..<span style="padding-right:30px;"></span><button onclick="setStatus(\''+boatData[i]._id+'\')" class="btn btn-small waves-light waves-effect" id="btnConfirm">Aktifkan</button>') } 
          </td>
          <td>
            <button onclick="delBoat('${boatData[i]._id}')" class="btn red darken-4" id="btnDel">
              <i class="material-icons")>delete</i>
            </button>
            
          </td>
        </tr>
        `;
        rental.insertAdjacentHTML('beforeend', dataRow)
    }
}

