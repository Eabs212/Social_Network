function $(id){
    return document.getElementById(id);
}

function c(clase){
    return document.getElementsByClassName(clase)
}

let myData = JSON.parse(localStorage.getItem("userInfo"));
let x = location.href.split('?')[1];
let dataUser;
window.onpageshow = ()=>{
	let user = $("username");
	let sideName = $('sideName');
	let header = $('header');
	
    let name = $('name');
    let lastname = $('lastName');
    let birthday = $('birthday');
    let gender = $('gender');
    let email = $('email');
    let profilePic = $('profilePic');
    
          user.innerHTML = '<i class="material-icons left">account_circle</i>'+ myData.username;

    
    params={
        method: "GET", 
        headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}), 
    }
        let btn = $('addFriend')

    fetch("./../search?"+x, params)
    .then(resp => resp.json())
    	.then(data => {
    		console.log(data);
    		if (data.status==200){
    			localStorage.setItem("user",JSON.stringify(data.data));
    			dataUser = data.data;
                      if(dataUser.id != myData.id){  
                        sideName.innerHTML = dataUser.name+'<span id="sideUser" style="font-size: 20px;color: grey;padding-left:3%">@'+ dataUser.username+'</span>';
                        header.innerHTML ='Perfil de @' + dataUser.username;
    			name.innerHTML = dataUser.name+'<span id="user"></span>';;
    			lastname.innerHTML = dataUser.lastName;
    			birthday.innerHTML = dataUser.birthday;
                        profilePic.setAttribute("src", dataUser.avatar); 
    			if(dataUser.sex == true){
    				gender.innerHTML = "Masculino"
    			} else {
    				gender.innerHTML = "Femenino"
    			}
    
    			email.innerHTML = dataUser.email;
    			console.log(dataUser);
                    }else{
                        sideName.innerHTML = dataUser.name+'<span id="sideUser" style="font-size: 20px;color: grey;padding-left:3%">@'+ dataUser.username+'</span>';
                        header.innerHTML ='Perfil de @' + dataUser.username;
    			name.innerHTML = dataUser.name+'<span id="user"></span>';;
    			lastname.innerHTML = dataUser.lastName;
    			birthday.innerHTML = dataUser.birthday;
                        profilePic.setAttribute("src", dataUser.avatar);
                        btn.innerHTML = "editar";                        
                        btn.removeAttribute('id');
    			if(dataUser.sex == true){
    				gender.innerHTML = "Masculino"
    			} else {
    				gender.innerHTML = "Femenino"
    			}                        
                    }
    		} else {
    			alert(data.message+", status("+data.status+")");
    		}
    	});
}
function chechState(){
    let data = JSON.parse(localStorage.getItem("user"));
    let btn = $('addFriend')
    
    params = {
      method: "GET",
      headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}), 
    };
    fetch("./../isFriend?user="+data.id, params)
    .then(resp => resp.json())
    	.then(data => {
    		console.log(data);
    		if (data.status==200){
    			btn.setAttribute('disabled', "true") ;
                        btn.innerHTML = "Ya son amigos";
    		} else {
    			alert(data.message+", status("+data.status+")");
    		}
    	});    
}

function add(){
    let data = JSON.parse(localStorage.getItem("user"));

    let btn = $('addFriend')
    //let user = $('user').innerHTML;
    params={
        method: "POST", 
        headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}), 
    }
    
    fetch("./../friend?user1="+data.id+"&user2="+myData.id, params)
    .then(resp => resp.json())
    	.then(data => {
    		console.log(data);
    		if (data.status==200){
    			btn.hidden;
    			alert(data.message);
    		} else {
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
			} else {
				alert(data.message+", status("+data.status+")");
			}
		});
}
chechState();