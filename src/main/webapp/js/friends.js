function $(id){
    return document.getElementById(id);
}
function c(clase){
    return document.getElementsByClassName(clase)
}
let dataUser = JSON.parse(localStorage.getItem("userInfo"));
let friends = $('friends');

window.onpageshow = ()=>{
    let user = $("username");
    user.innerHTML = '<i class="material-icons left">account_circle</i>'+ dataUser.username;
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

function search(value){
    let user = value;
    console.log(user)
    params={
        method: "GET", 
        headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}), 
    }
    if(user == null|| user == undefined){
        fetch("./../friend", params)
        .then(resp => resp.json())
        .then(data => {
            console.log(data.data);
          if (data.data.length>0){
              localStorage.setItem("userFriends",JSON.stringify(data.data));
              friends.innerHTML = data.data.length;
            data.data.map(element => {
        
            $("listFriends").innerHTML +=`
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
            <div style="display:flex">
            <a id="profile" href="./../views/user.html?op=3&user=${element.username}" class="btn grey darken-4" style="width: 50%;">Ver Perfil</a>
            <a id="delete" onclick ="borrar(${element.id})" class="btn grey darken-4" style="width: 50%;">Eliminar</a>
            <div id="deleteId" hidden>${element.id}</div>
            </div>
        </div>`

        });
          }else{
            $("listFriends").innerHTML +=`
            <div class="center-align white-text">
            <h2>No tienes amigos</h2><i class="large material-icons">people</i>
            </div>
            ` 
          }
        });

    }else{
        console.log(1)
        fetch("./../search?"+user, params)
        .then(resp => resp.json())
        .then(data => {
            console.log(data.data);
          if (data.data.length>0){
            let friendsN = JSON.parse(localStorage.getItem("userFriends"));
            friends.innerHTML = friendsN.length;
            data.data.forEach(element => {
        
            $("listFriends").innerHTML +=`
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
            <div style="display:flex">
            <a id="profile" href="./../views/friend?user1="+${element.id}+"&user2="+${dataUser.id}" class="btn grey darken-4" style="width: 50%;">Ver Perfil</a>
            <a id="delete" onclick ="borrar(${element.id})" class="btn grey darken-4" style="width: 50%;">Eliminar</a>
            </div>
        </div>`
        });        
          }else{
              console.log(data.message+", status("+data.status+")")
          }
        });
    }

}
function borrar(value){
    let x = value;
    console.log(x)
    params={
        method: "DELETE", 
        headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}), 
}
    fetch("./../friend?user1="+x+"&user2="+dataUser.id, params)
.then(resp => resp.json())
.then(data => {
    console.log(data);
    if (data.status==200){
        alert(data.message+", status("+data.status+")");
        location.reload();
        }else{
        alert(data.message+", status("+data.status+")");
    }
});

}


$('searchFriends').addEventListener('keydown',function(e){
    var key = e.keyCode;
    if (key === 13) {
        location.href = "friends.html?op=2&param="+$("searchFriends").value;
        e.preventDefault();
    }
})