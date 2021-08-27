
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": '/chartdesc',
    "method": "GET"
   }
   $.ajax(settings).done(function (response) {
    var dataa=JSON.parse(response);
    console.log("this is jira");
  // $('#jira').text(dataa.Jirar);
  //  $('#jirac').text(dataa.Jirac);
  // $('#jirae').text(dataa.jirae);
  $('#App_Uninstall').text(dataa.App_Uninstall);
  $('#Crashes').text(dataa.Crashes);
  $('#App_exception').text(dataa.App_exception);
  $('#users_impacted').text(dataa.users_impacted);
  $('#payment_decrease').text(dataa.payment_decrease);
   });



   var settings = {
    "async": true,
    "crossDomain": true,
    "url": '/insights',
    "method": "GET"
   }
   $.ajax(settings).done(function (response) {
    var dataa=JSON.parse(response);
    console.log(dataa)
    for (var i = 0; i < dataa.INSIGHTS.length; i++){
    $("#insightmain").append('<li class="inline-text f-12">'+dataa.INSIGHTS[i]+'</li><hr/>')
  }
   });


  function cardscount3(a){
  var settings = {
  async: true,
  crossDomain: true,
  url: "/playback_cards_week/"+a,
  method: "GET",
  };
  $.ajax(settings).done(function (response) {
  var dataa = JSON.parse(response);
  
  var c = parseInt(dataa.totalchange[0]);
  
  if(c===1){
    console.log("hello2")
    document.getElementById("updownpractotalWeekly").style.color = "green";
  }
  else if(c===-1) {
    console.log("hWeeklyi")
    document.getElementById("updownpractotalWeekly").style.color = "#ff0000";
  }
  else {
      document.getElementById("updownpractotalWeekly").style.color = "grey";
    }

    $("#updownpractotalWeekly").text(parseFloat(dataa.total_percentage_change[0]).toFixed(0) + "%");
  $("#w2").text(dataa.total_playback_last_week[0]);

  
  });
  var settings = {
  async: true,
  crossDomain: true,
  url: "/SIGNUPS_WEEK/"+a,
  method: "GET",
  };
  $.ajax(settings).done(function (response) {
  var dataa = JSON.parse(response);
  var c = parseInt(dataa.totalchanged[0]);
  
  if(c===1){
    console.log("hello2")
    document.getElementById("updownsigntotalWeekly").style.color = "green";
  }
  else if(c===-1) {
    console.log("hWeeklyi")
    document.getElementById("updownsigntotalWeekly").style.color = "#ff0000";
  }
  else {
    document.getElementById("updownsigntotalWeekly").style.color = "grey";
    }
  $("#updownsigntotalWeekly").text(parseFloat(dataa.total_percentage_change[0]).toFixed(0) + "%");
  $("#w1").text(dataa.total_signup_last_week[0]);
  });

  }
  
  var d = new Date();
  var currMonth = d.getMonth()+1;
             var currYear = d.getFullYear();
             var currDate = d.getDate();
  
             var startDate = new Date(currYear, currMonth, currDate);
             console.log(startDate);
  var f = currYear +"-"+currMonth +"-"+currDate;
  $("#dailydate").text(f);
  $("#weeklydate").text(f);

  cardscount(f);
  cardscount3(f);
  

  console.log("this is jira");
  // var settings = {
  //     "async": true,
  //     "crossDomain": true,
  //     "url": '/chartdesc',
  //     "method": "GET"
  //    }
  //    $.ajax(settings).done(function (response) {
  //     var dataa=JSON.parse(response);
  //     console.log("this is jira");
  //   $('#jira').text(dataa.Jirar);
  //    $('#jirar').text(dataa.Jirac);
  //   $('#jirae').text(dataa.jirae);
  //    });
   
  function cardscount(a){
         
  var settings = {
    async: true,
    crossDomain: true,
    url: "/SIGNUPS_dailycomparsion/"+a,
    method: "GET",
  };
  $.ajax(settings).done(function (response) {
    var dataa = JSON.parse(response);
    var c = parseInt(dataa.totalchanged[0]);
  
  if(c===1){
    console.log("hello2")
    document.getElementById("updownsigntotalDaily").style.color = "green";
  }
  else if(c===-1) {
    console.log("h2i")
    document.getElementById("updownsigntotalDaily").style.color = "#ff0000";
  }
  else {
    document.getElementById("updownsigntotalDaily").style.color = "grey";
    }
    $("#updownsigntotalDaily").text(parseFloat(dataa.Total_percentage_change[0]).toFixed(0) + "%");
    $("#d1").text(dataa.total_signup_yesterday[0]);

  });
  var settings = {
    async: true,
    crossDomain: true,
    url: "/jiratickets/"+a,
    method: "GET",
  };
  $.ajax(settings).done(function (response) {
    var dataa = JSON.parse(response);
    console.log(dataa);
    
  
    
    $("#totaljira").text(dataa.total_tickets);
    $("#jiraresolved").text(dataa.done);
    $("#jiraescalated").text(dataa.escalated);
  
  });
  
  var settings = {
    async: true,
    crossDomain: true,
    url: "/last_day_pr/"+a,
    method: "GET",
  };
  $.ajax(settings).done(function (response) {
    var dataa = JSON.parse(response);
   
  
    var c = parseInt(dataa.TOTALCHANGE[0]);
  
  if(c===1){
    console.log("hello2")
    document.getElementById("updownpractotalDaily").style.color = "green";
  }
  else if(c===-1) {
    console.log("h2i")
    document.getElementById("updownpractotalDaily").style.color = "#ff0000";
  }
  else {
      document.getElementById("updownpractotalDaily").style.color = "grey";
    }
  

    $("#updownpractotalDaily").text(parseFloat(dataa.TOTAL_percentagechange[0]).toFixed(0) + "%");
    $("#d2").text(dataa.total_playback_24hr[0]);
  });
  
  }
