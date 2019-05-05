function $(id){
    return document.getElementById(id);
}

let dataUser = JSON.parse(localStorage.getItem("userInfo"));
	window.onpageshow = () => {
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
    
    if(user == null || user == undefined){
    	console.log('no user');
    } else {
    	fetch("./../search?"+user, params)
    	.then(resp => resp.json())
    		.then(data => {
    			console.log(data.data);
    			if (data.data.length>0){
    				data.data.map(element => {
						if(element.id !=dataUser.id){
    					$("result").innerHTML +=`
    						<div class="white center" style="border: 1px solid #212121; border-radius:10px; height:auto; padding:1%; margin-bottom:2%; margin-top:2%; margin-left:15%; width:700px">
    							<div style="display:flex">
    								<div style="width: 15%; height:30%;">
    									<img src="${element.avatar}" alt="profile img" class="responsive-img circle" width="90%" height="80%">
    									<h4 class="center">${element.username}</h4>
    								</div>
    								<div style="margin-left:8%">
										<h5 class="user">Nombre: ${element.name} ${element.lastName}</h5>
										<p><h5>Fecha de nacimiento:</h5> ${element.birthday}</p>
									</div>
									<a id="${element.id}" href="./../views/user.html?op=3&user=${element.username}" class="btn grey darken-4" style="width:20%; margin-left:15%; margin-top:18%">Ver Perfil</a> 
    							</div>
							</div>`
						}else{
							$("result").innerHTML +=`
    						<div class="white center" style="border: 1px solid #212121; border-radius:10px; height:auto; padding:1%; margin-bottom:2%; margin-top:2%; margin-left:15%; width:700px">
    							<div style="display:flex">
    								<div style="width: 15%; height:30%;">
    									<img src="${element.avatar}" alt="profile img" class="responsive-img circle" width="90%" height="80%">
    									<h4 class="center">${element.username}</h4>
    								</div>
    								<div style="margin-left:8%">
										<h5 class="user">Nombre: ${element.name} ${element.lastName}</h5>
										<p><h5>Fecha de nacimiento:</h5> ${element.birthday}</p>
									</div>
									<a id="${element.id}" href="./../views/profile.html" class="btn grey darken-4" style="width:20%; margin-left:15%; margin-top:18%">Ver Perfil</a> 
    							</div>
							</div>
							` }
    				});

    			}else{
            $("result").innerHTML +=`
            <div class="center-align white-text">
            <h2>No se encontro coincidencia</h2><i class="large material-icons">people</i>
            </div>
            ` 
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

			} else {
				M.toast({html: data.message+", status("+data.status+")",inDuration:500,outDuration:500})
			}
		});
}