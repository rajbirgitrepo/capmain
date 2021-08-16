$("#iid").append(' <input id="tag" style="width: 100%;padding: 10px;outline: none;border-radius: 0 0 0 0;border: 0;" placeholder="Try Searching school or email" >');
$("#sid").append('<button onclick=search() id="hel">SEARCH</button>'); 
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://capapi.innerexplorer.org/school_search_id",
  "method": "GET"
 }
 $.ajax(settings).done(function (response) {
  var dataa=JSON.parse(response);
  $( function() {
var projects = dataa.data;

$( "#tag" ).autocomplete({
  minLength: 0,
  source: projects,
  focus: function( event, ui ) {
    $( "#tag" ).val( ui.item.label );
    return false;
  },
  select: function( event, ui ) {
    $( "#tag" ).val( ui.item.label );
    $( "#tag-id" ).val( ui.item.value );
    $( "#tagdescription" ).html( ui.item.desc );
    $( "#tag-icon" ).attr( "src", "images/" + ui.item.icon );
    return false;
  }
})
.autocomplete( "instance" )._renderItem = function( ul, item ) {
  return $( "<li>" )
    .append( "<div>" + item.label +"</div>" )
    .appendTo( ul );
};
} );
 });
var input = document.getElementById("tag");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("hel").click();
  }
});


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
// btn.onclick = function() {
//   modal.style.display = "block";
// }

function cose(){
  modal.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


function search(){
  var a = document.getElementById("tagdescription").innerText;
  console.log(a);
  if(a != ''){
  URL = "/schoolsearchid/"+a;
  console.log(URL)
  $("#schoolname").empty();
  $("#practice").empty();
  $("#state").empty();
  $("#usercountse").empty();
  $("#adress").empty();
  $("#email").empty();
  $("#country").empty();
  $("#city").empty();
  $("#admin").empty();
  $("#ucount").empty();
  $("#pcount").empty();
  $("#mindfulness_minutes").empty();
  $("#ratings").empty();
  $("#school").empty();
  $("#city").empty();
  $("#state").empty();
  $("#country").empty();
  $("#signup").empty();
  $("#renewal").empty();
  $("#status").empty();
  Pc(URL);
  modal.style.display = "block";
}
else{
  var a = document.getElementById("tag").value;
  URL = "/schoolsearchid/"+a;
  console.log(URL)
  $("#schoolname").empty();
  $("#practice").empty();
  $("#state").empty();
  $("#usercountse").empty();
  $("#adress").empty();
  $("#email").empty();
  $("#country").empty();
  $("#city").empty();
  $("#admin").empty();
  $("#ucount").empty();
  $("#pcount").empty();
  $("#mindfulness_minutes").empty();
  $("#ratings").empty();
  $("#school").empty();
  $("#city").empty();
  $("#state").empty();
  $("#country").empty();
  $("#signup").empty();
  $("#renewal").empty();
  $("#status").empty();
  Pc(URL);
  modal.style.display = "block";
}
};

function search2(){
  var a = document.getElementById("tag").value;
  URL = "/schoolsearch/"+a
  console.log(URL)
  $("#schoolname").empty();
  $("#practice").empty();
  $("#state").empty();
  $("#usercountse").empty();
  $("#adress").empty();
  $("#email").empty();
  $("#country").empty();
  $("#city").empty();
  $("#admin").empty();
  $("#ucount").empty();
  $("#pcount").empty();
  $("#mindfulness_minutes").empty();
  $("#ratings").empty();
  $("#school").empty();
  $("#city").empty();
  $("#state").empty();
  $("#country").empty();
  $("#signup").empty();
  $("#renewal").empty();
  $("#status").empty();
  Pc(URL);
  modal.style.display = "block";
};

function search22(a){

};

function schoolsearch22(a){
  window.open("School_Search?"+ a);
};

function dismiss(){
  $("#error").empty()
}
function raisequery(){
  var e = document.getElementById("usname").textContent;
  var schoolname = document.getElementById("searchinput").value;
  console.log(e);

  var newName='name='+e;
  var newSubject='&subject=School search ISSUE';
  var newdescription='&description=I cannot find this school in school search. SCHOOL NAME :  '+ schoolname;

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": 'https://xp.innerexplorer.org/compass/capQuery?'+newName+newSubject+newdescription,
      "method": "GET"
     }
     $.ajax(settings).done(function (response){
      
     });
     $("#error").empty()
     $("#error").append('<div style="background-color: #fff;color: green;width: 50%;margin-left: 19px;margin-top: 20px;padding: 10px;border-radius: 10px;"><button onclick="dismiss()" style="padding: 6px;background-color: #fff;color: #ff0033;float: right;border: 0;border-radius: 10px;font-size: 11px;">Dismiss</button><p style="margin-top:4px;">Your Query has been sent to Data Science Team and will be resolved asap.</p></div>');
}

