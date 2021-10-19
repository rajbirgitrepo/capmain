var outerMenu = [
      [
    {
        "Executive_Summary2" : "CAP SUMMARY",
        "Executive_Summary2" : "CAP SUMMARY",
        "Executive_Summary2" : "CAP SUMMARY"

    }
    ],
];

var keys = []
for (var i = 0; i < outerMenu.length; i++) {
    for (var j = 0; j < outerMenu[i].length; j++){
        console.log(outerMenu[i][j])
        for (var k in outerMenu[i][j]){
            keys.push(k);
            var resultmain = createSidemenuDiv(keys)
            console.log(resultmain);
            $("#sidemenudivs").append(resultmain);
        }
        console.log(keys)
        var min = keys[0]
        console.log(min)
        $(min).append('<li class="active2"><a href="Executive_Dashboard">CAP SUMMARY</a></li>');
    }

}


function createSidemenuDiv(userList) {
    var dynamicDiv = "";
    console.log(userList);
    dynamicDiv +=
      "<li>" +
      "<i class='fa fa-home' aria-hidden='true'></i>" +
      "<a href='#'>" +
      userList[0] +
      "</a>"+
      '<ul class="side-nav-dropdown" id="'+ userList[0] +
      '"></ul></li>';
    keys = []
    return dynamicDiv;
  }
{/* <li>
                <i class="fa fa-home" aria-hidden="true"></i>
                <a href="#">EXECUTIVE SUMMARY</a>
                <ul class="side-nav-dropdown">
                    <li class="active2"><a href="Executive_Dashboard">CAP SUMMARY</a></li>
                    <li class="active2"><a href="Daily_Analytics">DAILY ANALYTICS</a></li>
                </ul>
            </li> */}