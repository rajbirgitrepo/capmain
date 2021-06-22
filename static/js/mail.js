 
 var link = document.getElementById('share');
 link.onclick = function() {
 
     this.href = "mailto:you@yourdomain.com?subject=Data&body=";
     this.href += getBody();
 };
 function getBody() {
    var url= window.location.href;
     return url;
 }
 