imgd('3');
function imgd(a){
  console.log("iamge", a);
  $("#imgdis").empty();
  $("#imgdis").append('<img src="/static/images/'+ a +'.png" class="img-responsive" alt="School" style="color: #797979; width: 100%;">');
}
function modal2(){
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
}
function cose(){
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }
distselect('5f2609807a1c0000950bb477');
function distselect(distid){
      $("#districtid").empty();
      $("#school").empty();
      $("#teacher").empty();
     $("#login").empty();
     $("#practice").empty();
     $("#family").empty();
     $("#myDiv").empty();
     $("#myDiv2").empty();
     $("#disdetails").text(distid);
      var modal = document.getElementById("myModal");
      modal.style.display = "none";
      console.log(distid)
      charts(distid);
      cardcount(distid);
      }

function charts(a){
var settings = {
    "async": true,
    "crossDomain": true,
    "url":             "/districtddtchart/"+a,
    "method": "GET"
   }
    $.ajax(settings).done(function (response) {
    var dataa=JSON.parse(response);
      console.log(dataa)
Highcharts.chart('container', {
chart: {
    type: 'column'
},
colors: [
           '#41b6e6',
            '#01a451'
           
           
        ],
title: {
    text: 'District DDT'
},
xAxis: {
    categories: dataa.data.CSY.Practice_Standard,min: 0,
    crosshair: false
},
yAxis: {
  lineWidth: 1,
    min: 0,
    title: {
        text: ' User Count'
    }
},
tooltip: {
    headerFormat: '<span>{point.x}:2020</span><br>',
    pointFormat: '<span>{series.name}</span><span{point.name}></span>: <b>{point.y}<b>{series.data2}'
},
plotOptions: {
    column: {
        pointPadding: 0.2,
        borderWidth: 0
    },
    series: {
           point: {
            events: {
                click: function () {
                  // console.log("hellooooo",this.category);
                  
                  URL = 'https://schooldashb.herokuapp.com/renewal20/'+this.category+"/"+this.series.name.slice(18,24);
                  
                  console.log(URL);
                   Table2()
                }}}
        }},
series: [{
            name: 'CSY',
            data: dataa.data.CSY.School_Count
        }, {
            name: 'OVERALL',
            data: dataa.data.Overall.School_Count
        }]
});
});


var settings = {
    "async": true,
    "crossDomain": true,
    "url": '/districtddtcard/'+a,
    "method": "GET"
   }
   $.ajax(settings).done(function (response) {
    var dataa = JSON.parse(response);
    console.log('functionrun');
    $('#ddt1').text(dataa.data.Schools_below_Average);
     $('#ddt2').text(dataa.data.Schools_above_Average);
     $('#ddt3').text(+dataa.data.Dormant_Schools); 
     $('#ddt4').text(+dataa.data.District_Average_Mindful_Minutes); 
   });
};

function cardcount(id){
    URL = "/districtcardsinfo/" + id + "/2015-03-01/2021-4-3";
    console.log(URL);
    var settings = {
async: true,
crossDomain: true,
url: URL,
method: "GET",
};
$.ajax(settings).done(function (response) {
var dataa = JSON.parse(response);
console.log("counts are fnctioning");

$("#districtid").text(dataa.district);
$

});
}