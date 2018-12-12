
//supaya formnya ga redirect
document.getElementById("formUser").addEventListener("click", function(event){
  event.preventDefault()
});


function getForm() {
  return {
    name: document.getElementById('inp_name').value,
    email: document.getElementById('inp_email').value,
    password: document.getElementById('inp_password').value,
    phone: document.getElementById('inp_phone').value,
    address: document.getElementById('inp_address').value
  }
};
async function postUser() {
  
  let url = 'api/users'
  let userForm = getForm();
  let payload = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json; charset=utf-8",
    },
    referrer: "no-referrer",
    body: JSON.stringify(userForm)
  }
  try {
    let response = await fetch('../api/users/', payload);
    if (!response.ok){
      throw await response.text();
    }
    else{
      let json = await response.json();
      alert('hi '+json.name+', Thank you for registering! Please login to continue')
      window.location.href = "../";
    }

  } catch (ex) { 
    alert(ex);
    
  }
}
function aaaaa(){
  fetch('../api/users/', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json; charset=utf-8",
    },
    referrer: "no-referrer",
    body: JSON.stringify(getForm())
  });
}
