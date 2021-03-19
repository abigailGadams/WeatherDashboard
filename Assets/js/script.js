var cityName = "Seattle";
var uvresults;

function displayDashboard() {
  fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=4580d9551d63432eb58e2746419ab2c8&units=imperial"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (results) {
      console.log(results);
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,daily,minutely&appid=4580d9551d63432eb58e2746419ab2c8`
      )
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (response) {
        console.log(response);
        document.querySelector(".jumbotron").innerHTML = `
          <h3>Seattle (March 9, 2021) <img src="http://openweathermap.org/img/w/${response.current.weather[0].icon}.png" alt=""></h3>
          <p id="temp">Temperature: ${response.current.temp}&deg; F </p>
          <p id="humidity">Humidity: ${response.current.humidity} % </p>
          <p id="windSpeed">Wind Speed: ${response.current.wind_speed} MPH </p>
          <p id="UV"> UV Index: ${response.current.humidity} </p>
          `;
      });
    })
    
  
}

function fiveDayForecast() {
  fetch(
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
      cityName +
      "&appid=4580d9551d63432eb58e2746419ab2c8&units=imperial"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (results) {
      console.log(results);
      document.getElementById("monday").innerHTML = `
            <h5 class="card-title">3/8/2021</h5>
            <img src="http://openweathermap.org/img/w/${results.list[1].icon}.png" alt="">
            <p class="card-text">Temp: ${results.list[0].main.temp}&deg; F</p>
            <p class="card-text"><small class="text-muted">Humidity 20 %</small></p>
        `;
      document.getElementById("tuesday").innerHTML = `
        <h5 class="card-title">3/8/2021</h5>
        <img src="http://openweathermap.org/img/w/${results.list[1].icon}.png" alt="">
        <p class="card-text">Temp: 50 &deg; F</p>
        <p class="card-text"><small class="text-muted">Humidity 20 %</small></p>
        `;
      document.getElementById("wednesday").innerHTML = `
        <h5 class="card-title">3/8/2021</h5>
        <img src="http://openweathermap.org/img/w/${results.list[1].icon}.png" alt="">
        <p class="card-text">Temp: 50 &deg; F</p>
        <p class="card-text"><small class="text-muted">Humidity 20 %</small></p>
          `;
      document.getElementById("thursday").innerHTML = `
      <h5 class="card-title">3/8/2021</h5>
      <img src="http://openweathermap.org/img/w/${results.list[1].icon}.png" alt="">
      <p class="card-text">Temp: 50 &deg; F</p>
      <p class="card-text"><small class="text-muted">Humidity 20 %</small></p>
      `;
      document.getElementById("friday").innerHTML = `
      <h5 class="card-title">3/8/2021</h5>
      <img src="http://openweathermap.org/img/w/${results.list[1].icon}.png" alt="">
      <p class="card-text">Temp: 50 &deg; F</p>
      <p class="card-text"><small class="text-muted">Humidity 20 %</small></p>
      `;
    });
}

displayDashboard();

fiveDayForecast();
