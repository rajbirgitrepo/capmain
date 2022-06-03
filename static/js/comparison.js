// $("#error").append('<div style="background-color: #fff;color: #000;width: 46%;float: left;margin-left: 19px;margin-top: 20px;padding: 10px;border-radius: 10px;"><button onclick="changetofield1()" style="padding: 6px;background-color: #fff;color: green;float: right;border: 0;border-radius: 10px;font-size: 11px;">Change</button><p style="margin-top:4px;" id="searchinputname">Please search first school</p></div>');
// $("#error").append('<div style="background-color: #fff;color: #000;width: 46%;float: right;margin-right: 19px;margin-top: 20px;padding: 10px;border-radius: 10px;"><button onclick="changetofield2()" style="padding: 6px;background-color: #fff;color: green;float: right;border: 0;border-radius: 10px;font-size: 11px;">Change</button><p style="margin-top:4px;" id="searchinput2name">Please search second school</p></div>');

$('#searchfield').append('<i class="fa fa-search Icon"></i><input class="input-Field"  id="searchinput" placeholder="Try Searching DAVIE ELEMENTARY SCHOOL" style="float:left; width: 43% !important;  border-radius: 0 20px 20px 0 !important;">');
$('#searchfield').append('<i class="fa fa-search Icon" style="margin-left:2%;"></i><input  class="input-Field"  id="searchinput2" placeholder="Try Searching second school" style="float:left;  width: 43% !important;  border-radius: 0 20px 20px 0 !important;">');

$('#searchfield2').append('<i class="fa fa-search Icon"></i><input class="input-Field"  id="searchinputuser" placeholder="Try Searching user by email" style="float:left; width: 43% !important;  border-radius: 0 20px 20px 0 !important;">');
$('#searchfield2').append('<i class="fa fa-search Icon" style="margin-left:2%;"></i><input  class="input-Field"  id="searchinputuser2" placeholder="Try Searching user by email" style="float:left;  width: 43% !important;  border-radius: 0 20px 20px 0 !important;">');
// function changetofield1(){
//     $('#searchfield').empty();
//     school1();
//     $('#searchfield').append('<i class="fa fa-search Icon"></i><input class="input-Field"  id="searchinput" placeholder="Try Searching DAVIE ELEMENTARY SCHOOL" style="width: 45% !important;  border-radius: 0 20px 20px 0 !important;">');
//   }
//   function changetofield2(){
//     $('#searchfield').empty();
//     school2();
//     $('#searchfield').append('<i class="fa fa-search Icon"></i><input class="input-Field"  id="searchinput2" placeholder="Try Searching DAVIE ELEMENTARY SCHOOL" style="width: 45% !important;border-radius: 0 20px 20px 0 !important;">');

// }
//   changetofield1();
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://capapi.innerexplorer.org/school_search_id",
    "method": "GET"
}
$.ajax(settings).done(function(response) {
    var dataa = JSON.parse(response);
    $(function() {
        var projects = dataa.data;
        $("#searchinput").autocomplete({
                minLength: 0,
                source: projects,
                focus: function(event, ui) {
                    $("#searchinput").val(ui.item.label);
                    return false;
                },
                select: function(event, ui) {
                    $("#searchinput").val(ui.item.label);
                    $("#searchinput-id").val(ui.item.value);
                    $("#searchinputdescription").html(ui.item.desc);
                    $("#searchinputname").html(ui.item.value);
                    $("#searchinput-icon").attr("src", "images/" + ui.item.icon);
                    school2();
                    return false;
                }
            })
            .autocomplete("instance")._renderItem = function(ul, item) {
                return $("<li>")
                    .append("<div>" + item.label + "</div>")
                    .appendTo(ul);
            };
    });
});

function school1() {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://capapi.innerexplorer.org/school_search_id",
        "method": "GET"
    }
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        $(function() {
            var projects = dataa.data;

            $("#searchinput").autocomplete({
                    minLength: 0,
                    source: projects,
                    focus: function(event, ui) {
                        $("#searchinput").val(ui.item.label);
                        return false;
                    },
                    select: function(event, ui) {
                        $("#searchinput").val(ui.item.label);
                        $("#searchinput-id").val(ui.item.value);
                        $("#searchinputdescription").html(ui.item.desc);
                        $("#searchinputname").html(ui.item.value);
                        $("#searchinput-icon").attr("src", "images/" + ui.item.icon);
                        school2();
                        return false;
                    }
                })
                .autocomplete("instance")._renderItem = function(ul, item) {
                    return $("<li>")
                        .append("<div>" + item.label + "</div>")
                        .appendTo(ul);
                };
        });
    });

}

function school2() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://capapi.innerexplorer.org/school_search_id",
        "method": "GET"
    }
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        $(function() {
            var projects = dataa.data;

            $("#searchinput2").autocomplete({
                    minLength: 0,
                    source: projects,
                    focus: function(event, ui) {
                        $("#searchinput2").val(ui.item.label);
                        return false;
                    },
                    select: function(event, ui) {
                        $("#searchinput2").val(ui.item.label);
                        $("#searchinput2-id").val(ui.item.value);
                        $("#searchinput2description").html(ui.item.desc);
                        $("#searchinput2name").html(ui.item.value);
                        $("#searchinput2-icon").attr("src", "images/" + ui.item.icon);
                        return false;
                    }
                })
                .autocomplete("instance")._renderItem = function(ul, item) {
                    return $("<li>")
                        .append("<div>" + item.label + "</div>")
                        .appendTo(ul);
                };
        });
    });
}
$("#ssid").append('<button onclick=schoolsearch() style="background-color: #fff;border: 0;" id="hel">SEARCH</button>');


