function $(id){
    return document.getElementById(id);
}
window.onload = ()=>{
    let user = $("username");
    let name = $('name');
    let lastname = $('lastName');
    let birthday = $('birthday');
    let email = $('email');
    let dataUser = JSON.parse(localStorage.getItem("userInfo"));
    user.innerHTML = '<i class="material-icons left">account_circle</i>'+ dataUser.username;
    name.value = dataUser.name;
    lastname.value = dataUser.lastName;
    birthday.value = dataUser.birthday;
    email.value = dataUser.email;

    console.log(dataUser);
}
function update() {
    let dataUser = JSON.parse(localStorage.getItem("userInfo"));
    let data={
        name:$('name').value,
        lastName:$('lastName').value,
        username:dataUser.username,
        email:$('email').value,
        birthday:$('birthday').value,
        sex: $('male').checked,
    },
    params={
        method: "POST", 
        headers: new Headers({'Content-Type': 'application/json'}), 
        body:JSON.stringify(data) 
}
fetch("./../update", params)
.then(resp => resp.json())
.then(data => {
    console.log(data);
  if (data.status==200){
      localStorage.setItem("userInfo",JSON.stringify(data.data));
      location.href = "./../views/profile.html";
  }else{
    M.toast({html: data.message+", status("+data.status+")",inDuration:500,outDuration:500})
}
});
}
function out() {
    params={
        method: "POST", 
        headers: new Headers({'Content-Type': 'application/json'}), 
}
fetch("./../LogOutServlet", params)
.then(resp => resp.json())
.then(data => {
    console.log(data);
  if (data.status==200){
	M.toast({html: 'Bye!',completeCallback:window.location.href = "./../",inDuration:500,outDuration:500})

  }else{
    M.toast({html: data.message+", status("+data.status+")",inDuration:500,outDuration:500})
}
});
}
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems,{ format:"yyyy-mm-dd",yearRange:[1910,2019]});
  });
  document.addEventListener('DOMContentLoaded', function() {
M.updateTextFields();
  });