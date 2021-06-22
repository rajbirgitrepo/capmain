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
imgd('5');
function imgd(a){
  console.log("iamge", a);
  $("#imgdis").empty();
  $("#imgdis").append('<img src="http://127.0.0.1:5000/static/images/'+ a +'.png" class="img-responsive" alt="School" style="color: #797979; width: 100%;">');
}
function charts(a){
    $("#container").empty();
    $("#container1").empty();
    anychart.onDocumentReady(function () {
        // The data used in this sample can be obtained from the CDN
        // https://cdn.anychart.com/samples/heat-map-charts/heat-map-with-scroll/data.json
        anychart.data.loadJsonFile('http://127.0.0.1:5000/districtescore/'+a,
          function (data) {
            // Creates Heat Map
            var chart = anychart.heatMap(data.chart1);
  // var labels = chart.xAxis().labels();
  // labels.enabled(false);
   chart.xAxis().labels().width(80); 
   chart.xAxis().labels().height(90);
   chart.tooltip().format("{%y}: {%heat}");    
            var colorScale = anychart.scales.ordinalColor();
   colorScale.colors(['#FF8C00','#d6ff6e','#8ae02b', '#00a651']);
      colorScale.ranges([
          {from: 0, to: 25},
          {from: 25, to: 50},
         {from: 50, to: 75},
          {from: 75, to: 100}
      ]);
                      
  chart.colorScale(colorScale);
            // Sets colorScale
  
  
            // Sets chart title
            chart
              .title()
              .enabled(true)
              .text('E-SCORE')
              .padding([0, 0, 20, 0]);
  
            // Sets chart labels
            chart.labels().enabled(true).format('{%Heat}');
  
            // Sets Scrolls for Axes
            chart.xScroller(true);
            chart.yScroller(true);
            
  
            // Sets starting zoom for Axes
            chart.xZoom().setToPointsCount(8);
            chart.yZoom().setToPointsCount(15);
  
            // Sets chart and hover chart settings
            chart.stroke('#fff');
            chart
              .hovered()
              .stroke('2 #fff')
              .fill('#545f69')
              .labels({ fontColor: '#fff' });
  
            // Sets legend
            chart
              .legend()
              .enabled(true)
              .align('center')
              .position('center-bottom')
              .itemsLayout('horizontal')
              .padding([10, 0, 0, 0]);
  
            // set container id for the chart
            chart.container('container');
            // initiate chart drawing
            chart.draw();
          }
        );
      });



      anychart.onDocumentReady(function () {
        // The data used in this sample can be obtained from the CDN
        // https://cdn.anychart.com/samples/heat-map-charts/heat-map-with-scroll/data.json
        anychart.data.loadJsonFile('http://127.0.0.1:5000/districtescore/'+a,
          function (data) {
            // Creates Heat Map
            var chart = anychart.heatMap(data.chart2);
  // var labels = chart.xAxis().labels();
  // labels.enabled(false);
   chart.xAxis().labels().width(80); 
   chart.xAxis().labels().height(90);
   chart.tooltip().format("{%y}: {%heat}");    
            var colorScale = anychart.scales.ordinalColor();
   colorScale.colors(['#FF8C00','#d6ff6e','#8ae02b', '#00a651']);
      colorScale.ranges([
          {from: 0, to: 25},
          {from: 25, to: 50},
         {from: 50, to: 75},
          {from: 75, to: 100}
      ]);
                      
  chart.colorScale(colorScale);
            // Sets colorScale
  
  
            // Sets chart title
            chart
              .title()
              .enabled(true)
              .text('E-SCORE')
              .padding([0, 0, 20, 0]);
  
            // Sets chart labels
            chart.labels().enabled(true).format('{%Heat}');
  
            // Sets Scrolls for Axes
            chart.xScroller(true);
            chart.yScroller(true);
            
  
            // Sets starting zoom for Axes
            chart.xZoom().setToPointsCount(8);
            chart.yZoom().setToPointsCount(6);
  
            // Sets chart and hover chart settings
            chart.stroke('#fff');
            chart
              .hovered()
              .stroke('2 #fff')
              .fill('#545f69')
              .labels({ fontColor: '#fff' });
  
            // Sets legend
            chart
              .legend()
              .enabled(true)
              .align('center')
              .position('center-bottom')
              .itemsLayout('horizontal')
              .padding([20, 0, 0, 0]);
  
            // set container id for the chart
            chart.container('container1');
            // initiate chart drawing
            chart.draw();
          }
        );
      });

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

function modal2(){
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
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
      '<table class="table table-striped custab table-fixed" id = "dataTable" ><thead ><tr><th>SCHOOL NAME</th><th>COUNRTY</th><th>STATE</th><th>CITY</th><th>PRACTICE COUNT</th><th>USER COUNT</th><th>CREATED DATE</th><th>LAST PRACTICE DATE</th><th>CATEGORY</th><th>SUBSCRIPTION EXPIRY</th></tr ></thead ><tbody>'
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
      '<table class="table table-striped custab table-fixed" id = "dataTable1" style="display:none" ><thead ><tr><th>SCHOOL NAME</th><th>COUNRTY</th><th>STATE</th><th>CITY</th><th>PRACTICE COUNT</th><th>USER COUNT</th><th>CREATED DATE</th><th>LAST PRACTICE DATE</th><th>CATEGORY</th><th>SUBSCRIPTION EXPIRY</th></tr ></thead ><tbody>'
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
    "<td>" +
    userList[9] +
    "</td>" +
  
    "</tr>";

  return dynamicDiv;
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
distselect('5f2609807a1c0000950bb471');
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
      cardcount(distid);
      charts(distid);
      // bubble(distid);
      // bubble2(distid);
      // idtype(distid,a,b);
      }
function cardcount(id,a,b){
      URL = "http://127.0.0.1:5000/districtescore/"+id;
      var settings = {
  async: true,
  crossDomain: true,
  url: URL,
  method: "GET",
};
$.ajax(settings).done(function (response) {
  var dataa = JSON.parse(response);
  console.log("counts are fnctioning");
  $("#school").empty()
  $("#teacher").empty()
  $("#login").empty()
  $("#practice").empty()
  $("#school").text(dataa.cards.p_of_Active_Users);
  $("#teacher").text(dataa.cards.Active_Usage);
  $("#practice").text(dataa.cards.Recent_Engagement);
  $("#family").text(dataa.cards.Consistent_Weekly_Practice);
  $("#districtid").text(dataa.cards.district);  
  $("#Districtid").text(dataa.cards.District_Engagement_Score);  

});
}









