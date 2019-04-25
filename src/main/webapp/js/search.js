function $(id){
    return document.getElementById(id);
}
let dataUser = JSON.parse(localStorage.getItem("userInfo"));
window.onpageshow = ()=>{
    let user = $("username");
    user.innerHTML = '<i class="material-icons left">account_circle</i>'+ dataUser.username;
}
function search(value){
    let user = value;
    console.log(user)
    params={
        method: "GET", 
        headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}), 
}
if(user == null|| user == undefined){
    console.log('busca pe');
}else{
    fetch("./../search?"+user, params)
.then(resp => resp.json())
.then(data => {
    console.log(data.data);
  if (data.data.length>0){
    data.data.map(element => {

    $("result").innerHTML +=`
    <div class="red" style="border: 1px solid #212121 ;border-radius: 10px;height:auto ;padding: 1%;margin-bottom: 2%;margin-top: 2% ">
    <div style="display:flex">
        <div style="width: 12%;height: 30%;">
            <img src="avatar.png" alt="no cargo" class="responsive-img circle" width="90%" height="80%">
            <p>${element.birthday}</p>                      
        </div>
        <div >
            <div style="display:flex">
            <h5 class="user">${element.name} ${element.lastName}</h5><span id="user" style="padding-left:1%;padding-top: 11%;">${element.username}</span>
            </div>
            <p><span>BD:</span> 11/12/1997</p>
        </div>
    </div>
    <a id="${element.id}" href="./../views/user.html?op=3&user=${element.username}" class="btn grey darken-4" style="width: 50%;margin-left: 25%">Ver Perfil</a>
</div>`
//$(element.id).addEventListener('click', profile)
});

  }else{
      console.log(1)
    alert(data.message+", status("+data.status+")"+"No se encontro coincidencia");
  }
});
}
}



$('search').addEventListener('keydown',function(e){
    var key = e.keyCode;
    if (key === 13) {
        location.href = "search.html?op=1&user="+$("search").value;
        e.preventDefault();
    }
})