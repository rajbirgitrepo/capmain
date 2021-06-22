chartsmain(1000);
document.getElementById('Ultra').onchange =function () {
    selectedValue = document.getElementById("Ultra").value;
    chartsmain(selectedValue);
}
function chartsmain(a){
    var number=[];
    number.push(parseInt(a))
  var total=[4.0,
   3.0,
   8.0,
   6.0,
   3.0,
   7.0,
   4.0,
   3.0,
   4.0,
   8.0,
   228.0,
   6.0,
   7.0,
   3.0,
   18.0,
   46.0,
   40.0,
   3.0,
   5.0,
   23.0,
   3.0,
   6.0,
   6.0,
   10.0,
   26.0,
   5.0,
   3.0,
   6.0,
   29.0,
   5.0,
   15.0,
   4.0,
   8.0,
   5.0,
   5.0,
   16.0,
   5.0,
   3.0,
   211.0,
   3.0,
   6.0,
   4.0,
   3.0,
   2.0,
   1299.0,
   22.0,
   37.0,
   5.0,
   3.0,
   3.0,
   3.0,
   11.0,
   4.0,
   4.0,
   8.0,
   4.0,
   149.0,
   8.0,
   5.0,
   8.0,
   79.0,
   18.0,
   6.0,
   22.0,
   3.0,
   5.0,
   3.0,
   21.0,
   29.0,
   4.0,
   18.0,
   10.0,
   4.0,
   8.0,
   3.0,
   3.0,
   54.0,
   15.0,
   3.0,
   3.0,
   1.0,
   5.0,
   3.0,
   65.0,
   3.0,
   2.0,
   1.0,
   5.0,
   4.0,
   3.0,
   16.0,
   4.0,
   11.0,
   3.0,
   4.0,
   3.0,
   15.0]
    
  var data=[4.0,
   3.0,
   0.0,
   6.0,
   3.0,
   0.0,
   4.0,
   1.0,
   3.0,
   7.0,
   0.0,
   4.0,
   0.0,
   3.0,
   1.0,
   29.0,
   3.0,
   2.0,
   0.0,
   0.0,
   3.0,
   6.0,
   5.0,
   10.0,
   0.0,
   0.0,
   3.0,
   6.0,
   0.0,
   5.0,
   10.0,
   4.0,
   0.0,
   3.0,
   5.0,
   15.0,
   5.0,
   3.0,
   33.0,
   3.0,
   6.0,
   4.0,
   3.0,
   0.0,
   0.0,
   22.0,
   1.0,
   5.0,
   3.0,
   1.0,
   3.0,
   5.0,
   4.0,
   3.0,
   0.0,
   4.0,
   149.0,
   0.0,
   2.0,
   5.0,
   75.0,
   12.0,
   0.0,
   0.0,
   3.0,
   0.0,
   3.0,
   11.0,
   0.0,
   3.0,
   6.0,
   8.0,
   3.0,
   0.0,
   3.0,
   3.0,
   0.0,
   0.0,
   3.0,
   3.0,
   1.0,
   0.0,
   2.0,
   64.0,
   3.0,
   2.0,
   0.0,
   5.0,
   0.0,
   3.0,
   0.0,
   4.0,
   0.0,
   3.0,
   4.0,
   0.0,
   0.0] 
  var data2=[0.0,
   0.0,
   8.0,
   0.0,
   0.0,
   7.0,
   0.0,
   2.0,
   1.0,
   1.0,
   228.0,
   2.0,
   7.0,
   0.0,
   17.0,
   17.0,
   37.0,
   1.0,
   5.0,
   23.0,
   0.0,
   0.0,
   1.0,
   0.0,
   26.0,
   5.0,
   0.0,
   0.0,
   29.0,
   0.0,
   5.0,
   0.0,
   8.0,
   2.0,
   0.0,
   1.0,
   0.0,
   0.0,
   178.0,
   0.0,
   0.0,
   0.0,
   0.0,
   2.0,
   1299.0,
   0.0,
   36.0,
   0.0,
   0.0,
   2.0,
   0.0,
   6.0,
   0.0,
   1.0,
   8.0,
   0.0,
   0.0,
   8.0,
   3.0,
   3.0,
   4.0,
   6.0,
   6.0,
   22.0,
   0.0,
   5.0,
   0.0,
   10.0,
   29.0,
   1.0,
   12.0,
   2.0,
   1.0,
   8.0,
   0.0,
   0.0,
   54.0,
   15.0,
   0.0,
   0.0,
   0.0,
   5.0,
   1.0,
   1.0,
   0.0,
   0.0,
   1.0,
   0.0,
   4.0,
   0.0,
   16.0,
   0.0,
   11.0,
   0.0,
   0.0,
   3.0,
   15.0]
    
  
  const chart3 = Highcharts.chart('container', {
      chart: {
        zoomType: 'xy',
        type:'column'
      },
      title: {
        text: "RENEWABLE REVANUE PROJECTION"
      }
  ,colors: [
                 '#00a651',
                 '#8ae02b',
  
                 
                 
              ],
      xAxis: [{
        categories: ['Adams 12 Five Star Schools',
   'Adams County School District 14',
   'Agawam School district',
   'Apple Valley Unified School District',
   'Aurora Public Schools',
   'Belleville School District',
   'Berkeley Public Schools',
   'Bishop Unified School District',
   'Bismarck Public Schools',
   'Boston Public Schools',
   'Broward County Public Schools',
   'Canyons School District',
   'Champlain Valley School District',
   'Chicago Public Schools',
   'Chico Unified School District',
   'Chula Vista Elementary School District',
   'Clarksville-Montgomery County School System',
   'Colton Joint Unified School District',
   'Community Consolidated School District 89',
   'Comox Valley School District',
   'Dennis-Yarmouth Regional School District',
   'Denver Public Schools',
   'Douglas County School District',
   'Durham Public Schools',
   'Early learning Sarasota',
   'Englewood Public School District',
   'FITCHBURG PUBLIC SCHOOLS',
   'Fairfax County Public Schools',
   'Fairfield-Suisun Unified School District',
   'Falmouth Public Schools',
   'Flint Public Schools',
   'Glenbard District 87',
   'Goleta District',
   'Granite School District',
   'Greenburgh North Castle Union Free School District',
   'Hartford Public Schools',
   'Helena Public Schools',
   'HidalgoIndependent School district',
   'Hillsborough County',
   'Hopedale Public Schools',
   'Houston Independent School District',
   'KIPP Public Schools',
   'Kearsarge Regional School District',
   'Krum Independent School District',
   'LAUSD',
   'LSF-Head Start',
   'La Joya School District',
   'Lamar Consolidated Independent School District',
   'Lincolnshire Schools',
   'Littleton Public Schools',
   'Medfield School District',
   'Middleton-Cross Plains Area School District',
   'Mill Valley School District',
   'Millard School District',
   'Mt. Lebanon School District',
   'Muscatine Community School District',
   'NYC - Queens South',
   'Needham School District',
   'North Special School District',
   'Northside Independent School District',
   'Oakland Unified School District',
   'Ogden school district',
   'Oroville City Elementary School District',
   'Oswego School District',
   'Palm Beach County School District',
   'Paradise Unified School District',
   'Paterson School District',
   'Pinellas County Schools',
   'Racine Unified Schools',
   'Rich School District',
   'Salt Lake City School District',
   'San Diego Unified School District',
   'San Francisco Unified School District',
   'San Leandro Unified School District',
   'San Marcos Unified School District',
   'San Marino Unified School District',
   'Sarasota County',
   'School District of Palm Beach County',
   'School District of the Chathams',
   'Sevier School District',
   'Skillman Attendance works',
   'Skillman Wayne Metro',
   'South Summit School District',
   'Springfield Public School',
   'Sudbury Public Schools',
   'Tooele County School District',
   'Tooele County School District ',
   'UWBA',
   'Upland Unified School District',
   'Washoe County School District',
   'Wayne Metro',
   'West Contra Costa Unified School District',
   'Westfield Public School District',
   'Westford Public Schools',
   'White River School District',
   'Wichita Falls Independent School District',
   'Youngstown'],labels: {
              rotation: 90
          }
      }],
      yAxis: [{ //Primary yAxis
        lineWidth:1,
        labels: {
          format: '{value}',
          style: {
            color: '#000'
          }
        },
        title: {
          text: 'School Count',
          style: {
            color: '#000'
          }
        }
      }, {//Secondary yAxis
        title: {
          text: 'Amount($)',
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
        opposite: true
      }],
      tooltip: {
        shared: true},
    series: [{
      name:"Count of school",
      type:"column",
      data: total
    }]
  
  });
 //////////////////RANGE SELECTOR////////////////
 let rangeInput0 = document.querySelector(".range-input0 input");
 let rangeValue0 = document.querySelector(".range-input0 .value0 div");

 // var month;
 // function output(){
 //   month = document.getElementById('month').value;
 //   alert(month);
 // }
 // console.log(month)
 
 
 let  start0 = parseFloat(rangeInput0.min);
 let end0 = parseFloat(rangeInput0.max);
 let step0 = parseFloat(rangeInput0.step);
 for(let i=start0;i<=end0;i+=step0){
   rangeValue0.innerHTML += '<div>'+i+'</div>';
 }
 rangeInput0.addEventListener("input",function(){
   let top = parseFloat(rangeInput0.value)/step0 * -40;
   rangeValue0.style.marginTop = top+"px";
   console.log(top);
 /////////CHART////////////////
 //////////////////RANGE SELECTOR////////////////
 let rangeInput1 = document.querySelector(".range-input1 input");
 let rangeValue1 = document.querySelector(".range-input1 .value1 div");

 // var month;
 // function output(){
 //   month = document.getElementById('month').value;
 //   alert(month);
 // }
 // console.log(month)
 
 
 let  start1 = parseFloat(rangeInput1.min);
 let end1 = parseFloat(rangeInput1.max);
 let step1 = parseFloat(rangeInput1.step);
 for(let i=start1;i<=end1;i+=step1){
   rangeValue1.innerHTML += '<div>'+i+'</div>';
 }
 rangeInput1.addEventListener("input",function(){
   let top = parseFloat(rangeInput1.value)/step1 * -40;
   rangeValue1.style.marginTop = top+"px";
   console.log(top);
 /////////CHART////////////////
   
    const chart3 = Highcharts.chart('container', {
      chart: {
        zoomType: 'xy',
        type:'column'
      },
      title: {
        text: "RENEWABLE REVANUE PROJECTION"
      }
  ,colors: [
                 '#006400',
                  '#228B22',
                 '#8ae02b',
                  '#00BFFF',
                   '#f9a160'
  
                 
                 
              ],
      xAxis: [{
        categories: ['Adams 12 Five Star Schools',
   'Adams County School District 14',
   'Agawam School district',
   'Apple Valley Unified School District',
   'Aurora Public Schools',
   'Belleville School District',
   'Berkeley Public Schools',
   'Bishop Unified School District',
   'Bismarck Public Schools',
   'Boston Public Schools',
   'Broward County Public Schools',
   'Canyons School District',
   'Champlain Valley School District',
   'Chicago Public Schools',
   'Chico Unified School District',
   'Chula Vista Elementary School District',
   'Clarksville-Montgomery County School System',
   'Colton Joint Unified School District',
   'Community Consolidated School District 89',
   'Comox Valley School District',
   'Dennis-Yarmouth Regional School District',
   'Denver Public Schools',
   'Douglas County School District',
   'Durham Public Schools',
   'Early learning Sarasota',
   'Englewood Public School District',
   'FITCHBURG PUBLIC SCHOOLS',
   'Fairfax County Public Schools',
   'Fairfield-Suisun Unified School District',
   'Falmouth Public Schools',
   'Flint Public Schools',
   'Glenbard District 87',
   'Goleta District',
   'Granite School District',
   'Greenburgh North Castle Union Free School District',
   'Hartford Public Schools',
   'Helena Public Schools',
   'HidalgoIndependent School district',
   'Hillsborough County',
   'Hopedale Public Schools',
   'Houston Independent School District',
   'KIPP Public Schools',
   'Kearsarge Regional School District',
   'Krum Independent School District',
   'LAUSD',
   'LSF-Head Start',
   'La Joya School District',
   'Lamar Consolidated Independent School District',
   'Lincolnshire Schools',
   'Littleton Public Schools',
   'Medfield School District',
   'Middleton-Cross Plains Area School District',
   'Mill Valley School District',
   'Millard School District',
   'Mt. Lebanon School District',
   'Muscatine Community School District',
   'NYC - Queens South',
   'Needham School District',
   'North Special School District',
   'Northside Independent School District',
   'Oakland Unified School District',
   'Ogden school district',
   'Oroville City Elementary School District',
   'Oswego School District',
   'Palm Beach County School District',
   'Paradise Unified School District',
   'Paterson School District',
   'Pinellas County Schools',
   'Racine Unified Schools',
   'Rich School District',
   'Salt Lake City School District',
   'San Diego Unified School District',
   'San Francisco Unified School District',
   'San Leandro Unified School District',
   'San Marcos Unified School District',
   'San Marino Unified School District',
   'Sarasota County',
   'School District of Palm Beach County',
   'School District of the Chathams',
   'Sevier School District',
   'Skillman Attendance works',
   'Skillman Wayne Metro',
   'South Summit School District',
   'Springfield Public School',
   'Sudbury Public Schools',
   'Tooele County School District',
   'Tooele County School District ',
   'UWBA',
   'Upland Unified School District',
   'Washoe County School District',
   'Wayne Metro',
   'West Contra Costa Unified School District',
   'Westfield Public School District',
   'Westford Public Schools',
   'White River School District',
   'Wichita Falls Independent School District',
   'Youngstown'],labels: {
              rotation: 90
          }
      }],
      yAxis: [{ //Primary yAxis
        lineWidth:1,
        labels: {
          format: '{value}',
          style: {
            color: '#000'
          }
        },
        title: {
          text: 'School Count',
          style: {
            color: '#000'
          }
        }
      }, {//Secondary yAxis
        title: {
          text: 'Amount($)',
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
        opposite: true
      }],
      tooltip: {
        shared: true},
    series: [{
      name:"Count of school",
      type:"column",
      data: total
    }]
  
  });
  
  
    ///////////Expected_renewable///////
    var inital_school = [];
    var i;
  for (i = 0; i < data.length; i++) {
    inital_school.push((data[i]*rangeInput.value)/100);
  }
    /////////////full_experience////////////
    var Full_experience = [];
    var i;
  for (i = 0; i < data2.length; i++) {
    Full_experience.push(((data2[i]*rangeInput1.value)/100)*number[0]);
  }
    ///////////Expected_revanue///////
    var Expected_revanue = [];
    var i;
  for (i = 0; i < inital_school.length; i++) {
    Expected_revanue.push(inital_school[i]*number[0]);
  }
  ///////////FULL_REVENAUE/////////////
    let sum = 0;
   let EX_RE = []
  
   for (let i = 0; i < Full_experience.length; i++){
       sum = Full_experience[i] + Expected_revanue[i];
       EX_RE.push(sum)
     }
  
  //////////////CUMULATIVE///////
   const accumulate = arr => arr.map((sum => value => sum += value)(0));
   var Cumulative=accumulate(EX_RE);
   // var expected_revanew=for i in data
    console.log(Full_experience)
     console.log(Expected_revanue)
     console.log(EX_RE)
    ///////////////add series to chart////////////
  // chart.series[0].addPoint(parseInt(rangeInput.value))
   chart3.addSeries({  
      name:"INITAL EXPERIENCE SCHOOLS",
                  type:"column",
                  data:data
              });
     chart3.addSeries({  
        name:"FULL EXPERIENCE SCHOOL",
                  type:"column",
                  data:data2
              });
    chart3.addSeries({  
       yAxis:1, name:"EXPECTED REVANUE",
                  type:"line",
                  data:EX_RE
              });
    chart3.addSeries({  
       yAxis:1,name:"Cumulative",
                  type:"line",
                  data:Cumulative
              });
  });
  });
  }