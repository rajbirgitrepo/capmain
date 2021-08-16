

var settings = {
    "async": true,
    "crossDomain": true,
    "url":   "/districtupcuser/Agawam School district/csy",
    "method": "GET"
   }
    $.ajax(settings).done(function (response) {
    var dataa=JSON.parse(response); 
    $("#usecount").empty()
    $("#usecount").text(dataa.count)
   
  

$(function() {
$("#container").highcharts({
chart: {
  zoomType: 'xy'
},
title: {
  text: "District Level Playback Usage Pattern"
},credits:{enabled:false},
xAxis: [{visible:false
  
}],
yAxis: [{ //Primary yAxis
  lineWidth:1,
  labels: {
    format: '{value}',
    style: {
      color: '#000'
    }
  },opposite: true,
  title: {
    text: 'UPC',
    style: {
      color: '#000'
    }
  }
}, {//Secondary yAxis
  title: {
    text: 'Audio Percentage(%)',
    style: {
      color: '#4572A7'
    }
  },
  labels: {
    format: '{value}',
    style: {
      color: '#4572A7'
    }
  },
  opposite: false
}],
tooltip: {
  shared: true
},plotOptions: {borderWidth: 2,
  series: {point: {
           
        }}
},
series: [{
  name: 'UPC',
  color: '#01a451',
  type: 'column',
  yAxis: 0,
  data: dataa.playback,
  tooltip: {
   
  }},{
  name: 'AUDIO(%)',
  color: 'orange',
  type: 'line',
  yAxis: 1,
  data: dataa.percentage,
  tooltip: {
   
  }}]
});
});
      });

      var settings = {
        "async": true,
        "crossDomain": true,
        "url":            "/programupcuser/MIDDLE/csy",
        "method": "GET"
       }
        $.ajax(settings).done(function (response) {
        var dataa=JSON.parse(response); 
        $("#usecount1").empty()
        $("#usecount1").text(dataa.count)
       
    $(function() {
    $("#container1").highcharts({
    chart: {
      zoomType: 'xy'
    },
    title: {
      text: "Program Level Playback Usage Pattern"
    },credits:{enabled:false},
    xAxis: [{visible:false
      
    }],
    yAxis: [{ //Primary yAxis
      lineWidth:1,
      labels: {
        format: '{value}',
        style: {
          color: '#000'
        }
      },opposite: true,
      title: {
        text: 'UPC',
        style: {
          color: '#000'
        }
      }
    }, {//Secondary yAxis
      title: {
        text: 'Audio Percentage(%)',
        style: {
          color: '#4572A7'
        }
      },
      labels: {
        format: '{value}',
        style: {
          color: '#4572A7'
        }
      },
      opposite: false
    }],
    tooltip: {
      shared: true
    },plotOptions: {borderWidth: 2,
      series: {point: {
               
            }}
    },
    series: [{
      name: 'UPC',
      color: '#01a451',
      type: 'column',
      yAxis: 0,
      data: dataa.playback,
      tooltip: {
       
      }},{
      name: 'AUDIO(%)',
      color: 'orange',
      type: 'line',
      yAxis: 1,
      data: dataa.percentage,
      tooltip: {
       
      }}]
    });
    });
          });
        

function chartsublit(){
    var a = document.getElementById("firstName").value;
    var b = document.getElementById("firstName1").value;
    $("#container").empty();
    var settings = {
        "async": true,
        "crossDomain": true,
        "url":   "/districtupcuser/"+a+"/"+b,
        "method": "GET",
        error: function(){
            $("#container").append('<div style="background-color: #fff;color: green;width: 50%;margin-left: 19px;margin-top: 20px;padding: 10px;border-radius: 10px;"><p style="margin-top:4px;">No data available in lsy for this district </p></div>');
          }
       }
        $.ajax(settings).done(function (response) {
        var dataa=JSON.parse(response); 
        $("#usecount").empty()
        $("#usecount").text(dataa.count)
        

    
    $(function() {
    $("#container").highcharts({
    chart: {
      zoomType: 'xy'
    },
    title: {
      text: "District Level Playback Usage Pattern"
    },credits:{enabled:false},
    xAxis: [{visible:false
      
    }],
    yAxis: [{ //Primary yAxis
      lineWidth:1,
      labels: {
        format: '{value}',
        style: {
          color: '#000'
        }
      },opposite: true,
      title: {
        text: 'UPC',
        style: {
          color: '#000'
        }
      }
    }, {//Secondary yAxis
      title: {
        text: 'Audio Percentage(%)',
        style: {
          color: '#4572A7'
        }
      },
      labels: {
        format: '{value}',
        style: {
          color: '#4572A7'
        }
      },
      opposite: false
    }],
    tooltip: {
      shared: true
    },plotOptions: {borderWidth: 2,
      series: {point: {
               
            }}
    },
    series: [{
      name: 'UPC',
      color: '#01a451',
      type: 'column',
      yAxis: 0,
      data: dataa.playback,
      tooltip: {
       
      }},{
      name: 'AUDIO(%)',
      color: 'orange',
      type: 'line',
      yAxis: 1,
      data: dataa.percentage,
      tooltip: {
       
      }}]
    });
    });
          });
    
}