function compare() {
    $("#gifload").empty();
    $("#gifload").css("display", "block");
    $("#gifload").append('<div class="row gifloader-content"><div class="col-lg-4 mx-my-auto"><img src="/static/images/breath.gif" class="img-responsive" alt="loader"><p>Take a deep breath while we load your data</p></div></div>');
    // $("#gif").empty();
    // $("#gif").append("<img style='width: 7%;margin-left: 45.2%;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
    // var gif = document.getElementById("gif");
    // gif.style.display = "block";
    $("#schoolname").empty();
    $("#practice").empty();
    $("#state").empty();
    $("#usercountse").empty();
    $("#adress").empty();
    $("#email").empty();
    $("#city").empty();
    $("#admin").empty();
    $("#signup").empty();
    $("#ucount").empty();
    $("#pcount").empty();
    $("#mindfulness_minutes").empty();
    $("#schoolname1").empty();
    $("#practice1").empty();
    $("#state1").empty();
    $("#usercountse1").empty();
    $("#adress1").empty();
    $("#email1").empty();
    $("#city1").empty();
    $("#admin1").empty();
    $("#signup1").empty();
    $("#ucount1").empty();
    $("#pcount1").empty();
    $("#mindfulness_minutes1").empty();
    $("#container").empty();
    $("#container1").empty();
    var a = document.getElementById("searchinputdescription").innerText;
    var b = document.getElementById("searchinput2description").innerText;
    var URL = "/schoolcomparison/" + a + "/" + b;
    console.log(URL);
    var settings = {
        async: true,
        crossDomain: true,
        url: URL,
        method: "GET",
        success: function() {
            $("#error").empty()
            // var gif = document.getElementById("gif");
            var gif = document.getElementById("gifload");
            gif.style.display = "none";
        },
        error: function() {
            $("#gifload").hide();
            $("#error").empty()
            $("#error").append('<div style="background-color: #fff;color: #ff0033;width: 50%;margin-left: 19px;margin-top: 20px;padding: 10px;border-radius: 10px;"><button onclick="raisequery()" style="padding: 6px;background-color: #ff0033;color: #fff;float: right;border: 0;border-radius: 10px;font-size: 11px;">Raise Ticket</button><button onclick="dismiss()" style="padding: 6px;background-color: #fff;color: #ff0033;float: right;border: 0;border-radius: 10px;font-size: 11px;">Dismiss</button><p style="margin-top:4px;">Connection to this school data failed.</p></div>');
        }
    };
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        $("#schoolname").text("SCHOOL NAME: " + dataa.Info1.SCHOOL_NAME);
        $("#practice").text(dataa.Info1.SCHOOL_PRACTICE_COUNT);
        $("#state").text("STATE: " + dataa.Info1.STATE);
        $("#usercountse").text(dataa.Info1.SCHOOL_USER_COUNT);
        $("#adress").text("ADDRESS: " + dataa.Info1.ADDRESS);
        $("#email").text("ADMIN EMAIL: " + dataa.Info1.ADMIN_EMAIL);
        $("#city").text("CITY: " + dataa.Info1.CITY);
        $("#admin").text("ADMIN NAME: " + dataa.Info1.ADMIN_NAME);
        $("#signup").text("SIGNUPDATE: " + dataa.Info1.SCHOOL_SIGN_UP_DATE);
        $("#ucount").text(dataa.Info1.SCHOOL_USER_COUNT);
        $("#pcount").text(dataa.Info1.SCHOOL_PRACTICE_COUNT);
        $("#mindfulness_minutes").text(dataa.Info1.SCHOOL_MINDFUL_MINUTES);

        $("#schoolname1").text("SCHOOL NAME: " + dataa.Info2.SCHOOL_NAME);
        $("#practice1").text(dataa.Info2.SCHOOL_PRACTICE_COUNT);
        $("#state1").text("STATE: " + dataa.Info2.STATE);
        $("#usercountse1").text(dataa.Info2.SCHOOL_USER_COUNT);
        $("#adress1").text("ADDRESS: " + dataa.Info2.ADDRESS);
        $("#email1").text("ADMIN EMAIL: " + dataa.Info2.ADMIN_EMAIL);
        $("#city1").text("CITY: " + dataa.Info2.CITY);
        $("#admin1").text("ADMIN NAME: " + dataa.Info2.ADMIN_NAME);
        $("#signup1").text("SIGNUPDATE: " + dataa.Info2.SCHOOL_SIGN_UP_DATE);
        $("#ucount1").text(dataa.Info2.SCHOOL_USER_COUNT);
        $("#pcount1").text(dataa.Info2.SCHOOL_PRACTICE_COUNT);
        $("#mindfulness_minutes1").text(dataa.Info2.SCHOOL_MINDFUL_MINUTES);



        var chart = Highcharts.stockChart('container', {
            chart: {
                type: 'column'
            },
            rangeSelector: {
                selected: 0,
                inputEnabled: false
            },
            title: {
                text: 'SCHOOL PLAYBACK COMPARISON'
            },
            credits: false,
            xAxis: {
                minRange: 1
            },
            plotOptions: {
                series: {
                    point: {

                    }
                }
            },

            navigator: {
                series: {
                    color: '#00FF00',
                    animation: {
                        duration: 0,
                    }
                },
                xAxis: {
                    minRange: 1
                },


            },
            yAxis: [{
                lineWidth: 1,
                opposite: false,
                title: {
                    text: 'Playback Count'
                }
            }, {
                lineWidth: 1,
                opposite: true,
                title: {
                    text: 'Playback Count'
                }
            }],

            series: [{
                color: '#01a451',
                type: 'spline',
                name: dataa.Info1.SCHOOL_NAME,
                data: dataa.Chart1.data.shp

                , //Fri, 14 Jul 2017 00:00:00 GMT
                dataGrouping: {
                    enabled: false,
                }
            }, {
                color: '#FF9933',
                name: dataa.Info2.SCHOOL_NAME,
                type: 'spline',
                yAxis: 1,
                data: dataa.Chart2.data.shp, //Fri, 14 Jul 2017 00:00:00 GMT
                dataGrouping: {
                    enabled: false,
                }
            }]

        });


        var chart = Highcharts.stockChart('container1', {
            chart: {
                type: 'spline'
            },
            rangeSelector: {
                selected: 0,
                inputEnabled: false
            },
            title: {
                text: 'SCHOOL PLAYBACK CUMULATIVE'
            },
            credits: false,
            xAxis: {
                minRange: 1
            },
            plotOptions: {
                series: {
                    point: {

                    }
                }
            },

            navigator: {
                series: {
                    color: '#00FF00',
                    animation: {
                        duration: 0,
                    }
                },
                xAxis: {
                    minRange: 1
                },


            },
            yAxis: [{
                lineWidth: 1,
                opposite: false,
                title: {
                    text: 'Playback Count'
                }
            }, {
                lineWidth: 1,
                opposite: true,
                title: {
                    text: 'Playback Count'
                }
            }],

            series: [{
                color: '#01a451',
                type: 'spline',
                name: dataa.Info1.SCHOOL_NAME,
                data: dataa.Chart1.data.shpcum, //Fri, 14 Jul 2017 00:00:00 GMT
                dataGrouping: {
                    enabled: false,
                }
            }, {
                color: '#FF9933',
                name: dataa.Info2.SCHOOL_NAME,
                type: 'spline',
                yAxis: 1,
                data: dataa.Chart2.data.shpcum, //Fri, 14 Jul 2017 00:00:00 GMT
                dataGrouping: {
                    enabled: false,
                }
            }]

        });


    });
}




