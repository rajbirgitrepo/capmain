// Prepare demo data
// Data is joined to map using value of 'hc-key' property by default.
// See API docs for 'joinBy' for more info on linking data and map.
var data = [ 
  {'code': 'wa',  'value': 27, 'hc-key':'us-wa' } ,
  {'code': 'or', 'value': 33, 'hc-key': 'us-or'},
  {'code': 'ca', 'value': 931, 'hc-key': 'us-ca'},
  {'code': 'nv', 'value': 7, 'hc-key': 'us-nv'},
  {'code': 'id', 'value': 9, 'hc-key': 'us-id'},
  {'code': 'az', 'value': 37, 'hc-key': 'us-az'},
  {'code': 'ut', 'value': 96, 'hc-key': 'us-ut'},
  {'code': 'wy', 'value': 6, 'hc-key': 'us-wy'},
  {'code': 'co', 'value': 77, 'hc-key': 'us-co'},
  {'code': 'nm', 'value': 10, 'hc-key': 'us-nm'},
  {'code': 'sd', 'value': 12, 'hc-key': 'us-sd'},
  {'code': 'ne', 'value': 6, 'hc-key': 'us-ne'},
  {'code': 'ks', 'value': 5, 'hc-key': 'us-ks'},
  {'code': 'ok', 'value': 3, 'hc-key': 'us-ok'},
  {'code': 'tx', 'value': 116, 'hc-key': 'us-tx'},
  {'code': 'mn', 'value': 14, 'hc-key': 'us-mn'},
  {'code': 'ia', 'value': 8, 'hc-key': 'us-ia'},
  {'code': 'mo', 'value': 9, 'hc-key': 'us-mo'},
  {'code': 'ar', 'value': 16, 'hc-key': 'us-ar'},
  {'code': 'la', 'value': 7, 'hc-key': 'us-la'},
  {'code': 'mi', 'value': 144, 'hc-key': 'us-mi'},
  {'code': 'in', 'value': 14, 'hc-key': 'us-in'},
  {'code': 'il', 'value': 108, 'hc-key': 'us-il'},
  {'code': 'ky', 'value': 5, 'hc-key': 'us-ky'},
  {'code': 'tn', 'value': 52, 'hc-key': 'us-tn'},
  {'code': 'al', 'value': 65, 'hc-key': 'us-al'},
  {'code': 'ga', 'value': 73, 'hc-key': 'us-ga'},
  {'code': 'fl', 'value': 727, 'hc-key': 'us-fl'},
  {'code': 'sc', 'value': 4, 'hc-key': 'us-sc'},
  {'code': 'nc', 'value': 38, 'hc-key': 'us-nc'},
  {'code': 'va', 'value': 25, 'hc-key': 'us-va'},
  {'code': 'wv', 'value': 2, 'hc-key': 'us-wv'},
  {'code': 'pa', 'value': 64, 'hc-key': 'us-pa'},
  {'code': 'ny', 'value': 196, 'hc-key': 'us-ny'},
  {'code': 'me', 'value': 7, 'hc-key': 'us-me'},
  {'code': 'vt', 'value': 3, 'hc-key': 'us-vt'},
  {'code': 'nh', 'value': 23, 'hc-key': 'us-nh'},
  {'code': 'ma', 'value': 206, 'hc-key': 'us-ma'},
  {'code': 'ri', 'value': 2, 'hc-key': 'us-ri'},
  {'code': 'ct', 'value': 37, 'hc-key': 'us-ct'},
  {'code': 'nj', 'value': 60, 'hc-key': 'us-nj'},
  {'code': 'de', 'value': 5, 'hc-key': 'us-de'},
  {'code': 'md', 'value': 14, 'hc-key': 'us-md'},
  {'code': 'dc', 'value': 7, 'hc-key': 'us-dc'},
  {'code': 'ak', 'value': 10, 'hc-key': 'us-ak'},
  {'code': 'hi', 'value': 11, 'hc-key': 'us-hi'},
  {'code': 'oh', 'value': 113, 'hc-key': 'us-oh'},
  {'code': 'wi', 'value': 92, 'hc-key': 'us-wi'},
  {'code': 'n.dak', 'value': 14, 'hc-key': 'us-n.dak'},
  {'code': 'mt', 'value': 27, 'hc-key': 'us-mt'},
  {'code': 'ms', 'value': 2, 'hc-key': 'us-ms'},
  {'hc-key': 'usd', 'code': 'us', 'value': 88}
            ];