function chartsublit2(){
    var a = document.getElementById("firstName2").value;
    var b = document.getElementById("firstName3").value;
    $("#container1").empty();     
var settings = {
    "async": true,
    "crossDomain": true,
    "url":            "/programupcuser/"+a+"/"+b,
    "method": "GET"
   }
    $.ajax(settings).done(function (response) {
    var dataa=JSON.parse(response); 
    $("#usecount1").empty()
    $("#usecount1").text(dataa.count)
  
$(function() {
$("#container1").highcharts({
chart: {
  zoomType: 'xy'
},
title: {
  text: "Program Level Playback Usage Pattern"
},credits:{enabled:false},
xAxis: [{visible:false
  
}],
yAxis: [{ //Primary yAxis
  lineWidth:1,
  labels: {
    format: '{value}',
    style: {
      color: '#000'
    }
  },opposite: true,
  title: {
    text: 'UPC',
    style: {
      color: '#000'
    }
  }
}, {//Secondary yAxis
  title: {
    text: 'Audio Percentage(%)',
    style: {
      color: '#4572A7'
    }
  },
  labels: {
    format: '{value}',
    style: {
      color: '#4572A7'
    }
  },
  opposite: false
}],
tooltip: {
  shared: true
},plotOptions: {borderWidth: 2,
  series: {point: {
           
        }}
},
series: [{
  name: 'UPC',
  color: '#01a451',
  type: 'column',
  yAxis: 0,
  data: dataa.playback,
  tooltip: {
   
  }},{
  name: 'AUDIO(%)',
  color: 'orange',
  type: 'line',
  yAxis: 1,
  data: dataa.percentage,
  tooltip: {
   
  }}]
});
});
      });
    
}


var settings = {
    "async": true,
    "crossDomain": true,
    "url":   "/districtupcfamily/Agawam School district/csy",
    "method": "GET"
   }
    $.ajax(settings).done(function (response) {
    var dataa=JSON.parse(response); 
    $("#usecount2").empty()
    $("#usecount2").text(dataa.count)
   
  
$(function() {
$("#container3").highcharts({
chart: {
  zoomType: 'xy'
},
title: {
  text: "District Level Family Playback Usage Pattern"
},credits:{enabled:false},
xAxis: [{visible:false
  
}],
yAxis: [{ //Primary yAxis
  lineWidth:1,
  labels: {
    format: '{value}',
    style: {
      color: '#000'
    }
  },opposite: true,
  title: {
    text: 'UPC',
    style: {
      color: '#000'
    }
  }
}, {//Secondary yAxis
  title: {
    text: 'Audio Percentage(%)',
    style: {
      color: '#4572A7'
    }
  },
  labels: {
    format: '{value}',
    style: {
      color: '#4572A7'
    }
  },
  opposite: false
}],
tooltip: {
  shared: true
},plotOptions: {borderWidth: 2,
  series: {point: {
           
        }}
},
series: [{
  name: 'UPC',
  color: '#01a451',
  type: 'column',
  yAxis: 0,
  data: dataa.playback,
  tooltip: {
   
  }},{
  name: 'AUDIO(%)',
  color: 'orange',
  type: 'line',
  yAxis: 1,
  data: dataa.percentage,
  tooltip: {
   
  }}]
});
});
      });

      var settings = {
        "async": true,
        "crossDomain": true,
        "url":            "/programupcfamily/MIDDLE/csy",
        "method": "GET"
       }
        $.ajax(settings).done(function (response) {
        var dataa=JSON.parse(response); 
        $("#usecount3").empty()
        $("#usecount3").text(dataa.count)
  
    $(function() {
    $("#container4").highcharts({
    chart: {
      zoomType: 'xy'
    },
    title: {
      text: "Program Level Family Playback Usage Pattern"
    },credits:{enabled:false},
    xAxis: [{visible:false
      
    }],
    yAxis: [{ //Primary yAxis
      lineWidth:1,
      labels: {
        format: '{value}',
        style: {
          color: '#000'
        }
      },opposite: true,
      title: {
        text: 'UPC',
        style: {
          color: '#000'
        }
      }
    }, {//Secondary yAxis
      title: {
        text: 'Audio Percentage(%)',
        style: {
          color: '#4572A7'
        }
      },
      labels: {
        format: '{value}',
        style: {
          color: '#4572A7'
        }
      },
      opposite: false
    }],
    tooltip: {
      shared: true
    },plotOptions: {borderWidth: 2,
      series: {point: {
               
            }}
    },
    series: [{
      name: 'UPC',
      color: '#01a451',
      type: 'column',
      yAxis: 0,
      data: dataa.playback,
      tooltip: {
       
      }},{
      name: 'AUDIO(%)',
      color: 'orange',
      type: 'line',
      yAxis: 1,
      data: dataa.percentage,
      tooltip: {
       
      }}]
    });
    });
          });
        

