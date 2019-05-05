function $(id){
    return document.getElementById(id);
}

function c(clase){
    return document.getElementsByClassName(clase)
}

window.onload = function(){
	chechState();
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
				M.toast({html: data.message+", status("+data.status+")",inDuration:500,outDuration:500})
    		}
    	});
}
checkState();
function checkState(){
    let data = JSON.parse(localStorage.getItem("user"));
    let btn = $('addFriend')
    
    params = {
      method: "GET",
      headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}), 
    };
    fetch("./../isFriend?user="+data.id, params)
    .then(resp => resp.json())
    	.then(data => {
    		console.log(data.data);
    		if (data.data == true){
    			btn.setAttribute('disabled', "true") ;
                        btn.innerHTML = "Ya son amigos";
    		} else {
				M.toast({html: data.message+", status("+data.status+")",inDuration:500,outDuration:500})
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
				M.toast({html: data.message+", status("+data.status+")",inDuration:500,outDuration:500})
    		} else {
				M.toast({html: data.message+", status("+data.status+")",inDuration:500,outDuration:500})
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
				M.toast({html: 'Bye!',completeCallback:window.location.href = "./../",inDuration:500,outDuration:500})

			} else {
				M.toast({html: data.message+", status("+data.status+")",inDuration:500,outDuration:500})
			}
		});
}
  window.onload = function(){
	getPosts();
}

