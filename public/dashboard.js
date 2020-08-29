function SignOut()
{
    firebase.auth().signOut().then(function() {
      }).catch(function(error) {
       console.log(error.message)
      });
      
      window.location.href = "index.html";
}