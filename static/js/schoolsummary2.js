Highcharts.setOptions({
  chart: {
    style: {
      color: '#fff'
    }
  }
}); 
  var settings = {
      "async": true,
      "crossDomain": true,
      "url":             "/progschoolcount",
      "method": "GET"
     }
      $.ajax(settings).done(function (response) {
      var dataa=JSON.parse(response); 
      console.log(dataa,"hello frnd")
$('#container').highcharts({
  chart: {
    type: 'column',
    backgroundColor: '#FFFFF'
  },
  title: {
    text: 'School Count by Program (Mutually Inclusive)',
    style: {  
     color: '#000000'
    }
  },
  xAxis: {
    tickWidth: 0,
    labels: {
     style: {
       color: '#000000',
       }
     },
    categories: dataa.progname
  },
  yAxis: {
    title: {
      text: 'School Count',
      style: {
       color: '#000000'
       }
    },
    labels: {
      formatter: function() {
        return Highcharts.numberFormat(this.value, 0, '', ',');
      },
      style: {
        color: '#000000',
      }
    }
  },
  legend: {
    enabled: false,
  },
  credits: {
    enabled: false
  },
  tooltip: {
    valuePrefix: ''
  },
  plotOptions: {
    series: {point: {
              events: {
                  click: function () {   
                   URL = '/schoolsummaryprog/'+this.category ;          
        $('#next').empty();
        console.log(URL);
        var modal2 = document.getElementById("myModal2");
        modal2.style.display = "block";
        $("#gif").append("<img style='width: 7%;margin-left: 45.2%;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
        var gif = document.getElementById("gif");
      gif.style.display = "block";
        $('#btnExport').show();
        createDynamic(URL)
                  }
              }
          }}
  },
  series: [{
      color: '#01a451',
    name: 'School Count',
    data: dataa.schoolcount
  }]
});
      });

      // Highcharts.setOptions({
      //   colors: ['#67BCE6'],
      //   chart: {
      //      zoomType: 'x',
      //     style: {
      //       fontFamily: 'sans-serif',
      //       color: '#fff'
      //     }
      //   }
      // }); 
        var settings = {
            "async": true,
            "crossDomain": true,
            "url":             "/progschoolexclusivelyunitedstates",
            "method": "GET"
           }
            $.ajax(settings).done(function (response) {
            var dataa=JSON.parse(response); 
            console.log(dataa,"hello frnd")
      $('#container5').highcharts({
        chart: {
          type: 'column',
          backgroundColor: '#FFFFF'
        },
        title: {
          text: 'School Count by School Type(Mutually Exclusive)',
          style: {  
           color: '#000000'
          }
        },
        xAxis: {
          tickWidth: 0,
          labels: {
           style: {
             color: '#000000',
             }
           },
          categories: dataa.programe
        },
        yAxis: {
          title: {
            text: 'School Count',
            style: {
             color: '#000000'
             }
          },
          labels: {
            formatter: function() {
              return Highcharts.numberFormat(this.value, 0, '', ',');
            },
            style: {
              color: '#000000',
            }
          }
        },
        legend: {
          enabled: false,
        },
        credits: {
          enabled: false
        },
        tooltip: {
          valuePrefix: ''
        },
        plotOptions: {
          series: {point: {
                    events: {
                        click: function () {

                         URL = '/progschooltableusa/'+this.category ;
                         $('#next').empty();
                         console.log(URL);
                         var modal2 = document.getElementById("myModal2");
                         modal2.style.display = "block";
                         $("#gif").append("<img style='width: 7%;margin-left: 45.2%;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
                         var gif = document.getElementById("gif");
                       gif.style.display = "block";
                         $('#btnExport').show();
                         createDynamic(URL)
                        }
                    }
                }}
        },
        series: [{
            color: '#01a451',
          name: 'School Count',
          data: dataa.schoolcount
        }]
      });
            });
    
    

      // Highcharts.setOptions({
      //     colors: ['#67BCE6'],
      //     chart: {
      //        zoomType: 'x',
      //       style: {
      //         fontFamily: 'sans-serif',
      //         color: '#fff'
      //       }
      //     }
      //   }); 


      function cards2(URL) {
        var mainURL = URL;
        $('#next').empty();
        console.log(mainURL);
        var modal2 = document.getElementById("myModal2");
        modal2.style.display = "block";
        $("#gif").append("<img style='width: 7%;margin-left: 45.2%;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
        var gif = document.getElementById("gif");
      gif.style.display = "block";
        $('#btnExport').show();
        createDynamic2(mainURL)
      }

$("#exc").val("USA");
function executive(a){
      Highcharts.setOptions({
        colors: ['#67BCE6'],
        chart: {
           zoomType: 'x',
          style: {
            fontFamily: 'sans-serif',
            color: '#fff'
          }
        }
      }); 
        var settings = {
            "async": true,
            "crossDomain": true,
            "url":             "/"+a,
            "method": "GET"
           }
            $.ajax(settings).done(function (response) {
            var dataa=JSON.parse(response); 
            console.log(dataa,"hello frnd")
      $('#container5').highcharts({
        chart: {
          type: 'column',
          backgroundColor: '#FFFFF'
        },
        title: {
          text: 'School Count by Program(Mutually Exclusive)',
          style: {  
           color: '#000000'
          }
        },
        xAxis: {
          tickWidth: 0,
          labels: {
           style: {
             color: '#000000',
             }
           },
          categories: dataa.programe
        },
        yAxis: {
          title: {
            text: 'School Count',
            style: {
             color: '#000000'
             }
          },
          labels: {
            formatter: function() {
              return Highcharts.numberFormat(this.value, 0, '', ',');
            },
            style: {
              color: '#000000',
            }
          }
        },
        legend: {
          enabled: false,
        },
        credits: {
          enabled: false
        },
        tooltip: {
          valuePrefix: ''
        },
        plotOptions: {
          series: {point: {
                    events: {
                        click: function () {

                            
                          
                         URL = '/schoolsummaryprog/'+this.category ;
       
              $('#next').empty();
              console.log(URL);
              var modal2 = document.getElementById("myModal2");
              modal2.style.display = "block";
              $("#gif").append("<img style='width: 7%;margin-left: 45.2%;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
              var gif = document.getElementById("gif");
            gif.style.display = "block";
              $('#btnExport').show();
              createDynamic(URL)
                        }
                    }
                }}
        },
        series: [{
            color: '#01a451',
          name: 'School Count',
          data: dataa.schoolcount
        }]
      });
            });
    
    

      // Highcharts.setOptions({
      //     colors: ['#67BCE6'],
      //     chart: {
      //        zoomType: 'x',
      //       style: {
      //         fontFamily: 'sans-serif',
      //         color: '#fff'
      //       }
      //     }
      //   }); 

      }

          var settings = {
              "async": true,
              "crossDomain": true,
              "url": "/planschoolcount",
              "method": "GET"
             }
              $.ajax(settings).done(function (response) {
              var dataa=JSON.parse(response); 
              console.log(dataa,"hello frnd")
        $('#container2').highcharts({
          chart: {
            type: 'column',
            backgroundColor: '#FFFFF'
          },
          title: {
            text: 'School Count by Plan',
            style: {  
             color: '#000000'
            }
          },
          xAxis: {
            tickWidth: 0,
            labels: {
             style: {
               color: '#000000',
               }
             },
            categories: [dataa.progname[2],dataa.progname[0],dataa.progname[1],dataa.progname[3]]
          },
          yAxis: {
            title: {
              text: 'School Count',
              style: {
               color: '#000000'
               }
            },
            labels: {
              formatter: function() {
                return Highcharts.numberFormat(this.value, 0, '', ',');
              },
              style: {
                color: '#000000',
              }
            }
          },
          legend: {
            enabled: false,
          },
          credits: {
            enabled: false
          },
          tooltip: {
            valuePrefix: ''
          },
          plotOptions: {
            series: {point: {
                      events: {
                          click: function () {
                           URL = '/schoolsummaryplan/'+this.category ;
                           $('#next').empty();
                           console.log(URL);
                           var modal2 = document.getElementById("myModal2");
                           modal2.style.display = "block";
                           $("#gif").append("<img style='width: 7%;margin-left: 45.2%;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
                           var gif = document.getElementById("gif");
                         gif.style.display = "block";
                           $('#btnExport').show();
                           createDynamic(URL)
                          }
                      }
                  }}
          },
          series: [{
              color: '#01a451',
            name: 'School Count',
            data: [dataa.schoolcount[2],dataa.schoolcount[0],dataa.schoolcount[1],dataa.schoolcount[3]]
          }]
        });
              });

              // function createDynamic(url){

              //     var settings = {
              //     "async": true,
              //     "crossDomain": true,
              //     "url": url,
              //     "method": "GET"
              //     }
              //     $.ajax(settings).done(function (response) {
              //     var data1=JSON.parse(response);
                  
              //     $('#next').prepend('<table class="table table-striped custab table-fixed" id = "dataTable" ><thead ><tr><tr><th>SCHOOL NAME</th><th>ADMIN NAME</th><th>ADMIN EMAIL</th><th>USER COUNT</th><th>CITY</th><th>STATE</th><th>COUNTRY</th><th>SUBSCRIPTION EXPIRY</th><th>LAST PRACTICE</th><th>PLAYBACK COUNT</th></tr></thead ><tbody>');
                                        
              //     for(var i=0;i<data1.data.length;i++){
                  
                  
              //     var datain = data1.data[i];
              //     var resultDiv = createDynamicDiv2(datain);
                  
              //     $("#dataTable").append(resultDiv);
                  
                  
                  
                  
              //     }
              //     //$('#dataTable1').append('</tbody></table>');
              //     $('#dataTable').append('</tbody></table>');
              //     dataTab();
                  
                  
                  
              //     $('#next1').prepend('<table class="table table-striped custab table-fixed" style="display:none;" id = "dataTable1" ><thead ><tr><tr><th>SCHOOL NAME</th><th>ADMIN NAME</th><th>ADMIN EMAIL</th><th>USER COUNT</th><th>CITY</th><th>STATE</th><th>COUNTRY</th><th>SUBSCRIPTION EXPIRY</th><th>LAST PRACTICE</th><th>PLAYBACK COUNT</th></tr></thead ><tbody>');
              //     for(var i=0;i<data1.data.length;i++){
                  
                  
              //     var datain = data1.data[i];
                  
              //     var resultDiv = createDynamicDiv(datain);
              //     $("#dataTable1").append(resultDiv);
                  
              //     }
              //     $('#dataTable1').append('</tbody></table>');
              //     })
              //     }
              //     function dataTab()
              //     {
                  
              //     $("#dataTable").DataTable( {
              //         "pageLength": 50
              //     } );
                  
              //     }
              //     function createDynamicDiv(userList){
              //     var dynamicDiv = '';
              //         console.log(userList)
                      
                  
                  
                    
                    
              //       dynamicDiv +=   '<tr >'+
              //       '<td class="tablelink"><a onclick="search22(\''+userList[0]+'\')">' +
              //       userList[0] +
              //       "</td></a>" +
              //                 '<td>'+userList[1]+'</td>'+	  	
              //                 '<td class="tablelink"><a onclick="schoolsearch22(\''+userList[2]+'\')">' +
              //                 userList[2] +
              //                 "</td></a>" +
              //               '<td>'+userList[3]+'</td>'+
              //                 '<td>'+userList[4]+'</td>'+
              //               '<td>'+userList[5]+'</td>'+
              //               '<td>'+userList[6]+'</td>'+
              //               '<td>'+userList[7]+'</td>'+
              //               '<td>'+userList[8]+'</td>'+
              //               '<td>'+userList[9]+'</td>'+
                           
              //               '</tr>'
                  
                          
              //         return dynamicDiv;
                      
              //     }
            
                  var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url":             "/weeklysummaryprog",
                    "method": "GET"
                   }
                    $.ajax(settings).done(function (response) {
                    var dataa=JSON.parse(response); 
                     console.log(dataa,"hello frnd")
                
                     Highcharts.chart('container3', {
                  chart: {
                    type: 'column'
                  },
                  colors: [
             '#00A651',
             '#2C9905',
             '#8AE02B',
             '#B9FF4F',
             '#FF8300',
             
             
          ],
                             title: {
                    text: 'Weekly Playback Comprision by Program'
                    },
                  xAxis: {
                    
                    categories: dataa.Week,
                    
                    crosshair: true
                  },
                  yAxis: {
                    min: 0,
                    title: {
                      text: 'School Count'
                    }
                  },
                  legend: {
                  enabled: true,
                  itemStyle: {
                      fontSize: '10px',
                      fontWeight: '200',
                  }
                },
                  tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                      '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                  },
                  plotOptions: {
                    column: {
                      stacking: 'normal',
                    }
                  },
                  series: [{
                    name: 'Elementary Last week',
                    data: dataa.Elem_2,
                    stack: 0
                  }, {
                    name: 'High Last Week',
                    data: dataa.High_2t,
                    stack: 0
                  },
                  {
                    name: 'Middle Last Week',
                    data: dataa.Mid_2,
                    stack: 0
                  },
                  {
                    name: 'Pre-K Last Week',
                    data: dataa.Prek_2,
                    stack: 0
                  },
                  {
                    name: 'Sound Last Week',
                    data: dataa.Sound_2,
                    stack: 0
                  },
                  {
                    name: 'Elementary Last to Last week',
                    data: dataa.Elem_1,
                    stack: 1
                  }, {
                    name: 'High Last to Last Week',
                    data: dataa.High_1,
                    stack: 1
                  },
                  {
                    name: 'Middle Last to Last Week',
                    data: dataa.Mid_1,
                    stack: 1
                  },
                  {
                    name: 'Pre-K Last to Last Week',
                    data: dataa.Prek_1,
                    stack: 1
                  },
                  {
                    name: 'Sound Last to Last Week',
                    data: dataa.Sound_1,
                    stack: 1
                  }
                          ]
                });
                
                    });
                

                    // Highcharts.setOptions({
                    //   colors: ['#67BCE6'],
                    //   chart: {
                    //      zoomType: 'x',
                    //     style: {
                    //       fontFamily: 'sans-serif',
                    //       color: '#fff'
                    //     }
                    //   }
                    // }); 
                      var settings = {
                          "async": true,
                          "crossDomain": true,
                          "url":             "/pracprogramsummary",
                          "method": "GET"
                         }
                          $.ajax(settings).done(function (response) {
                          var dataa=JSON.parse(response); 
                          console.log(dataa,"hello frnd")
                    $('#container4').highcharts({
                      chart: {
                        type: 'column',
                        backgroundColor: '#FFFFF'
                      },
                      title: {
                        text: 'Playback Count by Program',
                        style: {  
                         color: '#000000'
                        }
                      },
                      xAxis: {
                        tickWidth: 0,
                        labels: {
                         style: {
                           color: '#000000',
                           }
                         },
                        categories: dataa.programname
                      },
                      yAxis: {
                        title: {
                          text: 'SCHOOL COUNT',
                          style: {
                           color: '#000000'
                           }
                        },
                        labels: {
                          formatter: function() {
                            return Highcharts.numberFormat(this.value, 0, '', ',');
                          },
                          style: {
                            color: '#000000',
                          }
                        }
                      },
                      legend: {
                        enabled: false,
                      },
                      credits: {
                        enabled: false
                      },
                      tooltip: {
                        valuePrefix: ''
                      },
                      plotOptions: {
                        series: {point: {
                                  events: {
                                      click: function () {
                                       
                                      }
                                  }
                              }}
                      },
                      series: [{
                          color: '#01a451',
                        name: 'Playback Count',
                        data: dataa.parcount
                      }]
                    });
                          });
                  
                          function createDynamic(url) {
                            var settings = {
                              async: true,
                              crossDomain: true,
                              url: url,
                              method: "GET",
                              success: function() {
                                var gif = document.getElementById("gif");
                                gif.style.display = "none";
                                },
                            };
                            $.ajax(settings).done(function (response) {
                              var data1 = JSON.parse(response);
                            
                              $("#next").prepend(
                                '<table class="table table-striped custab table-fixed" id = "dataTable" ><thead ><tr><th>SCHOOL NAME</th><th>COUNTRY</th><th>STATE</th><th>CITY</th><th>PROGRAM</th><th>PLAYBACK COUNT</th><th>USER COUNT</th><th>RENEWAL DATE</th><th>LAST PLAYBACK DATE</th><th>MODIFY</th></tr></thead ><tbody>'
                              );
                              for (var i = 0; i < data1.data.length; i++) {
                                var datain = data1.data[i];
                                var resultDiv = createDynamicDiv(datain);
                            
                                $("#dataTable").append(resultDiv);
                              }
                              //$('#dataTable1').append('</tbody></table>');
                              $("#dataTable").append("</tbody></table>");
                              dataTab();
                            
                              $("#next1").prepend(
                                '<table class="table table-striped custab table-fixed" style="display:none;" id = "dataTable1" ><thead ><tr><th>SCHOOL NAME</th><th>COUNTRY</th><th>STATE</th><th>CITY</th><th>PROGRAM</th><th>PLAYBACK COUNT</th><th>USER COUNT</th><th>RENEWAL DATE</th><th>LAST PLAYBACK DATE</th></tr></thead ><tbody>'
                              );
                              for (var i = 0; i < data1.data.length; i++) {
                                var datain = data1.data[i];
                            
                                var resultDiv = createDynamicDiv(datain);
                                $("#dataTable1").append(resultDiv);
                              }
                              $("#dataTable1").append("</tbody></table>");
                            });
                            }
                            function dataTab() {
                            $("#dataTable").DataTable({
                              pageLength: 50,
                            });
                            }
                            
                            function createDynamicDiv(userList) {
                            var dynamicDiv = "";
                            console.log(userList);
                            
                            dynamicDiv +=
                              "<tr >" +
                              "<td>" +
                              userList[1] +
                              "</td>" +
                              "<td>" +
                              userList[2] +
                              "</td>" +
                              "<td>" +
                              userList[3] +
                              "</td>" +
                              "<td>" +
                              userList[4] +
                              "</td>" +
                              "<td>" +
                              userList[9] +
                              "</td>" +
                              "<td>" +
                              userList[5] +
                              "</td>" +
                              "<td>" +
                              userList[6] +
                              "</td>" +
                              "<td>" +
                              userList[7] +
                              "</td>" +
                              "<td>" +
                              userList[8] +
                              "</td>" +
                              '<td class="tablelink"><a onclick="getdtes(\''+userList[0]+'\',\''+userList[1]+'\',\''+userList[2]+'\',\''+userList[3]+'\',\''+userList[4]+'\',\''+userList[9]+'\')">' +
  "<i class='fa fa-pencil-square-o' aria-hidden='true'></i>" +
  "</td></a>" +
                              "</tr>";
                            
                            return dynamicDiv;
                            }





                            function createDynamic2(url) {
                              var settings = {
                                async: true,
                                crossDomain: true,
                                url: url,
                                method: "GET",
                              };
                              $.ajax(settings).done(function (response) {
                                var data1 = JSON.parse(response);
                            
                                $("#next").prepend(
                                  '<table class="table table-striped custab table-fixed" id = "dataTable" ><thead ><tr><th>SCHOOL NAME</th><th>ADMIN NAME</th><th>ADMIN EMAIL</th><th>RENEWAL DATE</th> <th>SCHOOL PLAYBACK COUNT</th> <th>LAST PLAYBACK DATE</th> <th>USER COUNT</th></tr ></thead ><tbody>'
                                );
                            
                                for (var i = 0; i < data1.data.length; i++) {
                                  var datain = data1.data[i];
                                  var resultDiv = createDynamicDiv2(datain);
                            
                                  $("#dataTable").append(resultDiv);
                                }
                                //$('#dataTable1').append('</tbody></table>');
                                $("#dataTable").append("</tbody></table>");
                                dataTab();
                            
                                $("#next1").prepend(
                                  '<table class="table table-striped custab table-fixed" id = "dataTable1" style="display:none" ><thead ><tr><th>SCHOOL NAME</th><th>ADMIN NAME</th><th>ADMIN EMAIL</th><th>RENEWAL DATE</th> <th>SCHOOL PLAYBACK COUNT</th> <th>LAST PLAYBACK DATE</th> <th>USER COUNT</th></tr ></thead ><tbody>'
                                );
                                for (var i = 0; i < data1.data.length; i++) {
                                  var datain = data1.data[i];
                            
                                  var resultDiv = createDynamicDiv2(datain);
                                  $("#dataTable1").append(resultDiv);
                                }
                                $("#dataTable1").append("</tbody></table>");
                              });
                            }
                            function dataTab() {
                              $("#dataTable").DataTable({
                                pageLength: 50,
                              });
                            }
                            function createDynamicDiv2(userList) {
                              var dynamicDiv = "";
                              console.log(userList);
                            
                              dynamicDiv +=
                                "<tr >" +
                                
                               
                                "<td>" +
                                userList[0] +
                                "</td>" +
                                                    '<td>'+userList[1]+'</td>'+		    	
                                                    '<td class="tablelink2" onclick="search22(\''+userList[2]+'\')"><a>' +
                                userList[2] +
                                "</a></td>" +
                                "<td>" +
                                userList[3] +
                                "</td>" +
                                "<td>" +
                                userList[4] +
                                "</td>" +
                                "<td>" +
                                userList[5] +
                                "</td>" +
                                "<td>" +
                                userList[6] +
                                "</td>" +
                                "</tr>";
                            
                              return dynamicDiv;
                            }
                            function getdtes(f,a,b,c,d,e){
                              $('.modal2').show();
                              $('.modal2-bg').show();
                              $("#mainco").empty();
                              $("#mainco").append('<p style="display:none;">school id :<span id="p6"></span></p><p>school name :<span id="p1"></span></p><p>Country :<span id="p2"></span></p><p>State:<span id="p3"></span></p><p>City :<span id="p4"></span></p><p>Program :<span id="p5"></span></p><div><p style="float: left;">Change Program:</p><SELECT id="selprog" style="margin-left: 5px;"><OPTION VALUE="ELEMENTARY">ELEMENTARY</OPTION><OPTION VALUE="MIDDLE">MIDDLE</option><OPTION VALUE="HIGH">HIGH</option><OPTION VALUE="PRE-K<">PRE-K</option></SELECT></div><br/><button style="background: rgb(0, 189, 0);color: #fff;padding: 7px;border-radius: 10px;" onclick=program() id="prog">SUBMIT</button>');
                              $("#p1").text(a);
                              $("#p2").text(b);
                              $("#p3").text(c);
                              $("#p4").text(d);
                              $("#p5").text(e);
                              $("#p6").text(f);
                            }
                            function program(){
                            var a=   document.getElementById("p1").textContent;
                            var b=   document.getElementById("p2").textContent;
                            var c=   document.getElementById("p3").textContent;
                            var d=   document.getElementById("p4").textContent;
                            var e=   document.getElementById("p5").textContent;
                            var f=   document.getElementById("selprog").value;
                            var g=   document.getElementById("p6").textContent;
                            console.log(a,b,c,d,e,f,g);
var newName='name=schoolsummary';
var newSubject='&subject=change program';
var newdescription='&description=change school program:'+' school id: '+ g + ' ,school name '+ a +' ,details: '+b +' , '+c+' , '+d+' ,current program:  '+ e + ' ,change program to: ' +f;
var settings = {
    "async": true,
    "crossDomain": true,
    "url": 'https://xp.innerexplorer.org/compass/capQuery?'+newName+newSubject+newdescription,
    "method": "GET",
    error: function(){
      console.log('email sent')
    }
   }
   $.ajax(settings).done(function (response){
    
   });
   $("#mainco").empty();
   $("#mainco").append('<div style="background-color: #fff;color: green;width: 100%;margin-top: 80px;padding: 10px;border-radius: 10px;text-align:center;"><p style="margin-top:4px;">Your request has been submitted and we are working on it.</p><button onclick="dismiss()" style="padding: 6px;background-color: #green !important ;color: #green !important ;margin-right: 117px;float: right;border: 0;border-radius: 10px;font-size: 11px;">Dismiss</button></div>');
                            }

                            $(document).ready(function(){
                              $('.modal2-link').click(function(){
                                $('.modal2').show();
                                $('.modal2-bg').show();
                              });
                              $('.modal2 .close').click(function(){
                                $('.modal2').hide();
                                $('.modal2-bg').hide();
                              })
                            })

        function dismiss(){
          $('.modal2').hide();
          $('.modal2-bg').hide();
        }  


        $("#Counrty").val('ALABAMA');
        $(document).on('change','#country',function(){
          $('#container6').empty();
          console.log(this.value)
          chartcountry(this.value)
          
          });


        chartcountry('ALABAMA')
        function chartcountry(a){

        // Highcharts.setOptions({
        //   colors: ['#67BCE6'],
        //   chart: {
        //      zoomType: 'x',
        //     style: {
        //       fontFamily: 'sans-serif',
        //       color: '#fff'
        //     }
        //   }
        // }); 
          var settings = {
              "async": true,
              "crossDomain": true,
              "url":             "/progschoolexclusivelystate/"+a,
              "method": "GET"
             }
              $.ajax(settings).done(function (response) {
              var dataa=JSON.parse(response); 
              console.log(dataa,"hello frnd")
        $('#container6').highcharts({
          chart: {
            type: 'column',
            backgroundColor: '#FFFFF'
          },
          title: {
            text: 'School Count by USA States',
            style: {  
             color: '#000000'
            }
          },
          xAxis: {
            tickWidth: 0,
            labels: {
             style: {
               color: '#000000',
               }
             },
            categories: dataa.type
          },
          yAxis: {
            title: {
              text: 'School Count',
              style: {
               color: '#000000'
               }
            },
            labels: {
              formatter: function() {
                return Highcharts.numberFormat(this.value, 0, '', ',');
              },
              style: {
                color: '#000000',
              }
            }
          },
          legend: {
            enabled: false,
          },
          credits: {
            enabled: false
          },
          tooltip: {
            valuePrefix: ''
          },
          plotOptions: {
            series: {point: {
                      events: {
                          click: function () {
                           URL = '/schoolsummaryprog/'+this.category ;
                           $('#next').empty();
                           console.log(URL);
                           var modal2 = document.getElementById("myModal2");
                           modal2.style.display = "block";
                           $("#gif").append("<img style='width: 7%;margin-left: 45.2%;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
                           var gif = document.getElementById("gif");
                         gif.style.display = "block";
                           $('#btnExport').show();
                           createDynamic(URL)
                          }
                      }
                  }}
          },
          series: [{
              color: '#01a451',
            name: 'School Count',
            data: dataa.school
          }]
        });
              });
            }





            var settings = {
              "async": true,
              "crossDomain": true,
              "url":             "/progschoolexclusivelylgpartner",
              "method": "GET"
             }
              $.ajax(settings).done(function (response) {
              var dataa=JSON.parse(response); 
               console.log(dataa,"hello frnd")
          
               Highcharts.chart('container7', {
            chart: {
              type: 'column'
            },
            colors: [
              '#8AE02B',  '#00A651',
       
       
    ],
                       title: {
              text: 'School Count by School Type(LG)'
              },
            xAxis: {
              
              categories: dataa.programe,
              
              crosshair: true
            },
            yAxis: {
              min: 0,
              title: {
                text: 'School Count'
              }
            },
            legend: {
            enabled: true,
            itemStyle: {
                fontSize: '10px',
                fontWeight: '200',
            }
          },
            tooltip: {
              headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
              pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
              footerFormat: '</table>',
              shared: true,
              useHTML: true
            },
            plotOptions: {
              column: {
                stacking: 'normal',
              }
            },
            series: [
              {
                name: 'LG Sponsored',
                data: dataa.Lg,
                stack: 0
              },{
              name: 'Schools',
              data: dataa.school,
              stack: 0
            } 
            
                    ]
          });
          
              });




              var settings = {
                "async": true,
                "crossDomain": true,
                "url":"/proguserexclusively",
                "method": "GET"
               }
                $.ajax(settings).done(function (response) {
                var dataa=JSON.parse(response); 
                 console.log(dataa,"hello frnd")
            
            Highcharts.chart('containertotaluser', {
              chart: {
                type: 'column'
              },
              colors: [
                '#01A451',
                '#8AE02B',
                '#a0afb0',
                '#01A451',
                         ],
            
                         title: {
                text: 'User Count By School Type'
                },
                xAxis: {
                categories:dataa.type,
                crosshair: true
              },
              yAxis: {
                min: 0,
                title: {
                  text: 'User Count'
                }
              },
              tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                  '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                footerFormat: '</table>',
                shared: false,
                useHTML: true
              },
              legend: {
              enabled: true,
              itemStyle: {
                  fontSize: '10px',
                  fontWeight: '200',
              }
            },
              plotOptions: {
                column: {
                  stacking: 'normal',
                }
              },
              series: [{
                name: 'Total users with atleast 5 Playbacks',
                data: dataa.total_user_atleast_5_playbacks,
                stack: 0
              },
                      {
                name: 'Total Useres',
                data: dataa.total_users,
                stack: 1
              }]
            });
            
                });


              var settings = {
                "async": true,
                "crossDomain": true,
                "url":             "/progschoolexclusivelybeforeafter",
                "method": "GET"
               }
                $.ajax(settings).done(function (response) {
                var dataa=JSON.parse(response); 
                 console.log(dataa,"hello frnd")
            
                 Highcharts.chart('container8', {
              chart: {
                type: 'column'
              },
              colors: [
         '#00A651',
         '#8AE02B',
         
      ],
                         title: {
                text: 'School Count by School Type (After CSY Comparision)'
                },
              xAxis: {
                
                categories: dataa.type_A,
                
                crosshair: true
              },
              yAxis: {
                min: 0,
                title: {
                  text: 'School Count'
                }
              },
              legend: {
              enabled: true,
              itemStyle: {
                  fontSize: '10px',
                  fontWeight: '200',
              }
            },
              tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                  '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
              },
              plotOptions: {
                column: {
                  stacking: 'normal',
                }
              },
              series: [{
                name: 'Before CSY',
                data: dataa.before_csy,
                stack: 1
              }, 
              {
                name: 'After CSY',
                data: dataa.after_csy,
                stack: 0
              }
                      ]
            });
            
                });