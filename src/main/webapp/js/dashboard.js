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
    user.innerHTML = '<i class="material-icons left">account_circle</i>' + dataUser.username;
    Name.innerHTML =dataUser.name+'<span id="user" style="font-size: 20px;color: grey;padding-left:3%">@'+  dataUser.username+'</span>';
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
/*window.onload = ()=>{
    myPost();
}*/