function $(id){
    return document.getElementById(id);
}
function c(clase){
    return document.getElementsByClassName(clase)
}

let dataUser = JSON.parse(localStorage.getItem("userInfo"));

window.onpageshow = ()=>{
	let sideName = $('sideName');
	let header = $('header');
	
    let user = $("username");
    let name = $('name');
    let lastname = $('lastName');
    let birthday = $('birthday');
    let gender = $('gender');
    let email = $('email');
    
    user.innerHTML = '<i class="material-icons left">account_circle</i>'+ dataUser.username;
    sideName.innerHTML = dataUser.name+'<span id="sideUser" style="font-size: 20px;color: grey;padding-left:3%">@'+ dataUser.username+'</span>';
    header.innerHTML ='Perfil de @' + dataUser.username;
    
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