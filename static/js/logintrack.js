document.getElementById('login').addEventListener('submit',sendmessage);
function sendmessage(e){
	e.preventDefault();
  
	// Get values
	var name = getInputVal('username');
	
	
	
	

  
	
console.log(name,subject);


var newName=name+"/?amount=1";


const countEl = document.getElementById('count');
updateVisitCount();
function updateVisitCount() {
	fetch('https://api.countapi.xyz/update/capxp/'+newName)
	
	.then(res => res.json())
	.then(res => {
		countEl.innerHTML = res.value;
		console.log(pageName);
	})
}
 
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
  