function getPosts() {
let user = JSON.parse(localStorage.getItem("user"));

params = {
	method: 'GET',
	headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'})
}
let postN = $('postN');

fetch('./../post?user='+user.id, params)
.then(response => response.json())
.then(data => {
	let posts = data.data;
	console.log(posts)
	
	if(posts.length > 0) {
		posts.map(element => {
			let op = element.typePost;
			postN.innerHTML = posts.length;

	let date = new Date(element.creationTime)
			switch(op){
				case 1:
					$('feed').innerHTML += `
						<br>
						<div id="post-container" class="light-blue darken-2">
							<div id="post" class="white center">
								<div style="display:flex">
									<div style="margin-left:2%;width:20%">
									<img src="${user.avatar}" alt="profile img" class="responsive-img circle" width="60%" height="80%">
									<h5 class="center">${user.username}</h5>
									</div>
									<div style="margin-left:8%">
									<textarea class="materialize-textarea" style="width: 45vw;overflow: auto;border:none; color: black;max-height: 17vh;height:17vh"data-length="220" disabled>${element.postText}</textarea>
									</div>
								</div>
								<div>
								<p>Creado el: ${date.toDateString()}</p>
							</div>

						</div> 
						<div id="comment-section" class="grey darken-4 col s12 row">
							<div id="comments-container-${element.idPost}" class="grey darken-4 col s10 row border-radius: 10px;"></div>
							<br>
							<div style="margin: 1%;align-content: center">
							<textarea class="materialize-textarea white" placeholder="comenta algo" id="${element.idPost}" cols="20" rows="10" style="width:55vw;border-radius:5px"></textarea>
							<a onclick="comment(${element.idPost})" class="btn right grey darken-2" style="width:6%; margin-right:5.4%;margin-top:0.3%"> <i class="material-icons">send</i></a>
							</div>
						</div>
						<a onclick="dislike(${element.idPost})" class="btn red darken-4" style="width: 10%; margin-left:50px"><i class="material-icons right">thumb_down</i><i id="dislikes-container-${element.idPost}">0</i></a>
						<a onclick="like(${element.idPost})" class="btn green darken-4" style="width: 10%; "><i class="material-icons right">thumb_up</i><i id="likes-container-${element.idPost}">0</i></a>
					</div>`
						
					if(element.comments.length > 0) {
						let position = 0;
						element.comments.forEach(() => {
							$('comments-container-'+element.idPost).innerHTML += `
								<br>
								<div style="width: 20%;display: flex">
									<div style="margin-left:2%">
										<img src="${element.comments[position].user.avatar}" alt="profile img" class="responsive-img circle" width="100%" height="20%">
										<h5 class="center" style="color:white">${element.comments[position].user.username}</h5>
									</div>
			  <div style="width: 60%;">
			  <textarea class="white materialize-textarea black-text" style="margin-left: 30%;border-radius:5px;padding:1%;height: 80%;width: 50vw;" disabled>${element.comments[position].commentText}</textarea>
			  </div>
								</div>
								<hr>`
							position++;
						});
					}
					if(element.likes.length > 0) {
						let likeN = 0;
						let dislikeN = 0; 
						let position = 0;
						element.likes.forEach(() => {
							if(element.likes[position].typeLikeId == 1){
								console.log(element.likes[position].typeLikeId)
								likeN++
							$('likes-container-'+element.idPost).innerHTML = likeN;
							
							}else{
								dislikeN++;
								$('dislikes-container-'+element.idPost).innerHTML = dislikeN;

							}
							position++;
						});
					}
					
					break;

				case 2: 
					$('feed').innerHTML += `
						<br>
						<div id="post-container" class="light-blue darken-2">
							<div id="post" class="white center">
								<div style="display:flex">
									<div style="margin-left:2%;width:20%">
									<img src="${user.avatar}" alt="profile img" class="responsive-img circle" width="60%" height="80%">
									<h5 class="center">${user.username}</h5>
									</div>
									<div style="margin-left:8%">
									<textarea class="materialize-textarea" style="width: 45vw;overflow: auto;border:none; color: black;max-height: 17vh;height:17vh"data-length="220" disabled>${element.postText}</textarea>
									</div>

								</div>	  
								<div style="margin: 1%">
									<img onclick="imag()" class="materialboxed" src="${element.url}" alt="asd" width="20%" height="30%" style="margin-left:40%">
								</div>  
								<div>
								<p>Creado el: ${date.toDateString()}</p>
							</div> 								
							</div>
						
						<div id="comment-section" class="grey darken-4 col s12 row">
							<div id="img-comments-container-${element.idPost}" class="grey darken-4 col s10 row border-radius: 10px;"></div>
							<br>
							<div style="margin: 1%;align-content: center">
							<textarea class="materialize-textarea white" placeholder="comenta algo" id="${element.idPost}" cols="20" rows="10" style="width:55vw;border-radius:5px"></textarea>
							<a onclick="comment(${element.idPost})" class="btn right grey darken-2" style="width:6%; margin-right:5.4%;margin-top:0.3%"> <i class="material-icons">send</i></a>
							</div>
						</div>
						<a onclick="dislike(${element.idPost})" class="btn red darken-4" style="width: 10%; margin-left:50px"><i class="material-icons right">thumb_down</i><i id="img-dislikes-container-${element.idPost}">0</i></a>
						<a onclick="like(${element.idPost})" class="btn green darken-4" style="width: 10%; "><i class="material-icons right">thumb_up</i><i id="img-likes-container-${element.idPost}">0</i></a>
					</div>`
						
					if(element.comments.length > 0) {
						let position = 0;
						element.comments.forEach(() => {
							$('img-comments-container-'+element.idPost).innerHTML += `
								<br>
								<div style="display: flex">
								<div style="width: 20%;display: flex">
									<div style="margin-left:2%">
										<img src="${element.comments[position].user.avatar}" alt="profile img" class="responsive-img circle" width="100%" height="20%">
										<h5 class="center" style="color:white">${element.comments[position].user.username}</h5>
									</div>
			  <div style="width: 60%;">
			  <textarea class="white materialize-textarea black-text" style="margin-left: 30%;border-radius:5px;padding:1%;height: 80%;width: 50vw;" disabled>${element.comments[position].commentText}</textarea>
			  </div>
								</div>
								<hr>`
							position++;
						});
					}
					if(element.likes.length > 0) {
						let likeN = 0;
						let dislikeN = 0; 
						let position = 0;
						element.likes.forEach(() => {
							if(element.likes[position].typeLikeId == 1){
								console.log(element.likes[position].typeLikeId)
								likeN++
							$('img-likes-container-'+element.idPost).innerHTML = likeN;
							
							}else{
								dislikeN++;
								$('img-dislikes-container-'+element.idPost).innerHTML = dislikeN;

							}
							position++;
						});
					}
					break;
					
				case 3:
					$('feed').innerHTML += `
						<br>
						<div id="post-container" class="light-blue darken-2">
							<div id="post" class="white center">
								<div style="display:flex">
									<div style="margin-left:2%;width:20%">
									<img src="${user.avatar}" alt="profile img" class="responsive-img circle" width="60%" height="80%">
									<h5 class="center">${user.username}</h5>
									</div>
									<div style="margin-left:8%">
									<textarea class="materialize-textarea" style="width: 45vw;overflow: auto;border:none; color: black;max-height: 17vh;height:17vh"data-length="220" disabled>${element.postText}</textarea>
									</div>

								</div>	  
								<div style="margin: 1%">
									<video class="responsive-video" width="45%" height="65%" controls>
										<source src="${element.url}" type="video/mp4">
									</video>
								</div>
								<div>
								<p>Creado el: ${date.toDateString()}</p>
							</div> 								
							</div>
						
						<div id="comment-section" class="grey darken-4 col s12 row">
							<div id="vid-comments-container-${element.idPost}" class="grey darken-4 col s10 row border-radius: 10px;"></div>
							<br>
							<div style="margin: 1%;align-content: center">
							<textarea class="materialize-textarea white" placeholder="comenta algo" id="${element.idPost}" cols="20" rows="10" style="width:55vw;border-radius:5px"></textarea>
							<a onclick="comment(${element.idPost})" class="btn right grey darken-2" style="width:6%; margin-right:5.4%;margin-top:0.3%"> <i class="material-icons">send</i></a>
							</div>
						</div>
						<a onclick="dislike(${element.idPost})" class="btn red darken-4" style="width: 10%; margin-left:50px"><i class="material-icons right">thumb_down</i><i id="vid-dislikes-container-${element.idPost}">0</i></a>
						<a onclick="like(${element.idPost})" class="btn green darken-4" style="width: 10%; "><i class="material-icons right">thumb_up</i><i id="vid-likes-container-${element.idPost}">0</i></a>
					</div>`
						
					if(element.comments.length > 0) {
						let position = 0;
						element.comments.forEach(() => {
							$('vid-comments-container-'+element.idPost).innerHTML += `
								<br>
								<div style="width: 20%;display: flex">
									<div style="margin-left:2%">
										<img src="${element.comments[position].user.avatar}" alt="profile img" class="responsive-img circle" width="100%" height="20%">
										<h5 class="center" style="color:white">${element.comments[position].user.username}</h5>
									</div>
			  <div style="width: 60%;">
			  <textarea class="white materialize-textarea black-text" style="margin-left: 30%;border-radius:5px;padding:1%;height: 80%;width: 50vw;" disabled>${element.comments[position].commentText}</textarea>
			  </div>
								</div>
								<hr>`
							position++;
						});
					}
					if(element.likes.length > 0) {
						let likeN = 0;
						let dislikeN = 0; 
						let position = 0;
						element.likes.forEach(() => {
							if(element.likes[position].typeLikeId == 1){
								console.log(element.likes[position].typeLikeId)
								likeN++
							$('vid-likes-container-'+element.idPost).innerHTML = likeN;
							
							}else{
								dislikeN++;
								$('vid-dislikes-container-'+element.idPost).innerHTML = dislikeN;

							}
							position++;
						});
					}
					break;
				case 4: 
					$('feed').innerHTML += `
						<br>
						<div id="post-container" class="light-blue darken-2">
							<div id="post" class="white center">
								<div style="display:flex">
									<div style="margin-left:2%;width:20%">
									<img src="${user.avatar}" alt="profile img" class="responsive-img circle" width="60%" height="80%">
									<h5 class="center">${user.username}</h5>
									</div>
									<div style="margin-left:8%">
									<textarea class="materialize-textarea" style="width: 45vw;overflow: auto;border:none; color: black;max-height: 17vh;height:17vh"data-length="220" disabled>${element.postText}</textarea>
									</div>

								</div>	  
								<div style="margin: 1%;align-content: center">
									<audio src="${element.url}" style="width:50%" controls></audio>
								</div>
								<div>
								<p>Creado el: ${date.toDateString()}</p>
							</div> 							
							</div>
						
						<div id="comment-section" class="grey darken-4 col s12 row">
							<div id="mp3-comments-container-${element.idPost}" class="grey darken-4 col s10 row border-radius: 10px;"></div>
							<br>
							<div style="margin: 1%;align-content: center">
							<textarea class="materialize-textarea white" placeholder="comenta algo" id="${element.idPost}" cols="20" rows="10" style="width:55vw;border-radius:5px"></textarea>
							<a onclick="comment(${element.idPost})" class="btn right grey darken-2" style="width:6%; margin-right:5.4%;margin-top:0.3%"> <i class="material-icons">send</i></a>
							</div>
						</div>
						<a onclick="dislike(${element.idPost})" class="btn red darken-4" style="width: 10%; margin-left:50px"><i class="material-icons right">thumb_down</i><i id="mp3-dislikes-container-${element.idPost}">0</i></a>
						<a onclick="like(${element.idPost})" class="btn green darken-4" style="width: 10%; "><i class="material-icons right">thumb_up</i><i id="mp3-likes-container-${element.idPost}">0</i></a>
					</div>`
						
					if(element.comments.length > 0) {
						let position = 0;
						element.comments.forEach(() => {
							$('mp3-comments-container-'+element.idPost).innerHTML += `
								<br>
								<div style="width: 20%;display: flex">
									<div style="margin-left:2%">
										<img src="${element.comments[position].user.avatar}" alt="profile img" class="responsive-img circle" width="100%" height="20%">
										<h5 class="center" style="color:white">${element.comments[position].user.username}</h5>
									</div>
			  <div style="width: 60%;">
			  <textarea class="white materialize-textarea black-text" style="margin-left: 30%;border-radius:5px;padding:1%;height: 80%;width: 50vw;" disabled>${element.comments[position].commentText}</textarea>

			  </div>
								</div>
								<hr>`
							position++;
						});
					}
					if(element.likes.length > 0) {
						let likeN = 0;
						let dislikeN = 0; 
						let position = 0;
						element.likes.forEach(() => {
							if(element.likes[position].typeLikeId == 1){
								console.log(element.likes[position].typeLikeId)
								likeN++
							$('mp3-likes-container-'+element.idPost).innerHTML = likeN;
							
							}else{
								dislikeN++;
								$('mp3-dislikes-container-'+element.idPost).innerHTML = dislikeN;

							}
							position++;
						});
					}							
				default:
					$('feed').innerHTML += `lol`
			} // End of switch
		}) // End of map
	} else {
		postN.innerHTML = posts.length;

		$("feed").innerHTML +=`
			<div class="center-align white-text">
				<h2>Parece que no tienes nada que ver</h2>
			</div>`
	}
}) // End of .then
.catch(error => console.error(error))
}
function like(value){
    data ={
            postId:value,
            typeLikeId:1
            
    }
    params={
        method: "POST", 
        headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}),
        body:JSON.stringify(data) 
}
fetch("./../likes", params)
.then(resp => resp.json())
.then(data => {
    console.log(data);
  if (data.status==200){
	M.toast({html: 'like post',completeCallback:window.location.reload(),inDuration:500,outDuration:500})

  }else{
	M.toast({html: data.message+", status("+data.status+")",inDuration:500,outDuration:500})
}
});

}


function comment(value){
  let id = value+'';
  let text = $(id).value
    data = {
        commentText:text,
        postId:value
    },
    params={
        method: "POST", 
        headers: new Headers({'Content-Type': 'application/json'}), 
        body:JSON.stringify(data) 
}
fetch("./../comments", params)
.then(resp => resp.json())
.then(data => {
    console.log(data);
  if (data.status==200){
      localStorage.setItem("userInfo",JSON.stringify(data.data));
  }else{
	M.toast({html: data.message+", status("+data.status+")",inDuration:500,outDuration:500})
}
});    
}
