var url = window.location.href;
//  console.log(url);
 var params = url.split('/')[3];
//  console.log(params);
 var pageName=params+'/?amount=1';
//  console.log(pageName);

 const countEl = document.getElementById('count');
updateVisitCount();
function updateVisitCount() {
	fetch('https://api.countapi.xyz/update/capxp/'+pageName)
	
	.then(res => res.json())
	.then(res => {
		countEl.innerHTML = res.value;
		console.log(pageName);
	})
}