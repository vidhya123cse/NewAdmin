
function submitclick()
{
    $('#cover-spin').show(0)
    var email = document.getElementById("login-username").value;
    var password = document.getElementById("login-password").value;

    if(email != "" && password != "")
    {
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode)
        console.log(errorMessage)
        $('#cover-spin').hide(0)
        window.alert("Error:" + errorMessage)
        
      });
    }
    else
    {
        $('#cover-spin').hide(0)
        window.alert("Form is InComplete")
    }
      
    
}