let URL = 'https://capschooldash.herokuapp.com/map/ohio'

function getStateMap() {
  var mapData = Highcharts.maps['countries/us/custom/us-small'];

  // Add block for US aggregate
  mapData.features.unshift({
    "type": "Feature",
    "id": "US",
    "properties": {
      "hc-group": "admin1",
      "hc-middle-x": 0.52,
      "hc-middle-y": 0.59,
      "hc-key": "us",
      "name": "United States"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [9727, 3744],
          [10595, 3744],
          [10595, 3217],
          [9727, 3217],
          [9727, 3744]
        ]
      ]
    }
  });

  var statesMap = Highcharts.geojson(mapData);

  $.each(statesMap, function() {
    var path = this.path,
      copy = {
        path: path
      };

    // This point has a square legend to the right
    if (path[1] === 9727) {

      // Identify the box
      Highcharts.seriesTypes.map.prototype.getBox.call({}, [copy]);

      // Place the center of the data label in the center of the point legend box
      this.middleX = ((path[1] + path[4]) / 2 - copy._minX) / (copy._maxX - copy._minX);
      this.middleY = ((path[2] + path[7]) / 2 - copy._minY) / (copy._maxY - copy._minY);
    }

    // Tag it for joining
    this.ucName = this.name.toUpperCase();
  });
  return statesMap;
}

// Create the chart
Highcharts.mapChart('container', {
  title: {
    text: ''
  },

  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: 'bottom'
    }
  },
  
  
  
  
  
  

  colorAxis: {
    min: 0,
        stops: [
          [0, '#b6edab'],
          [0.5, Highcharts.getOptions().colors[1]],
          [1, Highcharts.Color(Highcharts.getOptions().colors[2]).brighten(-0.5).get()]
 ] },
 

 
 
  tooltip: {
    enabled: true,
    formatter: function() {
    
      if (this.point.value) {
        return this.point.name + ': ' + this.point.value;
      } else {
        return this.point.name + ': ' + "NA";
      }
    }
  },
  series: [{
    data: data,
    name: 'Random data',
    mapData: getStateMap(),
    events: {
                    click: function (e) {
                        {
  // alert(e.point.name); //changes here
  URL = 'https://capschooldash.herokuapp.com/map/' + e.point.name;
                         
  Table()
   // Table.destroy();
}
                    }
                },
    states: {
      hover: {
        color: '#ffffff00'
        
      },
    },
    dataLabels: {
      enabled: true,
      format: '{point.code}'
    }
  }, {
    name: 'Separators',
    type: 'mapline',
    data: Highcharts.geojson(Highcharts.maps['countries/us/custom/us-small'], 'mapline'),
    color: 'silver',
    showInLegend: false,
    enableMouseTracking: false
  }]
});