function Pc(URL) {
console.log(URL)
var settings = {
  async: true,
  crossDomain: true,
  url: URL,
  method: "GET",
  success: function() {
    $("#error").empty()
  },
  error: function(){
    $("#error").empty()
    $("#error").append('<div style="background-color: #fff;color: #ff0033;width: 50%;margin-left: 19px;margin-top: 20px;padding: 10px;border-radius: 10px;"><button onclick="raisequery()" style="padding: 6px;background-color: #ff0033;color: #fff;float: right;border: 0;border-radius: 10px;font-size: 11px;">Raise Ticket</button><button onclick="dismiss()" style="padding: 6px;background-color: #fff;color: #ff0033;float: right;border: 0;border-radius: 10px;font-size: 11px;">Dismiss</button><p style="margin-top:4px;">Connection to this school data failed.</p></div>');
  }
};
$.ajax(settings).done(function (response) {
  var dataa = JSON.parse(response);
  console.log(URL)
  $("#schoolname").text("SCHOOL NAME: " + dataa.school_name);
  $("#practice").text(dataa.school_practice_count);
  $("#state").text("STATE: " + dataa.state);
  $("#usercountse").text(dataa.user_count);
  $("#adress").text("ADDRESS: " + dataa.address);
  $("#email").text("ADMIN EMAIL: " + dataa.admin_email);
  $("#country").text("COUNTRY: " + dataa.country);
  $("#city").text("CITY: " + dataa.city);
  $("#admin").text("ADMIN NAME: " + dataa.admin_name);
  var url1 = "/journey/"+dataa.admin_email;
  jou(url1);
});
};

function Pc2(URL) {
  console.log(URL)
  var settings = {
    async: true,
    crossDomain: true,
    url: URL,
    method: "GET",
    success: function() {
      $("#error").empty()
    },
    error: function(){
      $("#error").empty()
      $("#error").append('<div style="background-color: #fff;color: #ff0033;width: 50%;margin-left: 19px;margin-top: 20px;padding: 10px;border-radius: 10px;"><button onclick="raisequery()" style="padding: 6px;background-color: #ff0033;color: #fff;float: right;border: 0;border-radius: 10px;font-size: 11px;">Raise Ticket</button><button onclick="dismiss()" style="padding: 6px;background-color: #fff;color: #ff0033;float: right;border: 0;border-radius: 10px;font-size: 11px;">Dismiss</button><p style="margin-top:4px;">Connection to this school data failed.</p></div>');
    }
  };
  $.ajax(settings).done(function (response) {
    var dataa = JSON.parse(response);
    console.log(URL)
    $("#schoolname").text("SCHOOL NAME: " + dataa.school_name);
    $("#practice").text(dataa.school_practice_count);
    $("#state").text("STATE: " + dataa.state);
    $("#usercountse").text(dataa.user_count);
    $("#adress").text("ADDRESS: " + dataa.address);
    $("#email").text("ADMIN EMAIL: " + dataa.admin_email);
    $("#country").text("COUNTRY: " + dataa.country);
    $("#city").text("CITY: " + dataa.city);
    $("#admin").text("ADMIN NAME: " + dataa.admin_name);
    exp(dataa.school_name);
  });
  };



  function explore(){
    var a = document.getElementById("tagdescription").innerText;
    console.log(a)
    window.open("School_Search?"+ a);
  }


