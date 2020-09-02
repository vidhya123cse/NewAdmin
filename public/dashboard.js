function SignOut()
{
    firebase.auth().signOut().then(function() {
      }).catch(function(error) {
       console.log(error.message)
      });
      
      window.location.href = "index.html";
}
const form=document.querySelector('#managerform');
const db=firebase.firestore();


//Submit form
function myFunction() {
  // Get Values from the DOM
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var pos = document.getElementById("position").value;

  saveMessage(name, email, phone, pos);


  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
  document.getElementById('managerform').reset();
}




// Save message to firebase
function saveMessage(name, email, phone, pos){
    var newRef = db.collection("manager").doc();
    newRef.set({
      name:name,
      email:email,
      phone:phone,
      pos:pos,
      id:newRef
    });
    
  
};

