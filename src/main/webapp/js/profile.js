function $(id){
    return document.getElementById(id);
}
function c(clase){
    return document.getElementsByClassName(clase)
}
window.onpageshow = ()=>{
    let user = $("username");
    let name = $('name');
    let Name = $('Name');
    let lastname = $('lastName');
    let birthday = $('birthday');
    let gender = $('gender');
    let email = $('email');
    let dataUser = JSON.parse(localStorage.getItem("userInfo"));
    user.innerHTML = '<i class="material-icons left">account_circle</i>'+ dataUser.username;
    Name.innerHTML =dataUser.name+'<span id="user" style="font-size: 20px;color: grey">@'+  dataUser.username+'</span>';
    name.innerText = dataUser.name;
    lastname.innerHTML = dataUser.lastName;
    birthday.innerHTML = dataUser.birthday;
    if(dataUser.sex == true){
    gender.innerHTML = "Masculino"
    }else{
        gender.innerHTML = "Femenino"
    }
    email.innerHTML = dataUser.email;

    console.log(dataUser);
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
      alert(data.message+", status("+data.status+")");
      location.href = "./../";
  }else{
      alert(data.message+", status("+data.status+")");
  }
});
}