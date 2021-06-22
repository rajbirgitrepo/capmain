var e = document.getElementById("logid").textContent;
console.log(e);
function idbased()
{
    var i = parseInt(e, 15);
    console.log(i);
  if(i<=7){
    console.log("hello2")

    // $("#userbase").append('<i class="fa fa-home"  aria-hidden="true"></i><a href="#">EXECUTIVE SUMMARY</a><ul class="side-nav-dropdown"><li class="active"><a href="Executive_Dashboard">CAP SUMMARY</a></li><li><a href="feedback_Analyitcs">FEEDBACK ANAYLTICS</a></li>
            <li><a href="sentiment">SENTIMENT ANAYLTICS</a></li><li class="active"><a href="Weekly_Analytics">WEEKLY ANALYTICS</a></li><li class="active"><a href="Daily_Analytics">DAILY ANALYTICS</a></li><li  class="active"><a href="aws_releases">COMPASS RELEASES</a></li><!--<li class="active"><a href="aws">AWS ANALYTICS</a></li>-->');
    $("#trans").append('');

}
  else{
    console.log("h2i")
    // $("#userbase").append('<i class="fa fa-home "  aria-hidden="true"></i><a href="#">EXECUTIVE SUMMARY</a><ul class="side-nav-dropdown"><li><a href="Parents_Analytics">HOME APP OVERVIEW</a></li><li><a href="Weekly_Analytics">WEEKLY ANALYTICS</a></li><li><a href="Daily_Analytics">DAILY ANALYTICS</a></li><li><a href="aws_releases">COMPASS RELEASES</a></li>
<li><a href="schoolsummary">SCHOOL SUMMARY</a></li></ul>');
    $("#trans").append('');

}
}
function executiveurl(){
    var i = parseInt(e, 15);
    if(i<=7){
        console.log("hello user")
    }
    else{
        window.location.href = "School_Analytics";
    }
}