


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


createboxes();

function createboxes(){
  var districts = {"data":[['5f2609807a1c0000950bb45a',
  'Los Angeles Unified School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/lausd.png'],
 ['5f2609807a1c0000950bb45b',
  'Westfield Public School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/westfield.png'],
 ['5f2609807a1c0000950bb45c',
  'Comox Valley School District(sd71)',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/comox.png'],
 ['5f2609807a1c0000950bb45d',
  'Youngstown',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/youngstown.png'],
 ['5f2609807a1c0000950bb45e',
  'Fairfield-Suisun Unified School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/FSUSD.png'],
 ['5f2609807a1c0000950bb45f',
  'Griffin-Spalding County School System',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/griffin-spalding.png'],
 ['5f2609807a1c0000950bb460',
  'Clarksville-Montgomery County School System',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/clarksville.png'],
 ['5f2609807a1c0000950bb461',
  'Englewood Public School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/englewood.png'],
 ['5f2609807a1c0000950bb463',
  'Austin Independent School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/austin.png'],
 ['5f2609807a1c0000950bb465',
  'Middleton-Cross Plains Area School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/middleton-cross.png'],
 ['5f2609807a1c0000950bb466',
  'Pinellas County Schools',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/pinellas.png'],
 ['5f2609807a1c0000950bb467',
  'Lincolnshire Schools',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/linconlnshire.png'],
 ['5f2609807a1c0000950bb469',
  'LSF -  Head Start',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/lsf.png'],
 ['5f2609807a1c0000950bb46a',
  'Springfield Public School',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/springfield.png'],
 ['5f2609807a1c0000950bb46c',
  'Chico Unified School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/chico.png'],
 ['5f2609807a1c0000950bb46d',
  'Broward County Public Schools',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/broward.png'],
 ['5f2609807a1c0000950bb46f',
  'Paradise Schools',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/paradise.png'],
 ['5f2609807a1c0000950bb470',
  'San Leandro Unified School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/san_leandro.png'],
 ['5f2609807a1c0000950bb471',
  'Racine Unified Schools',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/racine.png'],
 ['5f2609807a1c0000950bb472',
  'Oroville City Elementary School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/oroville.png'],
 ['5f2609807a1c0000950bb474',
  'Greenburgh North Castle Union Free School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/greenburgh.png'],
 ['5f2609807a1c0000950bb475',
  'Agawam School district',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/Agawam.png'],
 ['5f2609807a1c0000950bb476',
  'Hillsborough County',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/hillsborough.png'],
 ['5f2609807a1c0000950bb477',
  'Sarasota County',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/sarasota.png'],
 ['5f2609807a1c0000950bb478',
  'San Diego Unified School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/sandiego.png'],
 ['5f2609807a1c0000950bb47b',
  'Ann Arbor Public Schools',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/ann_arbor.png'],
 ['5f2609807a1c0000950bb47d',
  'Flint Public Schools',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/flint.png'],
 ['5f2609807a1c0000950bb47e',
  'La Joya School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/la_joya.png'],
 ['5f2609807a1c0000950bb47f',
  'Community Consolidated School District 89',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/ccsd.png'],
 ['5f2609807a1c0000950bb482',
  'Massachusetts Institute of Technology',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/mit.png'],
 ['5f2609807a1c0000950bb450',
  'Goleta District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/goleta.png'],
 ['5f2609807a1c0000950bb455',
  'Krum Independent School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/krum.png'],
 ['5f2609807a1c0000950bb368',
  'Wichita Falls Independent School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/wichita.png'],
 ['5f59e4836451a9089d7d4007',
  'Belleville School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/belleville.png'],
 ['5f698b826451a9089d7d4008',
  'Wayne Metro',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/Wayne_Metro.png'],
 ['5f6994386451a9089d7d4009',
  'Ogden school district',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/ogden.png'],
 ['5f6d7cbce6452eb06384db20',
  'Salt Lake City School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/salt_lake.png'],
 ['5f7413ef9387fd71ce6387cb',
  'Douglas County School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/douglas.png'],
 ['5f7c01fa9387fd71ce6387cc',
  'NYC - Queens South',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/queens_south.png'],
 ['5f895191609e08b76029f641',
  'Early learning Sarasota',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/early_learning_sarasota.png'],
 ['5f8fcd33609e08b76029f644',
  'Paradise Unified School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/paradise.png'],
 ['5fbcdf0ba84e48a64412a798',
  'Needham School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/needham.png'],
 ['5fd704da04a848e368de5dc6',
  'Oakland Unified School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/oakland.png'],
 ['5fe2e1ee4d0ca68d7baf889c',
  'LSF-Head Start',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/lsf.png'],
 ['5fe2e25d4d0ca68d7baf889d',
  'BGCA',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/BGCA.png'],
 ['5ffd8176469a86e28635f512',
  'Chula Vista Elementary School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/chula_vista.png'],
 ['6017ab3043ca9c39151838d4',
  'Oswego School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/oswego.png'],
 ['5f2609807a1c0000950bb459',
  'North Special School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/north_special.png'],
 ['60239a84e57dc27613699d57',
  'Austin Independent School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/austin.png'],
 ['6023a6d79e8e623753fc305c',
  'Boulder Valley School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/boulder_valley.png'],
 ['6023a7019e8e623753fc305d',
  'Miami-Dade County Public Schools',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/miami-dade.png'],
 ['6023a7269e8e623753fc305e',
  'Fulton County School System',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/fulton.png'],
 ['6023a7499e8e623753fc305f',
  'Manatee County School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/manatee.png'],
 ['6023a76f9e8e623753fc3060',
  'San Jose Unified School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/san_jose.png'],
 ['6023a7949e8e623753fc3061',
  'Wasatch County School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/wasatch.png'],
 ['6045e4c707ead7744b125839',
  'Hartford Public Schools',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/hartford.png'],
 ['6045e4c707ead7744b12583a',
  'Durham Public Schools',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/durham.png'],
 ['6045e4c807ead7744b12583b',
  'Boston Public Schools',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/boston.png'],
 ['6045e4c907ead7744b12583c',
  'Northside Independent School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/northside.png'],
 ['6045e4c907ead7744b12583d',
  'Apple Valley Unified School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/apple_valley.png'],
 ['6045e4ca07ead7744b12583e',
  'Bishop Unified School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/bishop.png'],
 ['6045e4ca07ead7744b12583f',
  'Canyons School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/canyons.png'],
 ['6045e4cb07ead7744b125840',
  'Denver Public Schools',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/denver.png'],
 ['6045e4cc07ead7744b125841',
  'Fairfax County Public Schools',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/fairfax.png'],
 ['6045e4cc07ead7744b125842',
  'Houston Independent School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/houston.png'],
 ['6045e4cd07ead7744b125843',
  'Falmouth Public Schools',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/falmouth.png'],
 ['6045e4cd07ead7744b125844',
  'Granite School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/granite.png'],
 ['6045e4ce07ead7744b125845',
  'Helena Public Schools',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/helena.png'],
 ['6045e4cf07ead7744b125846',
  'Lamar Consolidated Independent School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/lamar.png'],
 ['6045e4cf07ead7744b125847',
  'Muscatine Community School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/muscatine.png'],
 ['6045e4d007ead7744b125848',
  'Adams 12 Five Star Schools',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/adams_12.png'],
 ['6045e4d107ead7744b125849',
  'Berkeley Public Schools',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/berkeley.png'],
 ['6045e4d107ead7744b12584a',
  'Bismarck Public Schools',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/bismarck.png'],
 ['6045e4d207ead7744b12584b',
  'Glenbard District 87',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/glenbard.png'],
 ['6045e4d207ead7744b12584c',
  'White River School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/white_river.png'],
 ['6045e4d307ead7744b12584d',
  'KIPP Public Schools',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/kipp.png'],
 ['6045e4d307ead7744b12584e',
  'Millard School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/millard.png'],
 ['6045e4d407ead7744b12584f',
  'Mill Valley School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/mill_valley.png'],
 ['6045e4d507ead7744b125850',
  'Rich School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/rich.png'],
 ['6045e4d507ead7744b125851',
  'San Francisco Unified School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/san_francisco.png'],
 ['6045e4d607ead7744b125852',
  'Upland Unified School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/upland.png'],
 ['6045e4d607ead7744b125853',
  'West Contra Costa Unified School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/west_contracosta.png'],
 ['6045e4d707ead7744b125854',
  'Adams County School District 14',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/adams_county.png'],
 ['6045e4d707ead7744b125855',
  'Aurora Public Schools',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/aurora.png'],
 ['6045e4d807ead7744b125856',
  'School District of the Chathams',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/chathams.png'],
 ['6045e4d907ead7744b125857',
  'Colton Joint Unified School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/colton.png'],
 ['6045e4d907ead7744b125858',
  'Chicago Public Schools',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/chicago.png'],
 ['6045e4da07ead7744b125859',
  'Dennis-Yarmouth Regional School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/dennis-yarmouth.png'],
 ['6045e4da07ead7744b12585a',
  'FITCHBURG PUBLIC SCHOOLS',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/fitchburg.png'],
 ['6045e4db07ead7744b12585b',
  'HidalgoIndependent School district',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/hidalgo.png'],
 ['6045e4db07ead7744b12585c',
  'Hopedale Public Schools',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/hopedale.png'],
 ['6045e4dc07ead7744b12585d',
  'Kearsarge Regional School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/kearsarge_regional.png'],
 ['6045e4dc07ead7744b12585e',
  'Littleton Public Schools',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/littleton.png'],
 ['6045e4dd07ead7744b12585f',
  'Palm Beach County School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/palm_beach.png'],
 ['6045e4de07ead7744b125860',
  'Paterson School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/paterson.png'],
 ['6045e4de07ead7744b125861',
  'Sevier School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/sevier.png'],
 ['6045e4df07ead7744b125862',
  'San Marcos Unified School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/san_marcos.png'],
 ['6045e4df07ead7744b125863',
  'San Marino Unified School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/san_marino.png'],
 ['6045e4e007ead7744b125864',
  'South Summit School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/south_summit.png'],
 ['6045e4e007ead7744b125865',
  'Sudbury Public Schools',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/sudbury.png'],
 ['6045e4e107ead7744b125866',
  'Tooele County School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/tooele.png'],
 ['6045e4e207ead7744b125867',
  'Washoe County School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/washoe.png'],
 ['6045e4e207ead7744b125868',
  'Westford Public Schools',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/westford.png'],
 ['60473f8823e88e242074ebd2',
  'Champlain Valley School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/champlain.png'],
 ['5f2609807a1c0000950bb481',
  'Alameda Unified School District',
  'https://test.innerexplorer.org/IE-tech/XP/almeda.png'],
 ['6077e1b5eaa8bae0e2e04a64',
  'Medfield School District',
  'https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/medfieldschool.png']]
}
  console.log("datain");
  for(var i=0;i<districts.data.length;i++){
    var datain = districts.data[i];
   console.log(datain);
   var resultDiv = createDynamicDivcards(datain);
   $("#myProducts2").append(resultDiv);
    }
}
function createDynamicDivcards(userList){
  var dynamicDiv = '';
  console.log(userList)
  
  
  
  
  dynamicDiv +=  '<div class="col-md-2 card" style="border: none !important;"><div class=" portalBox" ><div class=" d-sm-flex justify-content-sm-between align-items-sm-center"><div class=" card-title text-s"><div onclick="distselect(\''+userList[0]+'\'),imgd(\''+userList[2]+'\')" class="box-outer-nw" style="color: #797979;border-radius: 20px;" onclick="mind()"><img src="'+ userList[2] +'" class="img-responsive card_img"  alt="School"><p class="text-s" style="border-radius: 20px;background-color: #fafafa;">'+ userList[1] +'</p></div></div></div></div></div>'
  
        
  return dynamicDiv;
  }



var d = new Date();
var currMonth = d.getMonth()+1;
           var currYear = d.getFullYear();
           var currDate = d.getDate();

           var startDate = new Date(currYear, currMonth, currDate);
           console.log(startDate);
var e = "2015-03-01";
var f = currYear +"-"+currMonth +"-"+currDate;
$( "#stardate" ).text(e);
$( "#finaldate" ).text(f);
$("#fromd").text(e);
  $("#tod").text(f);

imgd('https://xp.innerexplorer.org/compass/styles/images/allnewportals/allnewportalsdistrict/sarasota.png');
function imgd(a){
  console.log("iamge", a);
  $("#imgdis").empty();
  $("#imgdis").append('<img src='+ a + '  class="img-responsive" alt="School" style="color: #797979; width: 100%;">');
}

function charts(a,b,c){



  var settings = {
    async: true,
    crossDomain: true,
    url: "http://127.0.0.1:5000/90daysuserpractising"+"/"+a+"/"+b+"/"+c,
    method: "GET",
  };
  $.ajax(settings).done(function (response) {
    var dataa = JSON.parse(response);
    console.log(dataa);
    $(function () {
      $("#container2").highcharts({
        chart: {
          zoomType: "xy",
              type: "column"
        },
        title: {
          text: "User Practice History",
        },
        colors: ['#4F1FAF','#462CEE','#8AE02B','#01A451'],
        xAxis: [
          {
            categories: dataa.Date,
            labels: {
              rotation : 90,
            }
          },
          
        ],
        yAxis: [
          {
            //Primary yAxis
            lineWidth: 1,
            labels: {
              format: "{value}",
              style: {
                color: "#000",
              },
            },
            title: {
              text: "Practice Count",
              style: {
                color: "#000",
              },
            },
          },
          {
            //Secondary yAxis
            title: {
              text: "",
              style: {
                color: "#4572A7",
              },
            },
            labels: {
              format: "{value}",
              style: {
                color: "#4572A7",
              },
            },
            opposite: false,
          },
        ],
        tooltip: {
          shared: true,
        },
        plotOptions: { borderWidth: 2,
          series: {point: {
           
        }},
    column: {
        stacking: 'normal',
        dataLabels: {
            enabled: false
        }
    } },
        series: [
          {
            name: 'Clever',
            data: dataa.Clever
        },
        {
          name: 'Schoology',
          data: dataa.Scoology
        },{
              name: 'Home',
              fontSize:'8px',
              data: dataa.Parents
            
          }, {
              name: 'Classroom',
              data: dataa.Teachers
          },
        ],
      });
    });
  });


  var settings = {
    async: true,
    crossDomain: true,
    url: "http://127.0.0.1:5000/monthwisepracticedistrict"+"/"+a+"/"+b+"/"+c,
    method: "GET",
    error: function(){
      zerochart();
    }
  };
  $.ajax(settings).done(function (response) {
    var dataa = JSON.parse(response);
    console.log(dataa);
    $(function () {
      $("#container3").highcharts({
        chart: {
          zoomType: "xy",
              type: "column"
      
        },
        title: {
          text: "Practice Trend By Month",
        },
        colors: ['#4F1FAF','#462CEE','#8AE02B','#01A451'],
        xAxis: [
          {
            categories: dataa.monthname,
          },
        ],
        yAxis: [
          {
            //Primary yAxis
            lineWidth: 1,
            labels: {
              format: "{value}",
              style: {
                color: "#000",
              },
            },
            title: {
              text: "Practice Count",
              style: {
                color: "#000",
              },
            },
          },
          {
            //Secondary yAxis
            title: {
              text: "",
              style: {
                color: "#4572A7",
              },
            },
            labels: {
              format: "{value}",
              style: {
                color: "#4572A7",
              },
            },
            opposite: false,
          },
        ],
        tooltip: {
          shared: true,
        },
        plotOptions: { borderWidth: 2,
          series: {point: {
           
        }},
    column: {
        stacking: 'normal',
        dataLabels: {
            enabled: false
        }
    } },
        series: [
          {
            name: 'Clever',
            data: dataa.Clever
        },
        {
          name: 'Schoology',
          data: dataa.Scoology
        },{
              name: 'Home',
              fontSize:'8px',
              data: dataa.Parents
            
          }, {
              name: 'Classroom',
              data: dataa.Teachers
          },
        ],
      });
    });
  });


function zerochart(){
  $(function () {
    $("#container3").highcharts({
      chart: {
        zoomType: "xy",
            type: "column"

      },
      title: {
        text: "Practice Trend By Month",
      },
      xAxis: [
        {
          categories: [],
        },
      ],
      yAxis: [
        {
          //Primary yAxis
          lineWidth: 1,
          labels: {
            format: "{value}",
            style: {
              color: "#000",
            },
          },
          title: {
            text: "Practice Count",
            style: {
              color: "#000",
            },
          },
        },
        {
          //Secondary yAxis
          title: {
            text: "",
            style: {
              color: "#4572A7",
            },
          },
          labels: {
            format: "{value}",
            style: {
              color: "#4572A7",
            },
          },
          opposite: false,
        },
      ],
      tooltip: {
        shared: true,
      },
      plotOptions: { borderWidth: 2, series: { point: {} } },
      series: [
        {
          name: "Practice Count",
          showInLegend: false,
          color: "#01a451",
          type: "column",
          data: [],
        },
      ],
    });
  });
}



  var settings = {
    async: true,
    crossDomain: true,
    url: "http://127.0.0.1:5000/schoolwiseusercounttop20"+"/"+a+"/"+b+"/"+c,
    method: "GET",
  };
  $.ajax(settings).done(function (response) {
    var dataa = JSON.parse(response);
    console.log(dataa);
    $(function () {
      $("#container4").highcharts({
        chart: {
          zoomType: "xy",
              type: "column"
        },
        title: {
          text: "Top 20 School User Count",
        },
        colors: ['#4F1FAF','#462CEE','#8AE02B','#01A451'],
        xAxis: [
          {
            categories: dataa.schname,
            labels: {
              style: {
                fontSize: "10px",
                rotation : 90,
              },
            }
          },
        ],
        yAxis: [
          {
            //Primary yAxis
            lineWidth: 1,
            labels: {
              format: "{value}",
              style: {
                color: "#000",
              },
            },
            title: {
              text: "User Count",
              style: {
                color: "#000",
              },
            },
          },
          {
            //Secondary yAxis
            title: {
              text: "",
              style: {
                color: "#4572A7",
              },
            },
            labels: {
              format: "{value}",
              style: {
                color: "#4572A7",
              },
            },
            opposite: false,
          },
        ],
        tooltip: {
          shared: true,
        },
        plotOptions: { borderWidth: 2,
          series: {point: {
           
        }},
    column: {
        stacking: 'normal',
        dataLabels: {
            enabled: false
        }
    } },
        series: [
          {
            name: 'Clever',
            data: dataa.Clever
        },
        {
          name: 'Schoology',
          data: dataa.Scoology
        },{
              name: 'Home',
              fontSize:'8px',
              data: dataa.Parents
            
          }, {
              name: 'Classroom',
              data: dataa.Teachers
          },
        ],
      });
    });
  });


  var settings = {
    async: true,
    crossDomain: true,
    url: "http://127.0.0.1:5000/top20userspractisinginfo"+"/"+a+"/"+b+"/"+c,
    method: "GET",
    error: function(){
      zerochart2();
    }
  };
  $.ajax(settings).done(function (response) {
    var dataa = JSON.parse(response);
    console.log(dataa);
    $(function () {
      $("#container5").highcharts({
        chart: {
          zoomType: "xy",
              type: "column"
        },
        title: {
          text: "Top 20 User Practice Count",
        },
        colors: ['#4F1FAF','#462CEE','#8AE02B','#01A451'],
        xAxis: [
          {
            categories: dataa.schname,
            labels: {
              style: {
                fontSize: "10px",
                rotation : 90,
              },
            }
          },
        ],
        yAxis: [
          {
            //Primary yAxis
            lineWidth: 1,
            labels: {
              format: "{value}",
              style: {
                color: "#000",
              },
            },
            title: {
              text: "Practoce Count",
              style: {
                color: "#000",
              },
            },
          },
          {
            //Secondary yAxis
            title: {
              text: "",
              style: {
                color: "#4572A7",
              },
            },
            labels: {
              format: "{value}",
              style: {
                color: "#4572A7",
              },
            },
            opposite: false,
          },
        ],
        tooltip: {
          shared: true,
        },
        plotOptions: { borderWidth: 2, series: { point: {} } },
        series: [
          {
            name: "Practice Count",
            showInLegend: false,
            color: "#01a451",
            type: "bar",
            data: dataa.practicecount,
          },
        ],
      });
    });
  });

  function zerochart2(){
    $(function () {
      $("#container5").highcharts({
        chart: {
          zoomType: "xy",
              type: "column"
        },
        title: {
          text: "Top 20 User Practice Count",
        },
        xAxis: [
          {
            categories: [],
            labels: {
              style: {
                fontSize: "10px",
                rotation : 90,
              },
            }
          },
        ],
        yAxis: [
          {
            //Primary yAxis
            lineWidth: 1,
            labels: {
              format: "{value}",
              style: {
                color: "#000",
              },
            },
            title: {
              text: "Practice Count",
              style: {
                color: "#000",
              },
            },
          },
          {
            //Secondary yAxis
            title: {
              text: "",
              style: {
                color: "#4572A7",
              },
            },
            labels: {
              format: "{value}",
              style: {
                color: "#4572A7",
              },
            },
            opposite: false,
          },
        ],
        tooltip: {
          shared: true,
        },
        plotOptions: { borderWidth: 2, series: { point: {} } },
        series: [
          {
            name: "Practice Count",
            showInLegend: false,
            color: "#01a451",
            type: "bar",
            data: [],
          },
        ],
      });
    });
  }

  var settings = {
    async: true,
    crossDomain: true,
    url: "http://127.0.0.1:5000/schoolwisepracticecounttop20"+"/"+a+"/"+b+"/"+c,
    method: "GET",
  };
  $.ajax(settings).done(function (response) {
    var dataa = JSON.parse(response);
    console.log(dataa);
    $(function () {
      $("#container6").highcharts({
        chart: {
          zoomType: "xy",
              type: "column"
        },
        title: {
          text: "Top 20 School Practice Count",
        },
        colors: ['#4F1FAF','#462CEE','#8AE02B','#01A451'],
        xAxis: [
          {
            categories: dataa.schname,
            labels: {
              style: {
                fontSize: "10px",
                rotation : 90,
              },
            }
          },
        ],
        yAxis: [
          {
            //Primary yAxis
            lineWidth: 1,
            labels: {
              format: "{value}",
              style: {
                color: "#000",
              },
            },
            title: {
              text: "Practice Count",
              style: {
                color: "#000",
              },
            },
          },
          {
            //Secondary yAxis
            title: {
              text: "",
              style: {
                color: "#4572A7",
              },
            },
            labels: {
              format: "{value}",
              style: {
                color: "#4572A7",
              },
            },
            opposite: false,
          },
        ],
        tooltip: {
          shared: true,
        },
        plotOptions: { borderWidth: 2,
          series: {point: {
           
        }},
    column: {
        stacking: 'normal',
        dataLabels: {
            enabled: false
        }
    } },
        series: [
          {
            name: 'Clever',
            data: dataa.Clever
        },
        {
          name: 'Schoology',
          data: dataa.Scoology
        },{
              name: 'Home',
              fontSize:'8px',
              data: dataa.Parents
            
          }, {
              name: 'Classroom',
              data: dataa.Teachers
          },
        ],
      });
    });
  });



  // var settings = {
  //   async: true,
  //   crossDomain: true,
  //   url: "http://127.0.0.1:5000/schoolwisefamilycount/5f2609807a1c0000950bb46d/2020-01-01/2021-02-17",
  //   method: "GET",
  // };
  // $.ajax(settings).done(function (response) {
  //   var dataa = JSON.parse(response);
  //   console.log(dataa);
  //   $(function () {
  //     $("#container7").highcharts({
  //       chart: {
  //         zoomType: "xy",
      // type: "column"
  //       },
  //       title: {
  //         text: "Family Count by School",
  //       },
  //       xAxis: [
  //         {
  //           categories: dataa.schname,
  //           labels: {
  //             style: {
  //               fontSize: "10px",
  //             },
  //           }
  //         },
  //       ],
  //       yAxis: [
  //         {
  //           //Primary yAxis
  //           lineWidth: 1,
  //           labels: {
  //             format: "{value}",
  //             style: {
  //               color: "#000",
  //             },
  //           },
  //           title: {
  //             text: "FAMILY COUNT",
  //             style: {
  //               color: "#000",
  //             },
  //           },
  //         },
  //         {
  //           //Secondary yAxis
  //           title: {
  //             text: "",
  //             style: {
  //               color: "#4572A7",
  //             },
  //           },
  //           labels: {
  //             format: "{value}",
  //             style: {
  //               color: "#4572A7",
  //             },
  //           },
  //           opposite: false,
  //         },
  //       ],
  //       tooltip: {
  //         shared: true,
  //       },
  //       plotOptions: { borderWidth: 2,
  //         series: {point: {
           
  //       }},
  //   column: {
  //       stacking: 'normal',
  //       dataLabels: {
  //           enabled: false
  //       }
  //   } },
  //       series: [
  //         {
  //           name: 'Clever',
  //           data: dataa.Clever
  //       },
  //       {
  //         name: 'Schoology',
  //         data: dataa.Scoology
  //       },{
  //             name: 'Home',
  //             fontSize:'8px',
  //             data: dataa.Parents
            
  //         }, {
  //             name: 'Classroom',
  //             data: dataa.Teachers
  //         },
  //       ],
  //     });
  //   });
  // });


//   var settings = {
//     async: true,
//     crossDomain: true,
//     url: "http://127.0.0.1:5000/schoolwisefamilypracticecount/5f2609807a1c0000950bb46d/2020-01-01/2021-02-17",
//     method: "GET",
//   };
//   $.ajax(settings).done(function (response) {
//     var dataa = JSON.parse(response);
//     console.log(dataa);
//     $(function () {
//       $("#container8").highcharts({
//         chart: {
//           zoomType: "xy",
    // type: "column"
//         },
//         title: {
//           text: "Family Practice Count by School",
//         },
//         xAxis: [
//           {
//             categories: dataa.schname,
//           },
//         ],
//         yAxis: [
//           {
//             //Primary yAxis
//             lineWidth: 1,
//             labels: {
//               format: "{value}",
//               style: {
//                 color: "#000",
//               },
//             },
//             title: {
//               text: "FAMILY PRACTICE COUNT",
//               style: {
//                 color: "#000",
//               },
//             },
//           },
//           {
//             //Secondary yAxis
//             title: {
//               text: "",
//               style: {
//                 color: "#4572A7",
//               },
//             },
//             labels: {
//               format: "{value}",
//               style: {
//                 color: "#4572A7",
//               },
//             },
//             opposite: false,
//           },
//         ],
//         tooltip: {
//           shared: true,
//         },
//         plotOptions: { borderWidth: 2,
//           series: {point: {
           
//         }},
//     column: {
//         stacking: 'normal',
//         dataLabels: {
//             enabled: false
//         }
//     } },
//         series: [
//           {
//             name: 'Clever',
//             data: dataa.Clever
//         },
//         {
//           name: 'Schoology',
//           data: dataa.Scoology
//         },{
//               name: 'Home',
//               fontSize:'8px',
//               data: dataa.Parents
            
//           }, {
//               name: 'Classroom',
//               data: dataa.Teachers
//           },
//         ],
//       });
//     });
//   });



}

var modal = document.getElementById("myModal");

function cose(){
  modal.style.display = "none";
}

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
      '<table class="table table-striped custab table-fixed" id = "dataTable" ><thead ><tr><th>USER NAME</th><th>SCHOOL NAME</th><th>COUNRTY</th><th>STATE</th><th>CITY</th><th>PRACTICE COUNT</th><th>CREATED DATE</th><th>LAST PRACTICE DATE</th><th>SUBSCRIPTION EXPIRY</th><th>USER EMAIL</th></tr ></thead ><tbody>'
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
      '<table class="table table-striped custab table-fixed" id = "dataTable1" style="display:none" ><thead ><tr><th>USER NAME</th><th>SCHOOL NAME</th><th>COUNRTY</th><th>STATE</th><th>CITY</th><th>PRACTICE COUNT</th><th>CREATED DATE</th><th>LAST PRACTICE DATE</th><th>SUBSCRIPTION EXPIRY</th><th>USER EMAIL</th></tr ></thead ><tbody>'
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
    userList[0] +
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
    "<td>" +
    userList[9] +
    "</td>" +
    "<td style='font-size: 10px;width: 20%;'>" +
    userList[1] +
    "</td>" +
    "</tr>";

  return dynamicDiv;
}


function createDynamic2(url) {
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
      '<table class="table table-striped custab table-fixed" id = "dataTable" ><thead ><tr><th>SCHOOL NAME</th><th>COUNRTY</th><th>STATE</th><th>CITY</th><th>PRACTICE COUNT</th><th>USER COUNT</th><th>CREATED DATE</th><th>LAST PRACTICE DATE</th><th>SUBSCRIPTION EXPIRY</th></tr ></thead ><tbody>'
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
      '<table class="table table-striped custab table-fixed" id = "dataTable1" style="display:none" ><thead ><tr><th>SCHOOL NAME</th><th>COUNRTY</th><th>STATE</th><th>CITY</th><th>PRACTICE COUNT</th><th>USER COUNT</th><th>CREATED DATE</th><th>LAST PRACTICE DATE</th><th>SUBSCRIPTION EXPIRY</th></tr ></thead ><tbody>'
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
    "</tr>";

  return dynamicDiv;
}







function hi(){
  $("#myDiv2").empty();
}
      function cards(URL) {
        let textContent = document.getElementById('disdetails').innerText;
        var c = document.getElementById("stardate").innerText;
        var b = document.getElementById("finaldate").innerText; 
        var a = URL + textContent + "/" + c + "/" + b;
        $('#next').empty();
        console.log(a);
        var modal2 = document.getElementById("myModal2");
        modal2.style.display = "block";
        $("#gif").append("<img style='width: 7%;margin-left: 45.2%;height:65px !important;' src='http://127.0.0.1:5000/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
        var gif = document.getElementById("gif");
      gif.style.display = "block";
        $('#btnExport').show();
        createDynamic(a);
    }

    function cards2(URL) {
      let textContent = document.getElementById('disdetails').innerText;
      var c = document.getElementById("stardate").innerText;
      var b = document.getElementById("finaldate").innerText; 
      var a = URL + textContent + "/" + c + "/" + b;
      $('#next').empty();
      console.log(a);
      var modal2 = document.getElementById("myModal2");
      modal2.style.display = "block";
      $("#gif").append("<img style='width: 7%;margin-left: 45.2%;height:65px !important;' src='http://127.0.0.1:5000/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
      var gif = document.getElementById("gif");
    gif.style.display = "block";
      $('#btnExport').show();
      createDynamic2(a);
  }
distselect('5f2609807a1c0000950bb477');
$("#disdetails").text('5f2609807a1c0000950bb477');
function distselect(distid){
  var a = document.getElementById("stardate").innerText;
  var b = document.getElementById("finaldate").innerText;
  $("#container").empty();
  $("#container1").empty();
  $("#container2").empty();
  $("#container3").empty();
  $("#container4").empty();
  $("#container5").empty();
  $("#container6").empty();
  $('#heat-map').empty()
  $("#container7").empty();
  $("#school").empty()
  $("#teacher").empty()
  $("#login").empty()
  $("#practice").empty()
      $("#districtid").empty();
      $("#school").empty();
      $("#teacher").empty();
     $("#login").empty();
     $("#practice").empty();
     $("#family").empty();
     $("#myDiv").empty();
     $("#myDiv2").empty();
     $("#disdetails").text(distid);
     var c = document.getElementById("disdetails").innerText;
      var modal = document.getElementById("myModal");
      modal.style.display = "none";
      console.log(distid)
      cardcount(c,a,b);
      charts(c,a,b);
      // bubble(c);
      // bubble2(c);
      idtype(c,a,b);
      }
$("#heat").val(4);
function idtype(a){
  var c = document.getElementById("stardate").innerText;
  var b = document.getElementById("finaldate").innerText;

var type = "districtheatmappractice/"+a+"/"+c+"/"+b;
heatnew(type);
$('#chartname').text("Overall District Practice Heat Map")
}
function cardcount(id,a,b){
      URL = "http://127.0.0.1:5000/districtcardsinfo/"+id+"/"+a+"/"+b;
      var settings = {
  async: true,
  crossDomain: true,
  url: URL,
  method: "GET",
};
$.ajax(settings).done(function (response) {
  var dataa = JSON.parse(response);
  console.log("counts are fnctioning");
  $("#school").text(dataa.schoolcount);
  $("#teacher").text(dataa.teachercount);
  $("#login").text(dataa.logincount);
  $("#practice").text(dataa.teacherpracticecount);
  $("#districtid").text(dataa.district);
  $("#family").text(dataa.familycount);
  $("#MINDFUL_MINUTES").text(dataa.MINDFUL_MINUTES);
  $("#parentspractice").text(dataa.parentspracticecount);
  
});
}

function dateSub(){
  var c = document.getElementById("disdetails").innerText;
  distselect(c);
}

function heatnew(b){
  console.log(b);
var min, max, colorScale, temps, tempsArr;
var colors =  ["#EFF7F2","#DBEEE1","#B3DFC1","#8ECAA0","#76C28D","#65B87E","#52AB6D","#42A862","#329B52","#278845"]
var months = ["", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
var table, thead, tbody, rows, headCells, cells;
var ur = "http://127.0.0.1:5000/"+b;
console.log(ur);
var data = d3.json(ur, function(error, data){

  temps = data.meanTemp;
  tempsArr = createTempArr(temps);
  initScale();
  initTable();
  addTopHeader();
  addRows();
  setColorTransition();

  addLegend();
});

function initTable(){
  table = d3.select('#heat-map').append('table');
  table.append("caption")
  .html("");
  thead = table.append('thead');
  tbody = table.append('tbody');
}

function initScale(){
  min = d3.min(d3.values(temps), function(d) { return d3.min(d); });
  max = d3.max(d3.values(temps), function(d) { return d3.max(d); });
  colorScale = d3.scaleQuantile()
       .domain([min, max])
       .range(colors);
}

function addTopHeader(){
  //make top heading
  thead.append('tr')
       .selectAll('th')
       .data(months)
    .enter()
    .append("th")
    .text(function(d){return d;});
}

function addRows(){
  // create a row for each object in the data
  rows = tbody.selectAll('tr')
  .data(tempsArr).enter()
  .append('tr');

  // create vertical heading (first col of each row)
  headCells = rows.append('th')
  .text(function (d) { return d.year; });

  //create a data cell for each monthly tempature
   cells = rows.selectAll('td')
     .data(function (row, i) {
       return row.temps;
     })
     .enter()
     .append('td')
     .text(function (d) { return d ; })
     .style("background-color", colors[0]);
}

function createTempArr(){
  var tempsArr = [];
  for(var k in temps){
    if (temps.hasOwnProperty(k)) {
           tempsArr.push({year: k, temps: temps[k]});
    }
  }
  return tempsArr;
}

function setColorTransition(){
  cells.transition()
    .duration(1000)
    .style("background-color", function(d) { return colorScale(d); });
}

function addLegend(){
  var rangeValues = [min];
  rangeValues = rangeValues.concat(colorScale.quantiles());

  var legend = d3.select('caption').append('div');
  legend.attr("class", "legend");

  var colorSq = legend.append("div");

  colorSq.selectAll("div")
            .data(rangeValues).enter()
            .append("div")
            .attr("class", "color-square")
            .style("background-color", function(d, i) {return colors[i];});
            //.text(function(d) { return "≥ " + Math.round(d); }); //add range

  var labels = legend.append("div");
  labels.append("div")
  .attr("class", "align-left")
  .text("");

  labels.append("div")
  .attr("class", "align-right")
  .text("");

}
} 

$('#heat').change(function(){
  var c = document.getElementById("stardate").innerText;
  var b = document.getElementById("finaldate").innerText;
  if (this.value == '1') {
  $('#heat-map').empty()
  let textContent = document.getElementById('disdetails').innerText; 
  var type = "districtheatmap/"+textContent+"/"+c+"/"+b;
  heatnew(type);
  $('#chartname').text("Overall Active User Count")
}
else if (this.value == '2') {
  $('#heat-map').empty()
  let textContent = document.getElementById('disdetails').innerText; 
  var type = "familydistrictheatmap/"+textContent+"/"+c+"/"+b;
  heatnew(type);
  $('#chartname').text("Family Active User Count")
}
else if (this.value == '3') {
  $('#heat-map').empty()
  let textContent = document.getElementById('disdetails').innerText; 
  var type = "teachersdistrictheatmap/"+textContent+"/"+c+"/"+b;
  heatnew(type);
  $('#chartname').text("Teachers Active User Count")
}
else if (this.value == '4') {
  $('#heat-map').empty()
  let textContent = document.getElementById('disdetails').innerText; 
  var type = "districtheatmappractice/"+textContent+"/"+c+"/"+b;
  heatnew(type);
  $('#chartname').text("Overall District Practice Heat Map")
}
else if (this.value == '5') {
  $('#heat-map').empty()
  let textContent = document.getElementById('disdetails').innerText; 
  var type = "districtheatmappracteacher/"+textContent+"/"+c+"/"+b;
  heatnew(type);
  $('#chartname').text("Teacher Wise Practice Heat Map")
}
else if (this.value == '6') {
  $('#heat-map').empty()
  let textContent = document.getElementById('disdetails').innerText; 
  var type = "districtheatmappracfamily/"+textContent+"/"+c+"/"+b;
  heatnew(type);
  $('#chartname').text("Family Wise Practice Heat Map")
}
})
function takeid(){
      var a = document.getElementById("disid").textContent;
      console.log(a);
    }
function modal2(){
      var modal = document.getElementById("myModal");
      modal.style.display = "block";
}


Plotly.d3.csv('https://raw.githubusercontent.com/Ash0077/i3os/master/sarasota_29_jan.csv', function (err, data) {
    // Create a lookup table to sort and regroup the columns of data,
	
    // first by MONTH, then by USER_COUNT:
    var lookup = {};
    function getData(MONTH, USER_COUNT) {
      var byMONTH, trace;
      if (!(byMONTH = lookup[MONTH])) {;
        byMONTH = lookup[MONTH] = {};
      }
       // If a container for this MONTH + USER_COUNT doesn't exist yet,
       // then create one:
      if (!(trace = byMONTH[USER_COUNT])) {
        trace = byMONTH[USER_COUNT] = {
          x: [],
          y: [],
          id: [],
          text: [],
          marker: {size: []
        ,color:[]}
        };
      }
      return trace;
    }
  
    // Go through each row, get the right trace, and append the data:
    for (var i = 0; i < data.length; i++) {
      var datum = data[i];
      var trace = getData(datum.MONTH, datum.USER_COUNT);
      trace.text.push(datum.DISTRICT_NAME);
		 // trace.color.push(datum.DISTRICT_NAME);
      trace.id.push(datum.DISTRICT_NAME);
      trace.x.push(datum.USER_ENGAGEMENT);
      trace.y.push(datum.FAMILY_ENGAGEMENT);
      trace.marker.size.push(datum.PRACTICE);
		 trace.marker.color.push(datum.USER_COUNT);
    }
  
    // Get the group names:
    var MONTHs = Object.keys(lookup);
    // In this case, every MONTH includes every USER_COUNT, so we
    // can just infer the USER_COUNTs from the *first* MONTH:
	// var min1 = Math.min.apply(null, color);
    // max1 = Math.max.apply(null, color);

    var firstMONTH = lookup[MONTHs[0]];
    var USER_COUNTs = Object.keys(firstMONTH);
  
    // Create the main traces, one for each USER_COUNT:
    var traces = [];
    for (i = 0; i < USER_COUNTs.length; i++) {
      var data = firstMONTH[USER_COUNTs[i]];
       // One small note. We're creating a single trace here, to which
       // the frames will pass data for the different MONTHs. It's
       // subtle, but to avoid data reference problems, we'll slice 
       // the arrays to ensure we never write any new data into our
       // lookup table:
      traces.push({
         name: USER_COUNTs[i],
         x: data.x.slice(),
        y: data.y.slice(),
        id: data.id.slice(),
         text: data.text.slice(),
			type: "scatter",
   mode: "markers",
        // mode: 'markers',
        marker: {
          size: data.marker.size.slice(),
		  color: data.marker.color.slice(),
			  
          sizemode: 'area',
			   showscale: true,
          sizeref: 20,
			  cmin: 0,
        cmax: 400,
			  colorscale: [[0.0, "rgb(165,0,38)"],
                [0.1111111111111111, "rgb(215,48,39)"],
                [0.2222222222222222, "rgb(244,109,67)"],
                [0.3333333333333333, "rgb(255,255,0)"],
                [0.4444444444444444, "rgb(255,255,0)"],
                [0.5555555555555556, "rgb(255,255,0)"],
                [0.6666666666666666, "rgb(144,238,144)"],
                [0.7777777777777778, "rgb(34,139,34)"],
                [0.8888888888888888, "rgb(34,139,34)"],
                [1.0, "rgb(34,139,34)"]],
			  colorbar: {
      thickness: 20,

     
      title: 'User Count',
      titleside: 'bottom',
      outlinewidth: 0.5,
  
      tickfont: {
        family: 'Helvetica Neue',
        size: 14,
        // color: 'green'
      }
    
    }
        }
      });
    }
  
    // Create a frame for each MONTH. Frames are effectively just
    // traces, except they don't need to contain the *full* trace
    // definition (for example, appearance). The frames just need
    // the parts the traces that change (here, the data).
    var frames = [];
    for (i = 0; i < MONTHs.length; i++) {
      frames.push({
        name: MONTHs[i],
        data: USER_COUNTs.map(function (USER_COUNT) {
          return getData(MONTHs[i], USER_COUNT);
        })
      })
    }
      
    // Now create slider steps, one for each frame. The slider
    // executes a plotly.js API command (here, Plotly.animate).
    // In this example, we'll animate to one of the named frames
    // created in the above loop.
    var sliderSteps = [];
    for (i = 0; i < MONTHs.length; i++) {
      sliderSteps.push({
        method: 'animate',
        label: MONTHs[i],
        args: [[MONTHs[i]], {
          mode: 'immediate',
          transition: {duration: 300},
          frame: {duration: 300, redraw: false},
        }]
      });
    }
    
    var layout = {
      xaxis: {
        title: 'USER ENGAGEMENT',
        range: [-30, 110]
      },
      yaxis: {
        title: 'FAMILY ENGAGEMENT',
        range: [-30, 110]
      },
      hovermode: 'closest',
		 showlegend: false,
       // We'll use updatemenus (whose functionality includes menus as
       // well as buttons) to create a play button and a pause button.
       // The play button works by passing `null`, which indicates that
       // Plotly should animate all frames. The pause button works by
       // passing `[null]`, which indicates we'd like to interrupt any
       // currently running animations with a new list of frames. Here
       // The new list of frames is empty, so it halts the animation.
      updatemenus: [{
        x: 0,
        y: 0,
        yanchor: 'top',
        xanchor: 'left',
        showactive: false,
        direction: 'left',
        type: 'buttons',
        pad: {t: 87, r: 10},
        buttons: [{
          method: 'animate',
          args: [null, {
            mode: 'immediate',
            fromcurrent: true,
            transition: {duration: 300},
            frame: {duration: 500, redraw: false}
          }],
          label: 'Play'
        }, {
          method: 'animate',
          args: [[null], {
            mode: 'immediate',
            transition: {duration: 0},
            frame: {duration: 0, redraw: false}
          }],
          label: 'Pause'
        }]
      }],
       // Finally, add the slider and use `pad` to position it
       // nicely next to the buttons.
      sliders: [{
        pad: {l: 130, t: 55},
        currentvalue: {
          visible: true,
          prefix: 'MONTH:',
          xanchor: 'right',
          font: {size: 20, color: '#666'}
        },
        steps: sliderSteps
      }]
    };
    
    // Create the plot:
    Plotly.plot('myDiv2', {
      data: traces,
      layout: layout,
       config: {showSendToCloud:true},
       frames: frames,
    });
  });




  
$(function() {
  $( "#datepicker" ).datepicker(
    
    {
changeMonth: true,
changeYear: true,
yearRange: "2015:2021",
dateFormat : "yy-mm-dd",
onSelect: function(dateText, inst) {
$( "#stardate" ).text(dateText);
   }
  });
  $( "#datepicker" ).datepicker("setDate", 
  new Date(2015, 03, 01),)
});

$(function() {
  $( "#datepicker2" ).datepicker({
changeMonth: true,
changeYear: true,
yearRange: "2015:2021",
dateFormat : "yy-mm-dd",
maxDate: new Date(),
onSelect: function(dateText, inst) {
  $( "#finaldate" ).text(dateText);
     }
  });
            var d = new Date();
           var currMonth = d.getMonth();
           var currYear = d.getFullYear();
           var currDate = d.getDate();
           var startDate = new Date(currYear, currMonth, currDate);
           $("#datepicker2").datepicker("setDate", startDate);
});


// function sub (){
//   var a = document.getElementById("stardate").innerText;
//   var b = document.getElementById("finaldate").innerText;
//   charts(a,b);
//   cardscount(a,b);
//   $("#fromd").text(a);
//   $("#tod").text(a);
// }


