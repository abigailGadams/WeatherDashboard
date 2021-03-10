var cityName = "Seattle"

function displayDashboard() {
fetch("http://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=4580d9551d63432eb58e2746419ab2c8&units=imperial")
.then(function(response){
    return response.json();
})
.then(function(results){
    console.log(results);
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${results.coord.lat}&lon=${results.coord.lon}&&appid=4580d9551d63432eb58e2746419ab2c8`)
    .then(function(response){
        return response.json()
    })
    .then(function(uvresults){
        console.log(uvresults);
        document.querySelector(".jumbotron").innerHTML = `

        <h3>Seattle (March 9, 2021) <img src="http://openweathermap.org/img/w/${results.weather[0].icon}.png" alt=""></h3>
        <p class="temp">Temperature: ${results.main.temp}&deg; F</p>
        <p class="humidity">Humidity: ${results.}</p>
        <p class="windSpeed">Wind Speed: 4.7 MPH</p>
        <p class="UV"> UV Index: 9.49 </p>
        `
    })
    
   
})
}



displayDashboard();