//districts 



createboxes();

function createboxes() {
    var districts = {
        "data": [
            ['5f2609807a1c0000950bb45a',
                'Los Angeles Unified School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/lausd.png'
            ],
            ['5f2609807a1c0000950bb45b',
                'Westfield Public School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/westfield.png'
            ],
            ['5f2609807a1c0000950bb45c',
                'Comox Valley School District(sd71)',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/comox.png'
            ],
            ['5f2609807a1c0000950bb45d',
                'Youngstown',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/youngstown.png'
            ],
            ['5f2609807a1c0000950bb45e',
                'Fairfield-Suisun Unified School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/FSUSD.png'
            ],
            ['5f2609807a1c0000950bb45f',
                'Griffin-Spalding County School System',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/griffin-spalding.png'
            ],
            ['5f2609807a1c0000950bb460',
                'Clarksville-Montgomery County School System',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/clarksville.png'
            ],
            ['5f2609807a1c0000950bb461',
                'Englewood Public School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/englewood.png'
            ],
            ['5f2609807a1c0000950bb463',
                'Austin Independent School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/austin.png'
            ],
            ['5f2609807a1c0000950bb465',
                'Middleton-Cross Plains Area School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/middleton-cross.png'
            ],
            ['5f2609807a1c0000950bb466',
                'Pinellas County Schools',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/pinellas.png'
            ],
            ['5f2609807a1c0000950bb467',
                'Lincolnshire Schools',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/linconlnshire.png'
            ],
            ['5f2609807a1c0000950bb469',
                'LSF -  Head Start',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/lsf.png'
            ],
            ['5f2609807a1c0000950bb46a',
                'Springfield Public School',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/springfield.png'
            ],
            ['5f2609807a1c0000950bb46c',
                'Chico Unified School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/chico.png'
            ],
            ['5f2609807a1c0000950bb46d',
                'Broward County Public Schools',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/broward.png'
            ],
            ['5f2609807a1c0000950bb46f',
                'Paradise Schools',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/paradise.png'
            ],
            ['5f2609807a1c0000950bb470',
                'San Leandro Unified School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/san_leandro.png'
            ],
            ['5f2609807a1c0000950bb471',
                'Racine Unified Schools',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/racine.png'
            ],
            ['5f2609807a1c0000950bb472',
                'Oroville City Elementary School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/oroville.png'
            ],
            ['5f2609807a1c0000950bb474',
                'Greenburgh North Castle Union Free School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/greenburgh.png'
            ],
            ['5f2609807a1c0000950bb475',
                'Agawam School district',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/Agawam.png'
            ],
            ['5f2609807a1c0000950bb476',
                'Hillsborough County',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/hillsborough.png'
            ],
            ['5f2609807a1c0000950bb477',
                'Sarasota County',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/sarasota.png'
            ],
            ['5f2609807a1c0000950bb478',
                'San Diego Unified School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/sandiego.png'
            ],
            ['5f2609807a1c0000950bb47b',
                'Ann Arbor Public Schools',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/ann_arbor.png'
            ],
            ['5f2609807a1c0000950bb47d',
                'Flint Public Schools',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/flint.png'
            ],
            ['5f2609807a1c0000950bb47e',
                'La Joya School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/la_joya.png'
            ],
            ['5f2609807a1c0000950bb47f',
                'Community Consolidated School District 89',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/ccsd.png'
            ],
            ['5f2609807a1c0000950bb482',
                'Massachusetts Institute of Technology',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/mit.png'
            ],
            ['5f2609807a1c0000950bb450',
                'Goleta District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/goleta.png'
            ],
            ['5f2609807a1c0000950bb455',
                'Krum Independent School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/krum.png'
            ],
            ['5f2609807a1c0000950bb368',
                'Wichita Falls Independent School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/wichita.png'
            ],
            ['5f59e4836451a9089d7d4007',
                'Belleville School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/belleville.png'
            ],
            ['5f698b826451a9089d7d4008',
                'Wayne Metro',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/Wayne_Metro.png'
            ],
            ['5f6994386451a9089d7d4009',
                'Ogden school district',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/ogden.png'
            ],
            ['5f6d7cbce6452eb06384db20',
                'Salt Lake City School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/salt_lake.png'
            ],
            ['5f7413ef9387fd71ce6387cb',
                'Douglas County School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/douglas.png'
            ],
            ['5f7c01fa9387fd71ce6387cc',
                'NYC - Queens South',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/queens_south.png'
            ],
            ['5f895191609e08b76029f641',
                'Early learning Sarasota',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/early_learning_sarasota.png'
            ],
            ['5f8fcd33609e08b76029f644',
                'Paradise Unified School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/paradise.png'
            ],
            ['5fbcdf0ba84e48a64412a798',
                'Needham School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/needham.png'
            ],
            ['5fd704da04a848e368de5dc6',
                'Oakland Unified School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/oakland.png'
            ],
            ['5fe2e1ee4d0ca68d7baf889c',
                'LSF-Head Start',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/lsf.png'
            ],
            ['5fe2e25d4d0ca68d7baf889d',
                'BGCA',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/BGCA.png'
            ],
            ['5ffd8176469a86e28635f512',
                'Chula Vista Elementary School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/chula_vista.png'
            ],
            ['6017ab3043ca9c39151838d4',
                'Oswego School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/oswego.png'
            ],
            ['5f2609807a1c0000950bb459',
                'North Special School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/north_special.png'
            ],
            ['60239a84e57dc27613699d57',
                'Austin Independent School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/austin.png'
            ],
            ['6023a6d79e8e623753fc305c',
                'Boulder Valley School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/boulder_valley.png'
            ],
            ['6023a7019e8e623753fc305d',
                'Miami-Dade County Public Schools',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/miami-dade.png'
            ],
            ['6023a7269e8e623753fc305e',
                'Fulton County School System',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/fulton.png'
            ],
            ['6023a7499e8e623753fc305f',
                'Manatee County School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/manatee.png'
            ],
            ['6023a76f9e8e623753fc3060',
                'San Jose Unified School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/san_jose.png'
            ],
            ['6023a7949e8e623753fc3061',
                'Wasatch County School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/wasatch.png'
            ],
            ['6045e4c707ead7744b125839',
                'Hartford Public Schools',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/hartford.png'
            ],
            ['6045e4c707ead7744b12583a',
                'Durham Public Schools',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/durham.png'
            ],
            ['6045e4c807ead7744b12583b',
                'Boston Public Schools',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/boston.png'
            ],
            ['6045e4c907ead7744b12583c',
                'Northside Independent School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/northside.png'
            ],
            ['6045e4c907ead7744b12583d',
                'Apple Valley Unified School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/apple_valley.png'
            ],
            ['6045e4ca07ead7744b12583e',
                'Bishop Unified School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/bishop.png'
            ],
            ['6045e4ca07ead7744b12583f',
                'Canyons School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/canyons.png'
            ],
            ['6045e4cb07ead7744b125840',
                'Denver Public Schools',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/denver.png'
            ],
            ['6045e4cc07ead7744b125841',
                'Fairfax County Public Schools',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/fairfax.png'
            ],
            ['6045e4cc07ead7744b125842',
                'Houston Independent School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/houston.png'
            ],
            ['6045e4cd07ead7744b125843',
                'Falmouth Public Schools',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/falmouth.png'
            ],
            ['6045e4cd07ead7744b125844',
                'Granite School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/granite.png'
            ],
            ['6045e4ce07ead7744b125845',
                'Helena Public Schools',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/helena.png'
            ],
            ['6045e4cf07ead7744b125846',
                'Lamar Consolidated Independent School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/lamar.png'
            ],
            ['6045e4cf07ead7744b125847',
                'Muscatine Community School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/muscatine.png'
            ],
            ['6045e4d007ead7744b125848',
                'Adams 12 Five Star Schools',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/adams_12.png'
            ],
            ['6045e4d107ead7744b125849',
                'Berkeley Public Schools',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/berkeley.png'
            ],
            ['6045e4d107ead7744b12584a',
                'Bismarck Public Schools',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/bismarck.png'
            ],
            ['6045e4d207ead7744b12584b',
                'Glenbard District 87',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/glenbard.png'
            ],
            ['6045e4d207ead7744b12584c',
                'White River School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/white_river.png'
            ],
            ['6045e4d307ead7744b12584d',
                'KIPP Public Schools',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/kipp.png'
            ],
            ['6045e4d307ead7744b12584e',
                'Millard School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/millard.png'
            ],
            ['6045e4d407ead7744b12584f',
                'Mill Valley School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/mill_valley.png'
            ],
            ['6045e4d507ead7744b125850',
                'Rich School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/rich.png'
            ],
            ['6045e4d507ead7744b125851',
                'San Francisco Unified School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/san_francisco.png'
            ],
            ['6045e4d607ead7744b125852',
                'Upland Unified School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/upland.png'
            ],
            ['6045e4d607ead7744b125853',
                'West Contra Costa Unified School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/west_contracosta.png'
            ],
            ['6045e4d707ead7744b125854',
                'Adams County School District 14',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/adams_county.png'
            ],
            ['6045e4d707ead7744b125855',
                'Aurora Public Schools',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/aurora.png'
            ],
            ['6045e4d807ead7744b125856',
                'School District of the Chathams',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/chathams.png'
            ],
            ['6045e4d907ead7744b125857',
                'Colton Joint Unified School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/colton.png'
            ],
            ['6045e4d907ead7744b125858',
                'Chicago Public Schools',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/chicago.png'
            ],
            ['6045e4da07ead7744b125859',
                'Dennis-Yarmouth Regional School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/dennis-yarmouth.png'
            ],
            ['6045e4da07ead7744b12585a',
                'FITCHBURG PUBLIC SCHOOLS',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/fitchburg.png'
            ],
            ['6045e4db07ead7744b12585b',
                'HidalgoIndependent School district',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/hidalgo.png'
            ],
            ['6045e4db07ead7744b12585c',
                'Hopedale Public Schools',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/hopedale.png'
            ],
            ['6045e4dc07ead7744b12585d',
                'Kearsarge Regional School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/kearsarge_regional.png'
            ],
            ['6045e4dc07ead7744b12585e',
                'Littleton Public Schools',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/littleton.png'
            ],
            ['6045e4dd07ead7744b12585f',
                'Palm Beach County School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/palm_beach.png'
            ],
            ['6045e4de07ead7744b125860',
                'Paterson School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/paterson.png'
            ],
            ['6045e4de07ead7744b125861',
                'Sevier School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/sevier.png'
            ],
            ['6045e4df07ead7744b125862',
                'San Marcos Unified School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/san_marcos.png'
            ],
            ['6045e4df07ead7744b125863',
                'San Marino Unified School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/san_marino.png'
            ],
            ['6045e4e007ead7744b125864',
                'South Summit School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/south_summit.png'
            ],
            ['6045e4e007ead7744b125865',
                'Sudbury Public Schools',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/sudbury.png'
            ],
            ['6045e4e107ead7744b125866',
                'Tooele County School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/tooele.png'
            ],
            ['6045e4e207ead7744b125867',
                'Washoe County School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/washoe.png'
            ],
            ['6045e4e207ead7744b125868',
                'Westford Public Schools',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/westford.png'
            ],
            ['60473f8823e88e242074ebd2',
                'Champlain Valley School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/champlain.png'
            ],
            ['5f2609807a1c0000950bb481',
                'Alameda Unified School District',
                'https://test.innerexplorer.org/IE-tech/XP/almeda.png'
            ],
            ['6077e1b5eaa8bae0e2e04a64',
                'Medfield School District',
                'https://i6.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/medfieldschool.png'
            ]
        ]
    }
    console.log("datain");
    for (var i = 0; i < districts.data.length; i++) {
        var datain = districts.data[i];
        console.log(datain);
        var resultDiv = createDynamicDivcards(datain);
        $("#myProducts2").append(resultDiv);
        var resultDiv2 = createDynamicDivcards2(datain);
        $("#myProducts23").append(resultDiv2);
    }
}

