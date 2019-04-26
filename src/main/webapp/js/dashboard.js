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
    user.innerHTML = '<i class="material-icons left">account_circle</i>'+ dataUser.username;
    Name.innerHTML =dataUser.name+'<span id="user" style="font-size: 20px;color: grey;padding-left:3%">'+  dataUser.username+'</span>';
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
function myPost(){
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
            switch(element.typePost) {
                case 1:
                console.log(element);
                console.log(element.idPost);
                element.comments.forEach(n => {
                    console.log(n)

                } )
                $('feed').innerHTML +=`
                <div class="input-field red" style="border: 1px solid #212121 ;border-radius: 10px;height:auto ;padding: 1%;margin-bottom: 2%;margin-top: 2% ">
                <div style="display:flex">
                    <div style="width: 12%;height: 30%;margin-right:4%">
                        <img src="avatar.png" alt="no cargo" class="responsive-img circle" width="90%" height="80%">
                        <p>${x}</p>                      
                    </div>
                    <div >
                      <div style="display:flex">
                        <h5 class="user">${dataUser.name+" "+dataUser.lastName}</h5><span style="padding-top: 11%;">@${dataUser.username}</span>
                      </div>
                      <p>${element.postText}</p>

                    </div>
                </div>
                <div class="divider grey darken-4" style="margin-bottom: 1%"></div>
                <div class="grey darken-4 col s12 row" style="border: 1px solid #212121; border-radius: 5px;max-height:25vh;overflow: auto;height: 25vh;">
                <textarea class="materialize-textarea white" placeholder="comenta algo" name="" id="${element.idPost}" cols="30" rows="10" style="width: 60vw;margin-left: 2%;overflow: auto;height: 60px;border: 1px solid #212121; border-radius: 10px; color: black"></textarea>
                <div style="display: flex">
                <h6 style="padding-top: .5%;margin-right: 2%;color:white">${dataUser.username}:</h6>
                <p class="white" style="border-radius: 5px;padding: .5%">${element.comments}</p>
                </div>
              </div>
                  <a href="" onclick="like(${element.idPost})" class="btn grey darken-4 " style="width: 50%;">like${" "+element.likes.length}</a>
                  <a href="" onclick="comment(${element.idPost})" class="btn right grey darken-4" style="width: 50%;">comments${" "+element.comments.length}</a>
            </div>
                `
                break;
            }
        });
      }else{
      }
    });
}
function like(value){
    /*data ={
        
            postId:value,
            typeLikeId:1
            
    }*/
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

function send(){
    data = {
        typePost:"1",
	    postText:$('text-post').value
    },
    params={
        method: "POST", 
        headers: new Headers({'Content-Type': 'application/json'}), 
        body:JSON.stringify(data) 
}
fetch("./../post", params)
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
function sendAudio(){
    data = {
        typePost:"4",
	    postText:$('text-post').value
    },
    params={
        method: "POST", 
        headers: new Headers({'Content-Type': 'application/json'}), 
        body:JSON.stringify(data) 
}
fetch("./../post", params)
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
function sendImg(){
    data = {
        typePost:"2",
	    postText:$('text-post').value
    },
    params={
        method: "POST", 
        headers: new Headers({'Content-Type': 'application/json'}), 
        body:JSON.stringify(data) 
}
fetch("./../post", params)
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
function sendVideo(){
    data = {
        typePost:"3",
	    postText:$('text-post').value
    },
    params={
        method: "POST", 
        headers: new Headers({'Content-Type': 'application/json'}), 
        body:JSON.stringify(data) 
}
fetch("./../post", params)
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
}
$('send').addEventListener('click', ()=>{
    send();
})
window.onload = ()=>{
    myPost();
}