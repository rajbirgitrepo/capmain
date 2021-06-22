var settings = {
  async: true,
  crossDomain: true,
  url: "http://127.0.0.1:5000/fastcards",
  method: "GET",
};
$.ajax(settings).done(function (response) {
  var dataa = JSON.parse(response);
  console.log("hello22");
  $("#0c").text(dataa.Fast_clicks);
  $("#1c").text(dataa.weekly_tips_signup);
  $("#2c").text(dataa.book_session);


  $("#0h").text("FASTT Clicks");
  $("#1h").text("weekly Tips Signup");
  $("#2h").text("Book Session");


});

var settings = {
  "async": true,
  "crossDomain": true,
  "url":             "https://mongospider.herokuapp.com/audiowisetrend",
  "method": "GET"
 }
  $.ajax(settings).done(function (response) {
  var dataa=JSON.parse(response);
    console.log(dataa.elem.audio_name[0]);
    var categories = dataa.elem.audio_id;
var categoriesTooltip = ["How can I support my child\u2019s social skills during the pandemic?", "Is my child\u2019s language development on track? ", "My child gets upset when they are told \u201cno\u201d. How can I get them to do what I tell them to do?", "Can you provide strategies to support my child around behaviors like yelling, pushing, hitting, or biting?", "I'm worried about my child going back to preschool. How can I help them be ready?"];
// Create an object to map your data to, where key is abreviation, and value is full length
var categoriesTooltipObj = {};
categories.forEach(function(category, index) {
categoriesTooltipObj[category] = categoriesTooltip[index];
});

var options = {

chart: {
  renderTo: 'container',
  defaultSeriesType: 'column',
zoomType:'y',



},title: {
text: "User Questions"
}, colors: [
         '#00a651',
         '#8ae02b',    
      ],
scrollbar: {
enabled: true
},
navigator: {
enabled: true,xAxis: {tickPositions: []}
},
xAxis: {
visible: false,
  categories: categories
},
yAxis: [{ //Primary yAxis
labels: {
  format: '{value}',
  style: {
    color: '#000'
  }
},
title: {
  text: 'COUNT',
  style: {
    color: '#000'
  }
}
}],
tooltip: {
formatter: function() {
var category = categoriesTooltipObj[this.key];
return 'QUESTION <b>' + category + '</b> : <b>' + this.y + '</b>';
}

},
  credits: {
      enabled: false
  },    
plotOptions: {
series: {point: {
          events: {
              click: function () {
                
                   // alert("http://127.0.0.1:5000/"+this.series.name.slice(5,8)+"/"+this.series.name.slice(0,4)+"/"+this.category);
                
               URL = 'http://127.0.0.1:5000/d3renewaltable/'+this.series.name.slice(5,8)+"/"+this.series.name.slice(0,4)+"/"+this.category;
    console.log(URL);
                Table();
              }
          }
      }}
},
series: [{
name: 'USER', data: [1, 1, 2, 1, 1],
desc: ["How can I support my child\u2019s social skills during the pandemic?", "Is my child\u2019s language development on track? ", "My child gets upset when they are told \u201cno\u201d. How can I get them to do what I tell them to do?", "Can you provide strategies to support my child around behaviors like yelling, pushing, hitting, or biting?", "I'm worried about my child going back to preschool. How can I help them be ready?"]}]
};
var chart = new Highcharts.Chart(options);

$("#list1").on('change', function(){
//alert('f')
var selVal = $("#list1").val();
if(selVal == "USER" || selVal == '')
{
var categoriesTooltip = ["How can I support my child\u2019s social skills during the pandemic?", "Is my child\u2019s language development on track? ", "My child gets upset when they are told \u201cno\u201d. How can I get them to do what I tell them to do?", "Can you provide strategies to support my child around behaviors like yelling, pushing, hitting, or biting?", "I'm worried about my child going back to preschool. How can I help them be ready?"];
// Create an object to map your data to, where key is abreviation, and value is full length
var categoriesTooltipObj = {};
categories.forEach(function(category, index) {
categoriesTooltipObj[category] = categoriesTooltip[index];
});

options.tooltip= {
formatter: function() {
var category = categoriesTooltipObj[this.key];
return 'QUESTION<b>' + category + '</b> : <b>' + this.y + '</b>';
}

},
options.xAxis= {
visible: false,
  categories: categories
},options.xAxis= {
  
},
  options.series = [{name: 'ELEMENTARY', data: [1, 1, 2, 1, 1]}]
}
else if(selVal == "HIGH")
{
 var categories = dataa.high.audio_id;
var categoriesTooltip = dataa.high.audio_name;
// Create an object to map your data to, where key is abreviation, and value is full length
var categoriesTooltipObj = {};
categories.forEach(function(category, index) {
categoriesTooltipObj[category] = categoriesTooltip[index];
});

options.tooltip= {
formatter: function() {
var category = categoriesTooltipObj[this.key];
return 'AUDIO NAME <b>' + category + '</b> : <b>' + this.y + '</b>';
}

},
options.xAxis= {visible: false,
  categories: categories
},
  options.series = [{name: 'HIGH', data: dataa.high.user}]
}
else if(selVal == "MIDDLE")
{   var categories = dataa.middle.audio_id;
var categoriesTooltip = dataa.middle.audio_name;
// Create an object to map your data to, where key is abreviation, and value is full length
var categoriesTooltipObj = {};
categories.forEach(function(category, index) {
categoriesTooltipObj[category] = categoriesTooltip[index];
});

options.tooltip= {
formatter: function() {
var category = categoriesTooltipObj[this.key];
return 'AUDIO NAME <b>' + category + '</b> : <b>' + this.y + '</b>';
}

},options.xAxis= {visible: false,
  categories: dataa.middle.audio_id
},
  options.series = [{name: 'MIDDLE',
data: dataa.middle.user}]
}
else if(selVal == "PRE-K")
{   var categories = dataa.pre_k.audio_id;
var categoriesTooltip = dataa.pre_k.audio_name;
// Create an object to map your data to, where key is abreviation, and value is full length
var categoriesTooltipObj = {};
categories.forEach(function(category, index) {
categoriesTooltipObj[category] = categoriesTooltip[index];
});

options.tooltip= {
formatter: function() {
var category = categoriesTooltipObj[this.key];
return 'AUDIO NAME <b>' + category + '</b> : <b>' + this.y + '</b>';
}

},options.xAxis= {visible: false,
  categories: dataa.pre_k.audio_id
},
  options.series = [{name: 'PRE-K',
data: dataa.pre_k.user}]
}
else
{   var categories = dataa.sound.audio_id;
var categoriesTooltip = dataa.sound.audio_name;
// Create an object to map your data to, where key is abreviation, and value is full length
var categoriesTooltipObj = {};
categories.forEach(function(category, index) {
categoriesTooltipObj[category] = categoriesTooltip[index];
});

options.tooltip= {
formatter: function() {
var category = categoriesTooltipObj[this.key];
return 'AUDIO NAME <b>' + category + '</b> : <b>' + this.y + '</b>';
}

},options.xAxis= {visible: false,
  categories: dataa.sound.audio_id
},
  options.series = [{ name: 'SOUND',
data: dataa.sound.user}]
} 
var chart = new Highcharts.Chart(options);    
});
});