function createDynamicDivcards(userList) {
    var dynamicDiv = '';
    console.log(userList)

    dynamicDiv += '<div class="col-md-2 card" style="border: none !important;"><div class=" portalBox" ><div class=" d-sm-flex justify-content-sm-between align-items-sm-center"><div class=" card-title text-s"><div onclick="distselect(\'' + userList[0] + '\'),imgd(\'' + userList[2] + '\'),name(\'' + userList[1] + '\')" class="box-outer-nw" style="color: #797979;border-radius: 20px;" onclick="mind()"><img src="' + userList[2] + '" class="img-responsive card_img"  alt="School"><p class="text-s" style="border-radius: 20px;background-color: #fafafa;">' + userList[1] + '</p></div></div></div></div></div>'


    return dynamicDiv;
}

function createDynamicDivcards2(userList) {
    var dynamicDiv2 = '';
    console.log(userList)

    dynamicDiv2 += '<div class="col-md-2 card2" style="border: none !important;"><div class=" portalBox" ><div class=" d-sm-flex justify-content-sm-between align-items-sm-center"><div class=" card-title2 text-s"><div onclick="distselect2(\'' + userList[0] + '\'),imgd2(\'' + userList[2] + '\'),name2(\'' + userList[1] + '\')" class="box-outer-nw" style="color: #797979;border-radius: 20px;" onclick="mind()"><img src="' + userList[2] + '" class="img-responsive card_img"  alt="School"><p class="text-s" style="border-radius: 20px;background-color: #fafafa;">' + userList[1] + '</p></div></div></div></div></div>'


    return dynamicDiv2;
}

