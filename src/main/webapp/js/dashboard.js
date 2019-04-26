function $(id){
    return document.getElementById(id);
}
function c(clase){
    return document.getElementsByClassName(clase)
}
    let dataUser = JSON.parse(localStorage.getItem("userInfo"));

window.onpageshow = ()=>{
    let user = $("username");
    let Name = $('name');
    user.innerHTML = '<i class="material-icons left">account_circle</i>'+ dataUser.username;
    Name.innerHTML =dataUser.name+'<span id="user" style="font-size: 20px;color: grey;padding-left:3%">'+  dataUser.username+'</span>';
        console.log(dataUser);
}
function out() {
    params={
        method: "POST", 
        headers: new Headers({'Content-Type': 'application/json'}) 
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
function myPosts(){
    params = { 
        method: "Get",
        headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'})
    }
    fetch("./../post?user="+dataUser.id, params)
    .then(resp => resp.json())
    .then(data => {
        let post = data.data;
        if(data.status == 200){
            console.log(data);
            console.log(post.typePost);
        }else{
            console.log(status,mesagge);
        }
            });
}
window.onload = () => {
    myPosts();
}