function jou(url1){
var settings = {
  async: true,
  crossDomain: true,
  url: url1,
  method: "GET",
};
$.ajax(settings).done(function (response) {
  var datain = JSON.parse(response);
  console.log(datain);
  $("#ucount").text(datain[0].user_count);
  $("#pcount").text(datain[0].school_practice_count);
  $("#mindfulness_minutes").text(datain[0].mindfulness_minutes);
  $("#ratings").text(datain[0].Star_5_Ratings_Recieved);
  $("#school").text(datain[0].school_name);
  $("#city").text(datain[0].city);
  $("#state").text(datain[0].state);
  $("#country").text(datain[0].country);
  $("#signup").text(datain[0].signup_date);
  $("#renewal").text(datain[0].renewal_date);
  $("#status").text(datain[0].sub_status);
  var practice = datain[0].practice_count;

  $("#practicecount").text(practice);
  $("#uniqueusercount").text(datain[0].unique_user);
  $("#months").text(datain[0].month);

  console.log(datain[0].city);
  console.log(datain[0].students_impacted);
});
};



function P2(URL) {
  console.log(URL)
var settings = {
  async: true,
  crossDomain: true,
  url: URL,
  method: "GET",
  success: function() {
    $("#error").empty()
  },
  error: function(){
    $("#error").empty()
    $("#error").append('<div style="background-color: #fff;color: #ff0033;width: 50%;margin-left: 19px;margin-top: 20px;padding: 10px;border-radius: 10px;"><button onclick="raisequery()" style="padding: 6px;background-color: #ff0033;color: #fff;float: right;border: 0;border-radius: 10px;font-size: 11px;">Raise Ticket</button><button onclick="dismiss()" style="padding: 6px;background-color: #fff;color: #ff0033;float: right;border: 0;border-radius: 10px;font-size: 11px;">Dismiss</button><p style="margin-top:4px;">Connection to this school data failed.</p></div>');
  }
};
$.ajax(settings).done(function (response) {
  var dataa = JSON.parse(response);
  console.log(URL)
  $("#schoolname").text("SCHOOL NAME: " + dataa.school_name);
  $("#practice").text(dataa.school_practice_count);
  $("#state").text("STATE: " + dataa.state);
  $("#usercountse").text(dataa.user_count);
  $("#adress").text("ADDRESS: " + dataa.address);
  $("#email").text("ADMIN EMAIL: " + dataa.admin_email);
  $("#country").text("COUNTRY: " + dataa.country);
  $("#city").text("CITY: " + dataa.city);
  $("#admin").text("ADMIN NAME: " + dataa.admin_name);
  exp(dataa.school_name);
});
};


function jou2(url1){
  var settings = {
    async: true,
    crossDomain: true,
    url: url1,
    method: "GET",
  };
  $.ajax(settings).done(function (response) {
    var datain = JSON.parse(response);
    console.log(datain);
  

    $("#ucount").text(datain[0].user_count);
    $("#pcount").text(datain[0].school_practice_count);
    $("#mindfulness_minutes").text(datain[0].mindfulness_minutes);
    $("#ratings").text(datain[0].Star_5_Ratings_Recieved);
    $("#school").text(datain[0].school_name);
    $("#city").text(datain[0].city);
    $("#state").text(datain[0].state);
    $("#country").text(datain[0].country);
    $("#signup").text(datain[0].signup_date);
    $("#renewal").text(datain[0].renewal_date);
    $("#status").text(datain[0].sub_status);
    var practice = datain[0].practice_count;
  
    $("#practicecount").text(practice);
    $("#uniqueusercount").text(datain[0].unique_user);
    $("#months").text(datain[0].month);
    var url2 = "/schoolsearch/"+datain[0].school_name;
    console.log(url2)
    Pc2(url2);
  });
  };
