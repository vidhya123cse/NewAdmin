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


function create_UUID(){
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

console.log(create_UUID());

static var c=0
// Save message to firebase
function saveMessage(name, email, phone, pos){
    uuid=create_UUID();
    var newRef = db.collection("manager").doc(uuid);
  
    newRef.set({
      name:name,
      email:email,
      phone:phone,
      pos:pos,
      id:uuid
    });
    c=c+1;
    var countref = db.collection("count").doc("managercount");
 
    countref.set({
      manager:c
    });
    
  
};

