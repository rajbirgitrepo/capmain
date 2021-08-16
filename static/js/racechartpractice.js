var settings = {
    "async": true,
    "crossDomain": true,
    "url":             "/racebardis",
    "method": "GET"
   }
    $.ajax(settings).done(function (response) {
    var dataa=JSON.parse(response);
      console.log(dataa.data.family);
/**
* Easing function from https://github.com/danro/easing-js/blob/master/easing.js
*/
var easeOutBounce = function (pos) {
if ((pos) < (1 / 2.75)) {
    return (7.5625 * pos * pos);
}
if (pos < (2 / 2.75)) {
    return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
}
if (pos < (2.5 / 2.75)) {
    return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
}
return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
};

Math.easeOutBounce = easeOutBounce;

$(function () {
var chart,
    dataSequence = dataa.data.user;
var chart,
    dataSequence1 = dataa.data.family;

// Initiate the chart
$('#container').highcharts({

    chart: {
        type: 'bar',
     
  },
    title: {
        text: 'District Playback Race Chart'
    },
    subtitle: {
        text: ''
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: 0,
        y: 50,
        floating: true,
        borderWidth: 1,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
    },
    xAxis: {
        categories:dataa.data.name
    },
    yAxis: {max:70000, stackLabels: {
  enabled: true,
      
  align: 'right',
  formatter: function() {
    var sum = 0;
    var series = this.axis.series;

    for (var i in series) {
      if (series[i].visible && series[i].options.stacking == 'normal')
        sum += series[i].yData[this.x];
    }
    if (this.total > 0) {
      return Highcharts.numberFormat(sum, 1);
    } else {
      return '';
    }
  }
},
        title: {
            text: 'Playback Count'
        }
    },
    tooltip: {
        shared: true,
       headerFormat: '<span>{point.x}</span><br>'
    },
    credits: {
        enabled: false
    },
    plotOptions: { bar: { borderWidth: 0,
  stacking: 'normal',
  dataLabels: {
    enabled: false
    
  }
}
    },
    series: [{
        name: 'TEACHERS',
      color:'#00a651',
      stack:0,
        data: dataSequence[0].data.slice(), animation: {
        duration: 2000,
        // Uses Math.easeOutBounce
        easing: 'easeOutBounce'
    }
    }, {
        name: 'FAMILY',
      color: '#a1dc5f',
       stack:0,
        data: dataSequence1[0].data.slice(),
       animation: {
        duration: 2000,
        // Uses Math.easeOutBounce
        easing: 'easeOutBounce'
    }
    }]
});

chart = $('#container').highcharts();

/**
 * Update the chart. This happens either on updating (moving) the range input,
 * or from a timer when the timeline is playing.
 */
function update(increment) {
    var input = $('#play-range')[0],
        output = $('#play-output')[0];

    if (increment) {
        input.value = parseInt(input.value) + increment;
    }
    chart.series[0].setData(dataSequence[input.value].data);
     chart.series[1].setData(dataSequence1[input.value].data);// Increment dataset (updates chart)
    output.innerHTML = dataSequence[input.value].name; // Output valueCONSOLE
  console.log(input.value)
    if (input.value >= 19) { // Auto-pause
        pause($('#play-pause-button')[0]);
      
    }
}

/**
 * Play the timeline.
 */
function play(button) {
    button.title = 'pause';
    button.className = 'fa fa-pause';
    chart.sequenceTimer = setInterval ( function () {
        update(1);
    }, 1200);

}

/** 
 * Pause the timeline, either when the range is ended, or when clicking the pause button.
 * Pausing stops the timer and resets the button to play mode.
 */
function pause(button) {
    button.title = 'play';
    button.className = 'fa fa-play';
    clearTimeout(chart.sequenceTimer);
    chart.sequenceTimer = undefined;
}

/**
 * Toggle play and pause from the button
 */
$('#play-pause-button').bind('click', function () {
    if (chart.sequenceTimer === undefined) {
        play(this);
    } else {
        pause(this);
    }
});

/**
 * Update the chart when the input is changed
 */
$('#play-range').bind('input', function () {
    update();
});
});
});