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


//display count
  var docRef = db.collection("count").doc("allcount");
  docRef.get().then(function(doc) {
  if (doc.exists) {
  doc= doc.data();
  managercount=doc.manager;
  console.log(managercount)
  document.getElementById("man").innerHTML = managercount;

  }
});


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
//new manager added

  var docRef = db.collection("count").doc("allcount");
  docRef.get().then(function(doc) {
  if (doc.exists) {
  console.log("Document data:", doc.data());
  doc= doc.data();
  value=doc.manager;
  value++

  docRef.update({
    manager:value
  });
  console.log(value);
  //manager count added
  
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
  }).catch(function(error) {
  console.log("Error getting document:", error);
  });
};


function handleFileSelect() {
  return document.getElementById('fileUpload').files[0];
};

function ExcelProcess()
{

  var file = handleFileSelect();
  console.log(file.name)
    if (file) {

      var storage = firebase.storage().ref(file.name);
      var upload = storage.put(file);
      upload.on(
        "state_changed",
        function progress(snapshot) {
          var percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          document.getElementById("progress").value = percentage;
        },

        function error() {
          alert("error uploading file");
        },
        function() {
          console.log("hello")
           upload.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
            const proxyurl = "https://telemonitor-aea77.web.app/";
            var url = 'soccer_players.xlsx';
           

/* set up async GET request */
var req = new XMLHttpRequest();
req.open("GET", url, true);
req.responseType = "arraybuffer";

req.onload = function(e) {
  var data = new Uint8Array(req.response);
  var workbook = XLSX.read(data, {type:"array"});

  var first_sheet_name = workbook.SheetNames[0];
  var worksheet = workbook.Sheets[first_sheet_name];
  jsonsheet = XLSX.utils.sheet_to_json(worksheet)
  console.log(jsonsheet)

    db.collection("menu").doc().set({jsonsheet}).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

}

req.send();
      
})})
    }}


    function handleImageUpload() {
      
      const formData = new FormData()
      formData.append('myFile', handleFileSelect())
    
      fetch('', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.path)
      })
      .catch(error => {
        console.error(error)
      })
    }
    
   