function chartsublitfam(){
    var a = document.getElementById("firstName4").value;
    var b = document.getElementById("firstName5").value;
    $("#container3").empty();
    var settings = {
        "async": true,
        "crossDomain": true,
        "url":   "/districtupcfamily/"+a+"/"+b,
        "method": "GET",
        error: function(){
            $("#container3").append('<div style="background-color: #fff;color: green;width: 50%;margin-left: 19px;margin-top: 20px;padding: 10px;border-radius: 10px;"><p style="margin-top:4px;">No data available in lsy for this district </p></div>');
          }
       }
        $.ajax(settings).done(function (response) {
        var dataa=JSON.parse(response);
        $("#usecount2").empty() 
        $("#usecount2").text(dataa.count)
        

    
    $(function() {
    $("#container3").highcharts({
    chart: {
      zoomType: 'xy'
    },
    title: {
      text: "District Level Family Playback Usage Pattern"
    },credits:{enabled:false},
    xAxis: [{visible:false
      
    }],
    yAxis: [{ //Primary yAxis
      lineWidth:1,
      labels: {
        format: '{value}',
        style: {
          color: '#000'
        }
      },opposite: true,
      title: {
        text: 'UPC',
        style: {
          color: '#000'
        }
      }
    }, {//Secondary yAxis
      title: {
        text: 'Audio Percentage(%)',
        style: {
          color: '#4572A7'
        }
      },
      labels: {
        format: '{value}',
        style: {
          color: '#4572A7'
        }
      },
      opposite: false
    }],
    tooltip: {
      shared: true
    },plotOptions: {borderWidth: 2,
      series: {point: {
               
            }}
    },
    series: [{
      name: 'UPC',
      color: '#01a451',
      type: 'column',
      yAxis: 0,
      data: dataa.playback,
      tooltip: {
       
      }},{
      name: 'AUDIO(%)',
      color: 'orange',
      type: 'line',
      yAxis: 1,
      data: dataa.percentage,
      tooltip: {
       
      }}]
    });
    });
          });
    
}


function chartsublitsc(){
    var a = document.getElementById("firstName6").value;
    var b = document.getElementById("firstName7").value;
    console.log(a,b)
    console.log("/schoolupcfamily/"+a+"/"+b)
    $("#container4").empty();     
var settings = {
    "async": true,
    "crossDomain": true,
    "url":            "/programupcfamily/"+a+"/"+b,
    "method": "GET"
   }
    $.ajax(settings).done(function (response) {
    var dataa=JSON.parse(response); 
    $("#usecount3").empty()
    $("#usecount3").text(dataa.count)
    
$(function() {
$("#container4").highcharts({
chart: {
  zoomType: 'xy'
},
title: {
  text: "Program Level Family Playback Usage Pattern"
},credits:{enabled:false},
xAxis: [{visible:false
  
}],
yAxis: [{ //Primary yAxis
  lineWidth:1,
  labels: {
    format: '{value}',
    style: {
      color: '#000'
    }
  },opposite: true,
  title: {
    text: 'UPC',
    style: {
      color: '#000'
    }
  }
}, {//Secondary yAxis
  title: {
    text: 'Audio Percentage(%)',
    style: {
      color: '#4572A7'
    }
  },
  labels: {
    format: '{value}',
    style: {
      color: '#4572A7'
    }
  },
  opposite: false
}],
tooltip: {
  shared: true
},plotOptions: {borderWidth: 2,
  series: {point: {
           
        }}
},
series: [{
  name: 'UPC',
  color: '#01a451',
  type: 'column',
  yAxis: 0,
  data: dataa.playback,
  tooltip: {
   
  }},{
  name: 'AUDIO(%)',
  color: 'orange',
  type: 'line',
  yAxis: 1,
  data: dataa.percentage,
  tooltip: {
   
  }}]
});
});
      });
    
}