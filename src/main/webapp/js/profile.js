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
    let profilePic = $('profilePic');
    
    user.innerHTML = '<i class="material-icons left">account_circle</i>'+ dataUser.username;
    sideName.innerHTML = dataUser.name+'<span id="sideUser" style="font-size: 20px;color: grey;padding-left:3%">@'+ dataUser.username+'</span>';
    header.innerHTML ='Perfil de @' + dataUser.username;
    
    name.innerText = dataUser.name;
    lastname.innerHTML = dataUser.lastName;
    birthday.innerHTML = dataUser.birthday;
    profilePic.setAttribute("src", dataUser.avatar); 
    
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
  window.onload = function(){
	getPosts();
}

function getPosts() {
	params = {
	        method: 'GET',
	        headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'})
	    }

	fetch('./../post?user='+dataUser.id, params)
		.then(response => response.json())
	    .then(data => {
	    	let posts = data.data;
	    	console.log(posts)
	    	
	    	if(posts.length > 0) {
	    		posts.map(element => {
	    			let op = element.typePost;
	    			let likes = element.likes.length;
            let date = new Date(element.creationTime)
            let postN = $('post');
            postN.innerHTML = posts.length; 
	    			switch(op){
	    				case 1:
	    					$('feed').innerHTML += `
	    		    			<br><br>
	    		    			<div id="post-container" class="light-blue">
		    		    			<div id="post" class="white center">
	    								<div style="display:flex">
	    									<div style="margin-left:2%">
	    										<img src="${dataUser.avatar}" alt="profile img" class="responsive-img circle" width="60%" height="80%">
	    										<h5 class="center">${dataUser.username}</h5>
	    									</div>
	    									<div style="margin-left:18%">
	    										<h4>${element.postText}</h4>
	    									</div>
	    									<div style="margin-left:25%">
	    										<p>Creado el: ${date.toDateString()}</p>
	    										<h5 class="like">Likes: ${likes}</h5>
	    									</div> 
	    								</div>
		    						</div>
		    					
	    						<div class="divider grey darken-4"></div>
	    						<div id="comment-section" class="grey darken-4 col s12 row">
	    							<div id="comments-container" class="grey darken-4 col s10 row border-radius: 10px;"></div>
	    							<br>
	    							<textarea class="materialize-textarea white" placeholder="comenta algo" id="${element.idPost}" cols="20" rows="10"></textarea>
	    							<a href="" onclick="comment(${element.idPost})" class="btn right grey darken-2" style="width:25%; margin-right:5.4%;">comment</a>
	    						</div>
	    						<a class="btn red darken-4" style="width: 25%; margin-left:50px">dislike</a>
	    						<a onclick="like(${element.idPost})" class="btn green darken-4" style="width: 25%; margin-left:400px">like</a>
	    					</div>`
	    						
	    					if(element.comments.length > 0) {
	    						let position = 0;
	    						element.comments.forEach((comment) => {
	    							$('comments-container').innerHTML += `
	    								<br>
	    	    						<div style="width: 20%;display: flex">
	    	    							<div style="margin-left:2%">
	    										<img src="${element.comments[position].user.avatar}" alt="profile img" class="responsive-img circle" width="100%" height="20%">
	    										<h5 class="center" style="color:white">${element.comments[position].user.username}</h5>
	    									</div>
                      <div style="width: 60%;">
	    	    							<p class="white" style="margin-left:1%; border-radius:5px; padding:1%;height: 60%;">${element.comments[position].commentText}</p>
                      </div>
    	    							</div>
    	    							<hr>`
	    							position++;
	    						});
	    					}
	    					
	    					break;

	    				case 2: 
	    					$('feed').innerHTML += `
	    		    			<br><br>
	    		    			<div id="post-container" class="light-blue">
		    		    			<div id="post" class="white center">
	    								<div style="display:flex">
	    									<div style="margin-left:2%">
	    										<img src="${dataUser.avatar}" alt="profile img" class="responsive-img circle" width="60%" height="80%">
	    										<h5 class="center">${dataUser.username}</h5>
	    									</div>
	    									<div style="margin-left:18%">
	    										<h4>${element.postText}</h4>
	    									</div>
	    									<div style="margin-left:25%">
	    										<p>Creado el: ${date.toDateString()}</p>
	    										<h5 class="like">Likes: ${likes}</h5>
	    									</div>
	    								</div>	  
										<div style="margin: 1%">
											<img class="materialboxed" src="${element.url}" alt="asd" width="20%" height="30%" style="margin-left:40%">
										</div>  								
		    						</div>
		    					
	    						<div class="divider grey darken-4"></div>
	    						<div id="comment-section" class="grey darken-4 col s12 row">
	    							<div id="img-comments-container" class="grey darken-4 col s10 row border-radius: 10px;"></div>
	    							<br>
	    							<textarea class="materialize-textarea white" placeholder="comenta algo" id="${element.idPost}" cols="20" rows="10"></textarea>
	    							<a href="" onclick="comment(${element.idPost})" class="btn right grey darken-2" style="width:25%; margin-right:5.4%;">comment</a>
	    						</div>
	    						<a class="btn red darken-4" style="width: 25%; margin-left:50px">dislike</a>
	    						<a onclick="like(${element.idPost})" class="btn green darken-4" style="width: 25%; margin-left:400px">like</a>
	    					</div>`
	    						
	    					if(element.comments.length > 0) {
	    						let position = 0;
	    						element.comments.forEach((comment) => {
	    							$('img-comments-container').innerHTML += `
	    								<br>
	    	    						<div style="display: flex">
	    	    						<div style="width: 20%;display: flex">
	    	    							<div style="margin-left:2%">
	    										<img src="${element.comments[position].user.avatar}" alt="profile img" class="responsive-img circle" width="100%" height="20%">
	    										<h5 class="center" style="color:white">${element.comments[position].user.username}</h5>
	    									</div>
                      <div style="width: 60%;">
	    	    							<p class="white" style="margin-left:1%; border-radius:5px; padding:1%;height: 60%;">${element.comments[position].commentText}</p>
                      </div>
    	    							</div>
    	    							<hr>`
	    							position++;
	    						});
	    					}
	    					break;
	    					
	    				case 3:
	    					$('feed').innerHTML += `
	    		    			<br><br>
	    		    			<div id="post-container" class="light-blue">
		    		    			<div id="post" class="white center">
	    								<div style="display:flex">
	    									<div style="margin-left:2%">
	    										<img src="${dataUser.avatar}" alt="profile img" class="responsive-img circle" width="60%" height="80%">
	    										<h5 class="center">${dataUser.username}</h5>
	    									</div>
	    									<div style="margin-left:18%">
	    										<h4>${element.postText}</h4>
	    									</div>
	    									<div style="margin-left:25%">
	    										<p>Creado el: ${date.toDateString()}</p>
	    										<h5 class="like">Likes: ${likes}</h5>
	    									</div>
	    								</div>	  
										<div style="margin: 1%">
	    									<video class="responsive-video" width="55%" height="65%" controls>
	    										<source src="${element.url}" type="video/mp4">
	    									</video>
	    								</div>								
		    						</div>
		    					
	    						<div class="divider grey darken-4"></div>
	    						<div id="comment-section" class="grey darken-4 col s12 row">
	    							<div id="vid-comments-container" class="grey darken-4 col s10 row border-radius: 10px;"></div>
	    							<br>
	    							<textarea class="materialize-textarea white" placeholder="comenta algo" id="${element.idPost}" cols="20" rows="10"></textarea>
	    							<a href="" onclick="comment(${element.idPost})" class="btn right grey darken-2" style="width:25%; margin-right:5.4%;">comment</a>
	    						</div>
	    						<a class="btn red darken-4" style="width: 25%; margin-left:50px">dislike</a>
	    						<a  onclick="like(${element.idPost})" class="btn green darken-4" style="width: 25%; margin-left:400px">like</a>
	    					</div>`
	    						
	    					if(element.comments.length > 0) {
	    						let position = 0;
	    						element.comments.forEach((comment) => {
	    							$('vid-comments-container').innerHTML += `
	    								<br>
	    	    						<div style="width: 20%;display: flex">
	    	    							<div style="margin-left:2%">
	    										<img src="${element.comments[position].user.avatar}" alt="profile img" class="responsive-img circle" width="100%" height="20%">
	    										<h5 class="center" style="color:white">${element.comments[position].user.username}</h5>
	    									</div>
                      <div style="width: 60%;">
	    	    							<p class="white" style="margin-left:1%; border-radius:5px; padding:1%;height: 60%;">${element.comments[position].commentText}</p>
                      </div>
    	    							</div>
    	    							<hr>`
	    							position++;
	    						});
	    					}
	    					break;
	    				case 4: 
	    					$('feed').innerHTML += `
	    		    			<br><br>
	    		    			<div id="post-container" class="light-blue">
		    		    			<div id="post" class="white center">
	    								<div style="display:flex">
	    									<div style="margin-left:2%">
	    										<img src="${dataUser.avatar}" alt="profile img" class="responsive-img circle" width="60%" height="80%">
	    										<h5 class="center">${dataUser.username}</h5>
	    									</div>
	    									<div style="margin-left:18%">
	    										<h4>${element.postText}</h4>
	    									</div>
	    									<div style="margin-left:25%">
	    										<p>Creado el: ${date.toDateString()}</p>
	    										<h5 class="like">Likes: ${likes}</h5>
	    									</div>
	    								</div>	  
										<div style="margin: 1%;align-content: center">
	    									<audio src="${element.url}" style="width:50%" controls></audio>
	    								</div>							
		    						</div>
		    					
	    						<div class="divider grey darken-4"></div>
	    						<div id="comment-section" class="grey darken-4 col s12 row">
	    							<div id="mp3-comments-container" class="grey darken-4 col s10 row border-radius: 10px;"></div>
	    							<br>
	    							<textarea class="materialize-textarea white" placeholder="comenta algo" id="${element.idPost}" cols="20" rows="10"></textarea>
	    							<a href="" onclick="comment(${element.idPost})" class="btn right grey darken-2" style="width:25%; margin-right:5.4%;">comment</a>
	    						</div>
	    						<a class="btn red darken-4" style="width: 25%; margin-left:50px">dislike</a>
	    						<a onclick="like(${element.idPost})" class="btn green darken-4" style="width: 25%; margin-left:400px">like</a>
	    					</div>`
	    						
	    					if(element.comments.length > 0) {
	    						let position = 0;
	    						element.comments.forEach((comment) => {
	    							$('mp3-comments-container').innerHTML += `
	    								<br>
	    	    						<div style="width: 20%;display: flex">
	    	    							<div style="margin-left:2%">
	    										<img src="${element.comments[position].user.avatar}" alt="profile img" class="responsive-img circle" width="100%" height="20%">
	    										<h5 class="center" style="color:white">${element.comments[position].user.username}</h5>
	    									</div>
                      <div style="width: 60%;">
	    	    							<p class="white" style="margin-left:1%; border-radius:5px; padding:1%;height: 60%;">${element.comments[position].commentText}</p>
                      </div>
    	    							</div>
    	    							<hr>`
	    							position++;
	    						});
	    					}
	    				default:
	    					$('feed').innerHTML += `lol`
	    			} // End of switch
	    		}) // End of map
	    	} else {
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
    alert(JSON.stringify(data) )
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
      alert(data.message+", status("+data.status+")");
      window.location.reload()
  }else{
      alert(data.message+", status("+data.status+")");
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
      alert(data.message+", status("+data.status+")");
  }
});    
}