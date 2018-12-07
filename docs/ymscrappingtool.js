//Dirty web scraping on yachtmarket boat page, use the link below for demo and paste the js in dev console. check the boatData object
//https://www.theyachtmarket.com/boats_for_sale/1266474/
let boatData = {};
let information = document.getElementsByClassName('info-row');
for (i in information) {
  try {
    let objKey = information[i].firstElementChild.firstElementChild.innerText;
    let objVal = information[i].firstElementChild.nextElementSibling.innerText;
    boatData[objKey] = objVal;
  } catch (err) {
    console.log('ERROR: ', err.message)
  } finally {
    for (i in information) {
      let objKey = information[i].firstElementChild.firstElementChild.innerText;
      let objVal = information[i].firstElementChild.nextElementSibling.innerText;
      boatData[objKey] = objVal;
    }
  }
}
boatData