(function(window, document, undefined) {

  var factory = function($, DataTable) {
    "use strict";

    $('.search-toggle').click(function() {
      if ($('.hiddensearch').css('display') == 'none')
        $('.hiddensearch').slideDown();
      else
        $('.hiddensearch').slideUp();
    });

    /* Set the defaults for DataTables initialisation */
    $.extend(true, DataTable.defaults, {
      dom: "<'hiddensearch'f'>" +
        "tr" +
        "<'table-footer'lip'>",
      renderer: 'material'
    });

    /* Default class modification */
    $.extend(DataTable.ext.classes, {
      sWrapper: "dataTables_wrapper",
      sFilterInput: "form-control input-sm",
      sLengthSelect: "form-control input-sm"
    });

    /* Bootstrap paging button renderer */
    DataTable.ext.renderer.pageButton.material = function(settings, host, idx, buttons, page, pages) {
      var api = new DataTable.Api(settings);
      var classes = settings.oClasses;
      var lang = settings.oLanguage.oPaginate;
      var btnDisplay, btnClass, counter = 0;

      var attach = function(container, buttons) {
        var i, ien, node, button;
        var clickHandler = function(e) {
          e.preventDefault();
          if (!$(e.currentTarget).hasClass('disabled')) {
            api.page(e.data.action).draw(false);
          }
        };

        for (i = 0, ien = buttons.length; i < ien; i++) {
          button = buttons[i];

          if ($.isArray(button)) {
            attach(container, button);
          } else {
            btnDisplay = '';
            btnClass = '';

            switch (button) {

              case 'first':
                btnDisplay = lang.sFirst;
                btnClass = button + (page > 0 ?
                  '' : ' disabled');
                break;

              case 'previous':
                btnDisplay = '<i class="material-icons">chevron_left</i>';
                btnClass = button + (page > 0 ?
                  '' : ' disabled');
                break;

              case 'next':
                btnDisplay = '<i class="material-icons">chevron_right</i>';
                btnClass = button + (page < pages - 1 ?
                  '' : ' disabled');
                break;

              case 'last':
                btnDisplay = lang.sLast;
                btnClass = button + (page < pages - 1 ?
                  '' : ' disabled');
                break;

            }

            if (btnDisplay) {
              node = $('<li>', {
                  'class': classes.sPageButton + ' ' + btnClass,
                  'id': idx === 0 && typeof button === 'string' ?
                    settings.sTableId + '_' + button : null
                })
                .append($('<a>', {
                    'href': '#',
                    'aria-controls': settings.sTableId,
                    'data-dt-idx': counter,
                    'tabindex': settings.iTabIndex
                  })
                  .html(btnDisplay)
                )
                .appendTo(container);

              settings.oApi._fnBindAction(
                node, {
                  action: button
                }, clickHandler
              );

              counter++;
            }
          }
        }
      };

      // IE9 throws an 'unknown error' if document.activeElement is used
      // inside an iframe or frame. 
      var activeEl;

      try {
        // Because this approach is destroying and recreating the paging
        // elements, focus is lost on the select button which is bad for
        // accessibility. So we want to restore focus once the draw has
        // completed
        activeEl = $(document.activeElement).data('dt-idx');
      } catch (e) {}

      attach(
        $(host).empty().html('<ul class="material-pagination"/>').children('ul'),
        buttons
      );

      if (activeEl) {
        $(host).find('[data-dt-idx=' + activeEl + ']').focus();
      }
    };s

    /*
     * TableTools Bootstrap compatibility
     * Required TableTools 2.1+
     */
    if (DataTable.TableTools) {
      // Set the classes that TableTools uses to something suitable for Bootstrap
      $.extend(true, DataTable.TableTools.classes, {
        "container": "DTTT btn-group",
        "buttons": {
          "normal": "btn btn-default",
          "disabled": "disabled"
        },
        "collection": {
          "container": "DTTT_dropdown dropdown-menu",
          "buttons": {
            "normal": "",
            "disabled": "disabled"
          }
        },
        "print": {
          "info": "DTTT_print_info"
        },
        "select": {
          "row": "active"
        }
      });

      // Have the collection use a material compatible drop down
      $.extend(true, DataTable.TableTools.DEFAULTS.oTags, {
        "collection": {
          "container": "ul",
          "button": "li",
          "liner": "a"
        }
      });
    }

  }; // /factory

  // Define as an AMD module if possible
  if (typeof define === 'function' && define.amd) {
    define(['jquery', 'datatables'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    factory(require('jquery'), require('datatables'));
  } else if (jQuery) {
    // Otherwise simply initialise as normal, stopping multiple evaluation
    factory(jQuery, jQuery.fn.dataTable);
  }

})(window, document);

// $(document).ready(function() {
//   $('#datatable').dataTable({
//     "ajax": URL,
//     "oLanguage": {
//       "sStripClasses": "",
//       "sSearch": "",
//       "sSearchPlaceholder": "Enter any keyword here to filter...",
//       "sInfo": "START -END of TOTAL",
//       "sLengthMenu": '<span>Rows per page:</span><select class="browser-default">' +
//         '<option value="10">10</option>' +
//         '<option value="20">20</option>' +
//         '<option value="30">30</option>' +
//         '<option value="40">40</option>' +
//         '<option value="50">50</option>' +
//         '<option value="-1">All</option>' +
//         '</select></div>'
//     },
//     bAutoWidth: false
//   });
// });


function Table () {
   $('#datatable').dataTable({
    "ajax": URL,
    "oLanguage": {
      "sStripClasses": "",
      "sSearch": "",
      "sSearchPlaceholder": "Enter any keyword here to filter...",
      "sInfo": "START -END of TOTAL",
      "sLengthMenu": '<span>Rows per page:</span><select class="browser-default">' +
        '<option value="10">10</option>' +
        '<option value="20">20</option>' +
        '<option value="30">30</option>' +
        '<option value="40">40</option>' +
        '<option value="50">50</option>' +
        '<option value="-1">All</option>' +
        '</select></div>'
    },
    bAutoWidth: false,
    destroy: true,
  });
}