var cityName = document.getElementById("#search-value");
var uvresults;
var formEl = document.querySelector("#search-city");
var DashboardEl = document.querySelector("#jumbotron");

function displayDashboard(event) {
  event.preventDefault();
  console.log(event);
  var cityName = document.getElementById("search-value").value;

  // cityList.push(cityName);

  // for (let i = 0; i < cityList.length; i++) {
  //   JSON.parse(window.localStorage.getItem("cityList"));
  //   // var cityNamesEl = document.querySelector(".cityNames");
  //   // cityNamesEl.textContent = cityList[i].cityList;
  //   // cityNamesEl.append(cityList);
  //   // document.getElementById("demo").innerHTML = highScore["0:i"];
  // }
  // for loop then generate
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
          var titleEl = document.createElement("h2");
          document.querySelector(".jumbotron").innerHTML = `
          <h1> Current Weather:
          <h5>
            ${results.name} ~ ${moment(results.dt, "X").format("LL")} 
            <img src="https://openweathermap.org/img/w/${
              response.current.weather[0].icon
            }.png" alt=""></h5></h1>
          <p id="temp"> Temperature: ${response.current.temp}&deg; F </p>
          <p id="humidity"> Humidity: ${response.current.humidity} % </p>
          <p id="windSpeed"> Wind Speed: ${response.current.wind_speed} MPH </p>
          <p id="UV"> UV Index: ${response.current.uvi} </p>
          `;

          fiveDayForecast(cityName);
        });
    });
}

function fiveDayForecast(cityName) {
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
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
                <img src="https://openweathermap.org/img/w/${
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
    });
}

var saveList = function () {
  localStorage.setItem("cityList", JSON.stringify(cityList));
  console.log("tasks saved");
};

var loadCityList = function () {
  var savedList = JSON.parse(localStorage.getItem("cityList")) || [];
  console.log("Saved tasks found!");
  for (var i = 0; i < cityList.length; i++) {
    // pass each task object into the `createTaskEl()` function
    createTaskEl(savedList[i]);
  }
};

formEl.addEventListener("submit", displayDashboard);

fiveDayForecast();

// document.querySelector("#citySearch").addEventListener("click", getSearchVal);
