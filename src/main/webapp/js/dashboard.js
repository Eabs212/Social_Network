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
            let date = new Date(element.creationTime)
	    			switch(op){
	    				case 1:
	    					$('feed').innerHTML += `
	    		    			<br>
	    		    			<div id="post-container" class="light-blue darken-2">
		    		    			<div id="post" class="white center">
	    								<div style="display:flex">
	    									<div style="margin-left:2%;width:20%">
	    										<img src="${element.user.avatar}" alt="profile img" class="responsive-img circle" width="60%" height="80%">
	    										<h5 class="center">${element.user.username}</h5>
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
	    										<img src="${element.user.avatar}" alt="profile img" class="responsive-img circle" width="60%" height="80%">
	    										<h5 class="center">${element.user.username}</h5>
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
	    										<img src="${element.user.avatar}" alt="profile img" class="responsive-img circle" width="60%" height="80%">
	    										<h5 class="center">${element.user.username}</h5>
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
	    										<img src="${element.user.avatar}" alt="profile img" class="responsive-img circle" width="60%" height="80%">
	    										<h5 class="center">${element.user.username}</h5>
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
	M.toast({html: 'Bye!',completeCallback:window.location.href = "./../",inDuration:500,outDuration:500})
      location.href = "./../";
  }else{
	M.toast({html: data.message+", status("+data.status+")",inDuration:500,outDuration:500})
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
}*/
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
	  M.toast({html: 'Already liked'})
}
});

}
function dislike(value){
    data ={
            postId:value,
            typeLikeId:2
            
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
	M.toast({html: 'dislike post',completeCallback:window.location.reload(),inDuration:500,outDuration:500})
  }else{
	M.toast({html: 'Already disliked'})
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
	M.toast({html: 'comment post',completeCallback:window.location.reload(),inDuration:500,outDuration:500})
}else{
	M.toast({html: data.message+", status("+data.status+")",inDuration:500,outDuration:500})
}
});    
}
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
function imag(){
var elems = document.querySelectorAll('.materialboxed');
var instances = M.Materialbox.init(elems, {});}