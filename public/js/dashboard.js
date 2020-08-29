function SignOut()
{
    firebase.auth().signOut().then(function() {
       // window.location.replace("dashboard.html");
       window.location.replace("index.html");
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
      
}