function name(a) {
    $("#district1").empty();
    $("#district1").text(a);
}

function name2(a) {
    $("#district2").empty();
    $("#district2").text(a);
}

function cose() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

function cose2() {
    var modal = document.getElementById("myModal22");
    modal.style.display = "none";
}


function modal2() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
}

function modal23() {
    var modal = document.getElementById("myModal22");
    modal.style.display = "block";
}

function imgd(a) {
    console.log("iamge", a);
    $("#imgdis").empty();
    $("#imgdis").append('<img src=' + a + '  class="image">');
}

function imgd2(a) {
    console.log("iamge", a);
    $("#imgdis2").empty();
    $("#imgdis2").append('<img src=' + a + '  class="image">');
}

function myFunction2() {
    var input, filter, cards, cardContainer, title, i;
    input = document.getElementById("myFilter2");
    filter = input.value.toUpperCase();
    cardContainer = document.getElementById("myProducts23");
    cards = cardContainer.getElementsByClassName("card2");
    for (i = 0; i < cards.length; i++) {
        title = cards[i].querySelector(".card-title2");
        if (title.innerText.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}

function myFunction() {
    var input, filter, cards, cardContainer, title, i;
    input = document.getElementById("myFilter");
    filter = input.value.toUpperCase();
    cardContainer = document.getElementById("myProducts2");
    cards = cardContainer.getElementsByClassName("card");
    for (i = 0; i < cards.length; i++) {
        title = cards[i].querySelector(".card-title");
        if (title.innerText.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}

function distselect(a) {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    console.log(a)
    $("#districtid1").empty();
    $("#districtid1").text(a);
}

function distselect2(a) {
    var modal = document.getElementById("myModal22");
    modal.style.display = "none";
    console.log(a)
    $("#districtid2").empty();
    $("#districtid2").text(a);
}

function compare2() {
    $("#gifload").empty();
    $("#gifload").css("display", "block");
    $("#gifload").append('<div class="row gifloader-content"><div class="col-lg-4 mx-my-auto"><img src="/static/images/breath.gif" class="img-responsive" alt="loader"><p>Take a deep breath while we load your data</p></div></div>');
    // $("#gif2").empty();
    // $("#gif2").append("<img style='width: 7%;margin-left: 45.2%;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
    // var gif = document.getElementById("gif2");
    // gif.style.display = "block";
    $("#schoolname").empty();
    $("#practice").empty();
    $("#container").empty();
    $("#container1").empty();
    var a = document.getElementById("districtid1").innerText;
    var b = document.getElementById("districtid2").innerText;
    var URL = "/districtcomparison/" + a + "/" + b;
    console.log(URL);
    var settings = {
        async: true,
        crossDomain: true,
        url: URL,
        method: "GET",
        success: function() {
            $("#error").empty()
            // var gif = document.getElementById("gif2");
            var gif = document.getElementById("gifload");
            gif.style.display = "none";
        },
        error: function() {
            $("#gifload").hide();
            $("#error").empty()
            $("#error").append('<div style="background-color: #fff;color: #ff0033;width: 50%;margin-left: 19px;margin-top: 20px;padding: 10px;border-radius: 10px;"><button onclick="raisequery()" style="padding: 6px;background-color: #ff0033;color: #fff;float: right;border: 0;border-radius: 10px;font-size: 11px;">Raise Ticket</button><button onclick="dismiss()" style="padding: 6px;background-color: #fff;color: #ff0033;float: right;border: 0;border-radius: 10px;font-size: 11px;">Dismiss</button><p style="margin-top:4px;">Connection to this school data failed.</p></div>');
        }
    };
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        $("#d1").text(dataa.Info1.DISTRICT_SCHOOL_COUNT);
        $("#d2").text(dataa.Info1.DISTRICT_USER_COUNT);
        $("#d3").text(dataa.Info1.DISTRICT_PRACTICE_COUNT);
        $("#d4").text(dataa.Info1.DISTRICT_MINDFUL_MINUTES);
        $("#d11").text(dataa.Info2.DISTRICT_SCHOOL_COUNT);
        $("#d12").text(dataa.Info2.DISTRICT_USER_COUNT);
        $("#d13").text(dataa.Info2.DISTRICT_PRACTICE_COUNT);
        $("#d14").text(dataa.Info2.DISTRICT_MINDFUL_MINUTES);

        var chart = Highcharts.stockChart('container3', {
            chart: {
                type: 'column'
            },

            title: {
                text: 'DISTRICT PLAYBACK COMPARISON'
            },
            credits: false,
            xAxis: {
                minRange: 1
            },
            plotOptions: {
                series: {
                    point: {

                    }
                }
            },

            navigator: {
                series: {
                    color: '#00FF00',
                    animation: {
                        duration: 0,
                    }
                },
                xAxis: {
                    minRange: 1
                },


            },
            yAxis: [{
                lineWidth: 1,
                opposite: false,
                title: {
                    text: 'Playback Count'
                }
            }, {
                lineWidth: 1,
                opposite: true,
                title: {
                    text: 'Playback Count'
                }
            }],

            series: [{
                color: '#01a451',
                type: 'spline',
                name: dataa.Info1.DISTRICT_NAME,
                data: dataa.Chart1.data.shp

                , //Fri, 14 Jul 2017 00:00:00 GMT
                dataGrouping: {
                    enabled: false,
                }
            }, {
                color: '#FF9933',
                name: dataa.Info2.DISTRICT_NAME,
                type: 'spline',
                yAxis: 1,
                data: dataa.Chart2.data.shp, //Fri, 14 Jul 2017 00:00:00 GMT
                dataGrouping: {
                    enabled: false,
                }
            }]

        });


        var chart = Highcharts.stockChart('container4', {
            chart: {
                type: 'spline'
            },

            title: {
                text: 'DISTRICT PLAYBACK CUMULATIVE'
            },
            credits: false,
            xAxis: {
                minRange: 1
            },
            plotOptions: {
                series: {
                    point: {

                    }
                }
            },

            navigator: {
                series: {
                    color: '#00FF00',
                    animation: {
                        duration: 0,
                    }
                },
                xAxis: {
                    minRange: 1
                },


            },
            yAxis: [{
                lineWidth: 1,
                opposite: false,
                title: {
                    text: 'Playback Count'
                }
            }, {
                lineWidth: 1,
                opposite: true,
                title: {
                    text: 'Playback Count'
                }
            }],

            series: [{
                color: '#01a451',
                type: 'spline',
                name: dataa.Info1.DISTRICT_NAME,
                data: dataa.Chart1.data.shpcum, //Fri, 14 Jul 2017 00:00:00 GMT
                dataGrouping: {
                    enabled: false,
                }
            }, {
                color: '#FF9933',
                name: dataa.Info2.DISTRICT_NAME,
                type: 'spline',
                yAxis: 1,
                data: dataa.Chart2.data.shpcum, //Fri, 14 Jul 2017 00:00:00 GMT
                dataGrouping: {
                    enabled: false,
                }
            }]

        });


    });
}


//users



function compare3() {
    $("#gif3").empty();
    $("#gif3").append('<div class="row gifloader-content"><div class="col-lg-4 mx-my-auto"><img src="/static/images/breath.gif" class="img-responsive" alt="loader"><p>Take a deep breath while we load your data</p></div></div>');
    var gif = document.getElementById("gif3");
    gif.style.display = "block";
    $("#schoolname").empty();
    $("#upractice").empty();
    $("#ustate").empty();
    $("#uusercountse").empty();
    $("#uadress").empty();
    $("#uemail").empty();
    $("#ucity").empty();
    $("#uadmin").empty();
    $("#usignup").empty();
    $("#uucount").empty();
    $("#upcount").empty();
    $("#umindfulness_minutes").empty();
    $("#uschoolname1").empty();
    $("#u2practice1").empty();
    $("#u2state1").empty();
    $("#u2usercountse1").empty();
    $("#u2adress1").empty();
    $("#u2email1").empty();
    $("#u2city1").empty();
    $("#u2admin1").empty();
    $("#u2signup1").empty();
    $("#u2ucount1").empty();
    $("#u2pcount1").empty();
    $("#u2mindfulness_minutes1").empty();
    $("#container").empty();
    $("#container1").empty();
    var a = document.getElementById("searchinputuser").value;
    var b = document.getElementById("searchinputuser2").value;
    var URL = "/usercomparison/" + a + "/" + b;
    console.log(URL);
    var settings = {
        async: true,
        crossDomain: true,
        url: URL,
        method: "GET",
        success: function() {
            $("#error").empty()
            var gif = document.getElementById("gif3");
            gif.style.display = "none";
        },
        error: function() {
            $("#gif3").hide();
            $("#error").empty()
            $("#error").append('<div style="background-color: #fff;color: #ff0033;width: 50%;margin-left: 19px;margin-top: 20px;padding: 10px;border-radius: 10px;"><button onclick="raisequery()" style="padding: 6px;background-color: #ff0033;color: #fff;float: right;border: 0;border-radius: 10px;font-size: 11px;">Raise Ticket</button><button onclick="dismiss()" style="padding: 6px;background-color: #fff;color: #ff0033;float: right;border: 0;border-radius: 10px;font-size: 11px;">Dismiss</button><p style="margin-top:4px;">Connection to this school data failed.</p></div>');
        }
    };
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        $("#uschoolname").text("SCHOOL NAME: " + dataa.Info1[0].SCHOOL_NAME);
        $("#uname").text("USER NAME: " + dataa.Info1[0].USER_NAME);
        $("#upractice").text("USER EMAIL: " + dataa.Info1[0].USER_EMAIL);
        $("#ustate").text("SIGNUP DATE: " + dataa.Info1[0].SIGN_UP_DATE);
        $("#uadress").text("ADDRESS: " + dataa.Info1[0].ADDRESS);
        $("#uemail").text("COUNTRY: " + dataa.Info1[0].COUNTRY);
        $("#ucity").text("CITY: " + dataa.Info1[0].CITY);
        $("#uadmin").text("STATE: " + dataa.Info1[0].STATE);
        $("#usignup").text("DISTRICT NAME: " + dataa.Info1[0].DISTRICT_NAME);
        $("#uucount").text(dataa.Info1[0].LAST_PRACTICE_DATE);
        $("#upcount").text(dataa.Info1[0].USER_PRACTICE_COUNT);
        $("#umindfulness_minutes").text(dataa.Info1[0].USER_MINDFUL_MINUTES);
        $("#u2schoolname").text("SCHOOL NAME: " + dataa.Info2[0].SCHOOL_NAME);
        $("#uname2").text("USER NAME: " + dataa.Info2[0].USER_NAME);
        $("#u2practice").text("USER EMAIL: " + dataa.Info2[0].USER_EMAIL);
        $("#u2state").text("SIGNUP DATE: " + dataa.Info2[0].SIGN_UP_DATE);
        $("#u2adress").text("ADDRESS: " + dataa.Info2[0].ADDRESS);
        $("#u2email").text("COUNTRY: " + dataa.Info2[0].COUNTRY);
        $("#u2city").text("CITY: " + dataa.Info2[0].CITY);
        $("#u2admin").text("STATE: " + dataa.Info2[0].STATE);
        $("#u2signup").text("DISTRICT NAME: " + dataa.Info2[0].DISTRICT_NAME);
        $("#u2ucount").text(dataa.Info2[0].LAST_PRACTICE_DATE);
        $("#u2pcount").text(dataa.Info2[0].USER_PRACTICE_COUNT);
        $("#u2mindfulness_minutes").text(dataa.Info2[0].USER_MINDFUL_MINUTES);


        var chart = Highcharts.stockChart('container5', {
            chart: {
                type: 'column'
            },

            title: {
                text: 'USERS PLAYBACK COMPARISON'
            },
            credits: false,
            xAxis: {
                minRange: 1
            },
            plotOptions: {
                series: {
                    point: {

                    }
                }
            },

            navigator: {
                series: {
                    color: '#00FF00',
                    animation: {
                        duration: 0,
                    }
                },
                xAxis: {
                    minRange: 1
                },


            },
            yAxis: [{
                lineWidth: 1,
                opposite: false,
                title: {
                    text: 'Playback Count'
                }
            }, {
                lineWidth: 1,
                opposite: true,
                title: {
                    text: 'Playback Count'
                }
            }],

            series: [{
                color: '#01a451',
                type: 'spline',
                name: dataa.Info1[0].USER_NAME,
                data: dataa.Chart1.data.shp

                , //Fri, 14 Jul 2017 00:00:00 GMT
                dataGrouping: {
                    enabled: false,
                }
            }, {
                color: '#FF9933',
                name: dataa.Info2[0].USER_NAME,
                type: 'spline',
                yAxis: 1,
                data: dataa.Chart2.data.shp, //Fri, 14 Jul 2017 00:00:00 GMT
                dataGrouping: {
                    enabled: false,
                }
            }]

        });


        var chart = Highcharts.stockChart('container6', {
            chart: {
                type: 'spline'
            },

            title: {
                text: 'USERS PLAYBACK CUMULATIVE'
            },
            credits: false,
            xAxis: {
                minRange: 1
            },
            plotOptions: {
                series: {
                    point: {

                    }
                }
            },

            navigator: {
                series: {
                    color: '#00FF00',
                    animation: {
                        duration: 0,
                    }
                },
                xAxis: {
                    minRange: 1
                },


            },
            yAxis: [{
                lineWidth: 1,
                opposite: false,
                title: {
                    text: 'Playback Count'
                }
            }, {
                lineWidth: 1,
                opposite: true,
                title: {
                    text: 'Playback Count'
                }
            }],

            series: [{
                color: '#01a451',
                type: 'spline',
                name: dataa.Info2[0].USER_NAME,
                data: dataa.Chart1.data.shpcum, //Fri, 14 Jul 2017 00:00:00 GMT
                dataGrouping: {
                    enabled: false,
                }
            }, {
                color: '#FF9933',
                name: dataa.Info2[0].USER_NAME,
                type: 'spline',
                yAxis: 1,
                data: dataa.Chart2.data.shpcum, //Fri, 14 Jul 2017 00:00:00 GMT
                dataGrouping: {
                    enabled: false,
                }
            }]

        });


    });
}