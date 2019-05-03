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
    let profilePic = $('profilePic');    
    user.innerHTML = '<i class="material-icons left">account_circle</i>' + dataUser.username;
    Name.innerHTML = dataUser.name+'<span id="user" style="font-size: 20px;color: grey;padding-left:3%">@'+  dataUser.username+'</span>';
    profilePic.setAttribute("src", dataUser.avatar); 
}

window.onload = function(){
	getPosts();
}

function getPosts() {
	params = {
	        method: 'GET',
	        headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'})
	    }

	fetch('./../dashboard', params)
		.then(response => response.json())
	    .then(data => {
	    	let posts = data.data;
	    	console.log(posts)
	    	
	    	if(posts.length > 0) {
	    		posts.map(element => {
	    			let op = element.typePost;
	    			let likes = element.likes.length;
	    			switch(op){
	    				case 1:
	    					$('feed').innerHTML += `
	    		    			<br><br>
	    		    			<div id="post-container" class="light-blue">
		    		    			<div id="post" class="white center">
	    								<div style="display:flex">
	    									<div style="margin-left:2%">
	    										<img src="${element.user.avatar}" alt="profile img" class="responsive-img circle" width="90%" height="80%">
	    										<h5 class="center">${element.user.username}</h5>
	    									</div>
	    									<div style="margin-left:18%">
	    										<h4>${element.postText}</h4>
	    									</div>
	    									<div style="margin-left:25%">
	    										<p>Creado el: ${element.creationTime}</p>
	    										<h5 class="like">Likes: ${likes}</h5>
	    									</div> 
	    								</div>
		    						</div>
		    					
	    						<div class="divider grey darken-4"></div>
	    						<div id="comment-section" class="grey darken-4 col s12 row">
	    							<div id="comments-container" class="grey darken-4 col s10 row border-radius: 10px;"></div>
	    							<br>
	    							<textarea class="materialize-textarea white" placeholder="comenta algo" id="text-coment" cols="20" rows="10"></textarea>
	    							<a href="" class="btn right grey darken-2" style="width:25%; margin-right:5.4%;">comment</a>
	    						</div>
	    						<a href="" class="btn red darken-4" style="width: 25%; margin-left:50px">dislike</a>
	    						<a href="" class="btn green darken-4" style="width: 25%; margin-left:400px">like</a>
	    					</div>`
	    						
	    					if(element.comments.length > 0) {
	    						let position = 0;
	    						element.comments.forEach((comment) => {
	    							$('comments-container').innerHTML += `
	    								<br>
	    	    						<div style="display: flex">
	    	    							<div style="margin-left:2%">
	    										<img src="${element.comments[position].user.avatar}" alt="profile img" class="responsive-img circle" width="90%" height="80%">
	    										<h5 class="center" style="color:white">${element.comments[position].user.name}</h5>
	    									</div>
	    	    							<p class="white" style="margin-left:8%; border-radius:5px; padding:1%">${element.comments[position].commentText}</p>
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
	    										<img src="${element.user.avatar}" alt="profile img" class="responsive-img circle" width="90%" height="80%">
	    										<h5 class="center">${element.user.username}</h5>
	    									</div>
	    									<div style="margin-left:18%">
	    										<h4>${element.postText}</h4>
	    									</div>
	    									<div style="margin-left:25%">
	    										<p>Creado el: ${element.creationTime}</p>
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
	    							<textarea class="materialize-textarea white" placeholder="comenta algo" id="text-coment" cols="20" rows="10"></textarea>
	    							<a href="" class="btn right grey darken-2" style="width:25%; margin-right:5.4%;">comment</a>
	    						</div>
	    						<a href="" class="btn red darken-4" style="width: 25%; margin-left:50px">dislike</a>
	    						<a href="" class="btn green darken-4" style="width: 25%; margin-left:400px">like</a>
	    					</div>`
	    						
	    					if(element.comments.length > 0) {
	    						let position = 0;
	    						element.comments.forEach((comment) => {
	    							$('img-comments-container').innerHTML += `
	    								<br>
	    	    						<div style="display: flex">
	    	    							<div style="margin-left:2%">
	    										<img src="${element.comments[position].user.avatar}" alt="profile img" class="responsive-img circle" width="90%" height="80%">
	    										<h5 class="center" style="color:white">${element.comments[position].user.name}</h5>
	    									</div>
	    	    							<p class="white" style="margin-left:8%; border-radius:5px; padding:1%">${element.comments[position].commentText}</p>
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
	    										<img src="${element.user.avatar}" alt="profile img" class="responsive-img circle" width="90%" height="80%">
	    										<h5 class="center">${element.user.username}</h5>
	    									</div>
	    									<div style="margin-left:18%">
	    										<h4>${element.postText}</h4>
	    									</div>
	    									<div style="margin-left:25%">
	    										<p>Creado el: ${element.creationTime}</p>
	    										<h5 class="like">Likes: ${likes}</h5>
	    									</div>
	    								</div>	  
										<div style="margin: 1%">
	    									<video class="responsive-video" width="55%" height="65%" style="margin-left:25%" controls>
	    										<source src="${element.url}" type="video/mp4">
	    									</video>
	    								</div>								
		    						</div>
		    					
	    						<div class="divider grey darken-4"></div>
	    						<div id="comment-section" class="grey darken-4 col s12 row">
	    							<div id="vid-comments-container" class="grey darken-4 col s10 row border-radius: 10px;"></div>
	    							<br>
	    							<textarea class="materialize-textarea white" placeholder="comenta algo" id="text-coment" cols="20" rows="10"></textarea>
	    							<a href="" class="btn right grey darken-2" style="width:25%; margin-right:5.4%;">comment</a>
	    						</div>
	    						<a href="" class="btn red darken-4" style="width: 25%; margin-left:50px">dislike</a>
	    						<a href="" class="btn green darken-4" style="width: 25%; margin-left:400px">like</a>
	    					</div>`
	    						
	    					if(element.comments.length > 0) {
	    						let position = 0;
	    						element.comments.forEach((comment) => {
	    							$('vid-comments-container').innerHTML += `
	    								<br>
	    	    						<div style="display: flex">
	    	    							<div style="margin-left:2%">
	    										<img src="${element.comments[position].user.avatar}" alt="profile img" class="responsive-img circle" width="90%" height="80%">
	    										<h5 class="center" style="color:white">${element.comments[position].user.name}</h5>
	    									</div>
	    	    							<p class="white" style="margin-left:8%; border-radius:5px; padding:1%">${element.comments[position].commentText}</p>
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
	    										<img src="${element.user.avatar}" alt="profile img" class="responsive-img circle" width="90%" height="80%">
	    										<h5 class="center">${element.user.username}</h5>
	    									</div>
	    									<div style="margin-left:18%">
	    										<h4>${element.postText}</h4>
	    									</div>
	    									<div style="margin-left:25%">
	    										<p>Creado el: ${element.creationTime}</p>
	    										<h5 class="like">Likes: ${likes}</h5>
	    									</div>
	    								</div>	  
										<div style="margin: 1%;align-content: center">
	    									<audio src="${element.url}" style="margin-left:25%;width:50%" controls></audio>
	    								</div>							
		    						</div>
		    					
	    						<div class="divider grey darken-4"></div>
	    						<div id="comment-section" class="grey darken-4 col s12 row">
	    							<div id="mp3-comments-container" class="grey darken-4 col s10 row border-radius: 10px;"></div>
	    							<br>
	    							<textarea class="materialize-textarea white" placeholder="comenta algo" id="text-coment" cols="20" rows="10"></textarea>
	    							<a href="" class="btn right grey darken-2" style="width:25%; margin-right:5.4%;">comment</a>
	    						</div>
	    						<a href="" class="btn red darken-4" style="width: 25%; margin-left:50px">dislike</a>
	    						<a href="" class="btn green darken-4" style="width: 25%; margin-left:400px">like</a>
	    					</div>`
	    						
	    					if(element.comments.length > 0) {
	    						let position = 0;
	    						element.comments.forEach((comment) => {
	    							$('mp3-comments-container').innerHTML += `
	    								<br>
	    	    						<div style="display: flex">
	    	    							<div style="margin-left:2%">
	    										<img src="${element.comments[position].user.avatar}" alt="profile img" class="responsive-img circle" width="90%" height="80%">
	    										<h5 class="center" style="color:white">${element.comments[position].user.name}</h5>
	    									</div>
	    	    							<p class="white" style="margin-left:8%; border-radius:5px; padding:1%">${element.comments[position].commentText}</p>
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

function postText(){
    M.toast({html: 'text post',completeCallback:sendPost(1),inDuration:500,outDuration:500})
	
}

function postImage(){
    $('uploadImage').setAttribute('class', "indeterminate")
    M.toast({html: 'image post',completeCallback:sendPost(2),inDuration:500,outDuration:500})
}

function postVideo(){
    $('uploadVideo').setAttribute('class', "indeterminate")
    M.toast({html: 'video post',completeCallback:sendPost(3),inDuration:500,outDuration:500})
}

function postAudio(){
    $('uploadAudio').setAttribute('class', "indeterminate")
    M.toast({html: 'audio post',completeCallback:sendPost(4),inDuration:500,outDuration:500})
}

function sendPost(type_post){
    alert(type_post)
	var formData = new FormData();
	switch(type_post){
	case 1:
		formData.append("type_post", type_post);
        formData.append("post_text", $("text-post").value);
		break;
	case 2:
		formData.append("type_post", type_post);
		if($("text-image").value.trim != null || $("text-image").value.trim != ""){
			formData.append("post_text", $("text-image").value);
		}
		formData.append("files[]", $("image-file").files[0]);
		break;
		
	case 3:
		formData.append("type_post", type_post);
		if($("text-video").value.trim != null || $("text-video").value.trim != ""){
			formData.append("post_text", $("text-video").value);
		}
		formData.append("files[]", $("video-file").files[0]);
        break;
    case 4:
		formData.append("type_post", type_post);
		if($("text-audio").value.trim != null || $("text-audio").value.trim != ""){
			formData.append("post_text", $("text-audio").value);
		}
		formData.append("files[]", $("audio-file").files[0]);
		break;
	default:
		alert("Something is wrong. Reload the Page.");
		break;
	}
	let params = {
			method: 'POST',
			body: formData,
			header: {'Content-Type':'multipart/form-data'},
		}
	fetch("./../post", params)
	.then(resp => resp.json())
    .then(data => {
		console.log(data);
		if(data.status == 200){
            $('uploadImage').removeAttribute('class')
            $('uploadVideo').removeAttribute('class')
            $('uploadAudio').removeAttribute('class')
			window.location.reload();
		}
	})
}
/*function myPost(){
    params = {
        method: 'GET',
        headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'})
    }
    fetch('./../post?user='+dataUser.id, params)
    .then(resp => resp.json())
    .then(data => {
        let post = data.data;
        if (data.status==200){
        console.log(data);
        post.map(element => {
            let date =new Date( element.creationTime);
            let x = date.toDateString();
            console.log(x)        
        console.log(element.typePost);
});
      }else{
      }
    });
}
function like(value){
    /*data ={
        
            postId:value,
            typeLikeId:1
            
    }*//*
    params={
        method: "POST", 
        headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}),
     //   body:JSON.stringify(data) 
}
fetch("./../likes?post_id="+value+"&like_type=1", params)
.then(resp => resp.json())
.then(data => {
    console.log(data);
  if (data.status==200){
      alert(data.message+", status("+data.status+")");
  }else{
      alert(data.message+", status("+data.status+")");
  }
});

}


function comment(value){
    data = {
        commentUrl:"url",
        commentText:value,
        postId:value,
        userId:dataUser.id
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
}*/
$('send').addEventListener('click', ()=>{
    postText();
})
$('sendImage').addEventListener('click', ()=>{
    postImage();
})
$('sendVideo').addEventListener('click', ()=>{
    postVideo();
})
$('sendAudio').addEventListener('click', ()=>{
    postAudio();
})
