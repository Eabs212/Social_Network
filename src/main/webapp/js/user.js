function $(id){
    return document.getElementById(id);
}
function c(clase){
    return document.getElementsByClassName(clase)
}
let data = JSON.parse(localStorage.getItem("userInfo"));
let dataUser;
let x = location.href.split('?')[1];
console.log(x)


window.onpageshow = ()=>{
    let user = $("username");
    let name = $('name');
    let Name = $('Name');
    let lastname = $('lastName');
    let birthday = $('birthday');
    let gender = $('gender');
    let email = $('email');
    user.innerHTML = '<i class="material-icons left">account_circle</i>'+ data.username;
    params={
        method: "GET", 
        headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}), 
}
    fetch("./../search?"+x, params)
.then(resp => resp.json())
.then(data => {
    console.log(data);
    if (data.status==200){
        localStorage.setItem("user",JSON.stringify(data.data));
         dataUser = data.data;

    Name.innerHTML =dataUser.name+'<span id="user" style="font-size: 20px;color: grey;padding-left:3%">'+  dataUser.username+'</span>';
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
        
    }else{
        alert(data.message+", status("+data.status+")");
    }
});

}
function add(){
    let dataUser = JSON.parse(localStorage.getItem("user"));

    let btn = $('addFriend')
    //let user = $('user').innerHTML;
    params={
        method: "POST", 
        headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}), 
}
    fetch("./../friend?user1="+data.id+"&user2="+dataUser.id, params)
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
        if (data.status==200){
            btn.hidden;
            alert(data.message);
        }else{
            alert(data.message+", status("+data.status+")");
        }
    });
}
$('addFriend').addEventListener('click', add)
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