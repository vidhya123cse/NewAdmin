document.addEventListener("DOMContentLoaded",event => {

    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        window.location.replace("dashboard.html");
    } 
  });
});
  


function submitclick()
{
    var email = document.getElementById("login-username").value;
    var password = document.getElementById("login-password").value;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        window.alert("Error")
      });
      window.location.replace("dashboard.html");
    
}



