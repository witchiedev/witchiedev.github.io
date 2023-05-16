let canvas = document.getElementById("myChart");
let ctx = canvas.getContext('2d');
let exists = false;
let cityInput = 'Antarctica';
let weatherdata = {};
let defaultunit = 'metric';
function extract(city, day, unit){
  unit !== 'none' ? defaultunit = unit : null
  fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=${defaultunit}&key=7GEJ8XXDHAGNCALG6UXQFFQMH&contentType=json
  `) .then((response) => response.json()) .then((data) => {
    console.log(data)
    const defaultunits = {
      metric: [' km/h', ' °C'],
      us: [' mi/h', ' °F'],
      base: [' m/s', ' K'],
    }
    weatherdata = {
      condition: data.days[day].conditions,
      desc: data.days[day].description,
      temp: data.days[day].temp,
      humidity: data.days[day].humidity,
      cloudcover: data.days[day].cloudcover,
      windspeed: data.days[day].windspeed,
      uvindex: data.days[day].uvindex,
      days: [
        data.days[0].temp,
        data.days[1].temp,
        data.days[2].temp,
        data.days[3].temp,
        data.days[4].temp,
        data.days[5].temp,
        data.days[6].temp,
        data.days[0].conditions,
        data.days[1].conditions,
        data.days[2].conditions,
        data.days[3].conditions,
        data.days[4].conditions,
        data.days[5].conditions,
        data.days[6].conditions
      ],
      hours: [
        data.days[day].hours[0].temp,
        data.days[day].hours[1].temp,
        data.days[day].hours[2].temp,
        data.days[day].hours[3].temp,
        data.days[day].hours[4].temp,
        data.days[day].hours[5].temp,
        data.days[day].hours[6].temp,
        data.days[day].hours[7].temp,
        data.days[day].hours[8].temp,
        data.days[day].hours[9].temp,
        data.days[day].hours[10].temp,
        data.days[day].hours[11].temp,
        data.days[day].hours[12].temp,
        data.days[day].hours[13].temp,
        data.days[day].hours[14].temp,
        data.days[day].hours[15].temp,
        data.days[day].hours[16].temp,
        data.days[day].hours[17].temp,
        data.days[day].hours[18].temp,
        data.days[day].hours[19].temp,
        data.days[day].hours[20].temp,
        data.days[day].hours[21].temp,
        data.days[day].hours[22].temp,
        data.days[day].hours[23].temp
      ]
    }
    let currentPicture = document.querySelector('.current__icon');
    let currentCondition = weatherdata.condition.toLowerCase();
    let regexlist = [new RegExp('^snow'), new RegExp('^rain'), new RegExp('overcast'), new RegExp('cloudy'), new RegExp('clear')]
    if(regexlist[0].test(currentCondition) == true){
      currentPicture.src = "./snow.png"
    } else if(regexlist[1].test(currentCondition) == true){
      currentPicture.src = "./rain.png";
    } else if (regexlist[2].test(currentCondition) == true){
      currentPicture.src = "./cloud.png";
    } else if (regexlist[3].test(currentCondition) == true){
      currentPicture.src = "./sun-covered.png";
    } else {
      currentPicture.src = "./sun.png";
    }
    let vnavPictures = document.querySelectorAll('.v-nav__icon');
    for(var i=0; i< vnavPictures.length; i++){
      let priorCondition = weatherdata.days[i + 7].toLowerCase();
      if(regexlist[0].test(priorCondition) == true){
        vnavPictures[i].src = "./snow.png"
      } else if(regexlist[1].test(priorCondition) == true){
        vnavPictures[i].src = "./rain.png";
      } else if (regexlist[2].test(priorCondition) == true){
        vnavPictures[i].src = "./cloud.png";
      } else if (regexlist[3].test(priorCondition) == true){
        vnavPictures[i].src = "./sun-covered.png";
      } else {
        vnavPictures[i].src = "./sun.png";
      }
    }
    
    document.querySelector('.humidity').textContent = weatherdata.humidity + "% Humid";
    document.querySelector('.cloud-coverage').textContent = weatherdata.cloudcover + "% Cloud Coverage";
    document.querySelector('.wind-speed').textContent = weatherdata.windspeed +" "+ defaultunits[defaultunit][0];
    document.querySelector('.uv-index').textContent = weatherdata.uvindex + " UV-Index";
    document.querySelector('.current__temp').textContent = weatherdata.temp + " " + defaultunits[defaultunit][1];
    document.querySelector('.current__temp--description').textContent = weatherdata.desc;
    Chart.defaults.global.defaultFontSize = 12;
    var info = {
      labels: [
        "01:00:00", "02:00:00", "03:00:00", "04:00:00",
        "05:00:00", "06:00:00", "07:00:00", "08:00:00",
        "09:00:00", "10:00:00", "11:00:00", "12:00:00",
        "13:00:00", "14:00:00", "15:00:00", "16:00:00",
        "17:00:00", "18:00:00", "19:00:00", "20:00:00",
        "21:00:00", "22:00:00", "23:00:00", "24:00:00"
      ],
      datasets: [
        {
          fill: true,
          backgroundColor: "rgb(255, 150, 100)",
          data: [
            weatherdata.hours[0], weatherdata.hours[1], weatherdata.hours[2], weatherdata.hours[3], 
            weatherdata.hours[4], weatherdata.hours[5], weatherdata.hours[6], weatherdata.hours[7], 
            weatherdata.hours[8], weatherdata.hours[9], weatherdata.hours[10], weatherdata.hours[11], 
            weatherdata.hours[12], weatherdata.hours[13], weatherdata.hours[14], weatherdata.hours[15], 
            weatherdata.hours[16], weatherdata.hours[17], weatherdata.hours[18], weatherdata.hours[19], 
            weatherdata.hours[20], weatherdata.hours[21], weatherdata.hours[22], weatherdata.hours[23]
          ]
        }
      ]
    };
  
    var options = {
      responsive: false,
      events: [],
      tooltips: {
        displayColors: false,
        callbacks: {
          label: function(tooltipItem) {
            return Number(tooltipItem.yLabel) + " °C";
          }
        }
      },
      title: {
        display: true,
        text: '24 Hour Weather Forecast',
        position: 'bottom'
      },
      legend: {
        display: false
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero:true,
            }
          }
        ]
      }
    };
    let changeunit = document.querySelectorAll('.v-nav__temp');
    for(var i=0; i< changeunit.length; i++){
      changeunit[i].textContent = weatherdata.days[i] + " " + defaultunits[defaultunit][1];
    }
    options.scales.yAxes[0].ticks.callback = function(value, index, ticks) {
      return value +" " +defaultunits[defaultunit][1] ;
    }
    var myBarChart = new Chart(ctx, {
        type: 'bar',
        data: info,
        options: options,
    }); 
  });
}

