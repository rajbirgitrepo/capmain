document.getElementById('contactForm').addEventListener('submit',sendmessage);
function sendmessage(e){
	e.preventDefault();
  
	// Get values
	var name = getInputVal('name');
	
	var subject = getInputVal('subject');
	
	var description = getInputVal('description');

  
	// Save message
  //  "url": 'https://xp.innerexplorer.org/compass/capQuery?'+newName+newSubject+newdescription,
console.log(name,subject,description);

var newName='name='+name;
var newSubject='&subject='+subject;
var newdescription='&description='+description;

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": 'https://innerexplorer.org/compass/capQuery?'+newName+newSubject+newdescription,
      "method": "GET"
     }
     $.ajax(settings).done(function (response){
         alert("message sent")
     });
 
  }
  function getInputVal(id){
	return document.getElementById(id).value;
  }
   
  // Function to get get form values
  function getInputVal(id){
	return document.getElementById(id).value;
  }

  function saveMessage(name,  email,  message){
	var newMessageRef = messagesRef.push();
	newMessageRef.set({
	  name: name,
	  
	  email:email,
	  
	  message:message
	});
  }
  
