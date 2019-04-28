function $(id){
    return document.getElementById(id);
}
function register() {

    let data={
        name:$('name').value,
        lastName:$('lastName').value,
        username:$('user').value,
        email:$('email').value,
        password:$('password').value,
        birthday:$('date').value,
        sex: $('male').checked,
    },
    params={
        method: "POST", 
        headers: new Headers({'Content-Type': 'application/json'}), 
        body:JSON.stringify(data) 
}
fetch("./../register", params)
.then(resp => resp.json())
.then(data => {
    console.log(data);
  if (data.status==200){
      location.href = "./../views/login.html";
  }else{
    alert(data.message+", status("+data.status+")");
  }
});
}
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems,{ format:"yyyy-mm-dd",yearRange:[1970,2019]});
  });


