function $(id){
    return document.getElementById(id);
}
function login() {
    let data={
        username:$('user').value,
        password:$('password').value
    },
    params={
        method: "POST", 
        headers: new Headers({'Content-Type': 'application/json'}), 
        body:JSON.stringify(data) 
}
fetch("./../login", params)
.then(resp => resp.json())
.then(data => {
    console.log(data);
  if (data.status==200){
      localStorage.setItem("userInfo",JSON.stringify(data.data));
      location.href = "./../views/dashboard.html";
  }else{
      alert(data.message+", status("+data.status+")");
  }
});
}