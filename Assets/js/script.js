var cityName = document.getElementById("#search-value");
var uvresults;
var formEl = document.querySelector("#search-city");
var DashboardEl = document.querySelector("#jumbotron");

// function makeRow(searchValue) {
//   var liEl = document.createElement("li")
//   liEl.classList.add("list-group-item", "list-group-item-action");
//   var text = searchValue;
//   liEl.textContent = text;
//   var historyEl = document.querySelector('.history');
//   console.log(event.target)
//   historyEl.onclick = function(){
//     console.log(event.target.tagName)
//     if (event.target.tagName == "LI"){
//     searchWeather(event.target.textContent)
//     }
//   }
//   historyEl.appendChild(liEl);
// };

// var geocoder;
// geocoder = new google.maps.Geocoder();
// var latlng = new google.maps.LatLng(latitude, longitude);

// geocoder.geocode(
// {'latLng': latlng},
// function(results, status) {
//     if (status == google.maps.GeocoderStatus.OK) {
//             if (results[0]) {
//                 var add= results[0].formatted_address ;
//                 var  value=add.split(",");

//                 count=value.length;
//                 country=value[count-1];
//                 state=value[count-2];
//                 city=value[count-3];
//                 alert("city name is: " + city);
//             }
//             else  {
//                 alert("address not found");
//             }
//     }
//      else {
//         alert("Geocoder failed due to: " + status);
//     }
// }

// function GetFormattedDate() {
//   var todayTime = new Date();
//   var month = format(todayTime.getMonth() + 1);
//   var day = format(todayTime.getDate());
//   var year = format(todayTime.getFullYear());
//   return month + "/" + day + "/" + year;
// }

function displayDashboard(event) {
  event.preventDefault();
  var cityName = document.getElementById("search-value").value;
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=b646d9e9b51e8298cf0ce0dc06240afd&units=imperial"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (results) {
      console.log("res", results);
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${results.coord.lat}&lon=${results.coord.lon}&units=imperial&exclude=hourly,daily,minutely&appid=b646d9e9b51e8298cf0ce0dc06240afd`
      )
        .then(function (response) {
          console.log(response);
          return response.json();
        })
        .then(function (response) {
          console.log(response);
          var titleEl = document.createElement("h3");
          document.querySelector(".jumbotron").innerHTML = `

            ${results.name} ~ ${moment(results.dt, "X").format("LL")} 
            <img src="http://openweathermap.org/img/w/${
              response.current.weather[0].icon
            }.png" alt="">
          <p id="temp">Temperature: ${response.current.temp}&deg; F </p>
          <p id="humidity">Humidity: ${response.current.humidity} % </p>
          <p id="windSpeed">Wind Speed: ${response.current.wind_speed} MPH </p>
          <p id="UV"> UV Index: ${response.current.uvi} </p>
          `;

          fiveDayForecast(cityName);
        });
    });
}

function fiveDayForecast(cityName) {
  fetch(
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
      cityName +
      "&appid=b646d9e9b51e8298cf0ce0dc06240afd&units=imperial"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (results) {
      document.querySelector(".card-deck").innerHTML = "";
      for (let i = 0; i < results.list.length; i++) {
        let forecast = results.list[i];
        console.log(forecast);
        if (forecast.dt_txt.includes("00:00:00")) {
          document.querySelector(".card-deck").innerHTML += `
          <div class="card">
              <div class="card-body" id="monday">
                <span class="card-title">${moment(forecast.dt, "X").format(
                  "LL"
                )}</span>
                <img src="http://openweathermap.org/img/w/${
                  forecast.weather[0].icon
                }.png" alt="" />
                <p class="card-text">Temp: ${forecast.main.temp} &deg; F</p>
                <p class="card-text">
                  <small class="text-muted">Humidity:${
                    forecast.main.humidity
                  }  %</small>
                </p>
              </div>
            </div>


              `;
        }
      }
      // document.getElementById("monday").innerHTML = `
      //       <h5 class="card-title">3/8/2021</h5>
      //       <img src="http://openweathermap.org/img/w/${results.list[1].icon}.png" alt="">
      //       <p class="card-text">Temp: ${results.list[0].main.temp}&deg; F</p>
      //       <p class="card-text"><small class="text-muted">Humidity 20 %</small></p>
      //   `;
      // document.getElementById("tuesday").innerHTML = `
      //   <h5 class="card-title">3/8/2021</h5>
      //   <img src="http://openweathermap.org/img/w/${results.list[1].icon}.png" alt="">
      //   <p class="card-text">Temp: 50 &deg; F</p>
      //   <p class="card-text"><small class="text-muted">Humidity 20 %</small></p>
      //   `;
      // document.getElementById("wednesday").innerHTML = `
      //   <h5 class="card-title">3/8/2021</h5>
      //   <img src="http://openweathermap.org/img/w/${results.list[1].icon}.png" alt="">
      //   <p class="card-text">Temp: 50 &deg; F</p>
      //   <p class="card-text"><small class="text-muted">Humidity 20 %</small></p>
      //     `;
      // document.getElementById("thursday").innerHTML = `
      // <h5 class="card-title">3/8/2021</h5>
      // <img src="http://openweathermap.org/img/w/${results.list[1].icon}.png" alt="">
      // <p class="card-text">Temp: 50 &deg; F</p>
      // <p class="card-text"><small class="text-muted">Humidity 20 %</small></p>
      // `;
      // document.getElementById("friday").innerHTML = `
      // <h5 class="card-title">3/8/2021</h5>
      // <img src="http://openweathermap.org/img/w/${results.list[1].icon}.png" alt="">
      // <p class="card-text">Temp: 50 &deg; F</p>
      // <p class="card-text"><small class="text-muted">Humidity 20 %</small></p>
      // `;
    });
}
formEl.addEventListener("submit", displayDashboard);

fiveDayForecast();

// document.querySelector("#citySearch").addEventListener("click", getSearchVal);
