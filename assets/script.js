/*
api --- https://openweathermap.org/api
95d58ea334ba866f1b56ccbf029ea497

*/
let searchButton = $("#button-addon2");
let searchInput = $("#search-input");
let cityList = $(".city-list");
let currentWeatherImage = $("#current-weather-image");
let heroWeatherCity = $(".hero-weather-city");
let heroWeatherTemp = $(".hero-weather-temp");
let heroWeatherHumidity = $(".hero-weather-humidity");
let heroWeatherWind = $(".hero-weather-wind");
let lat;
let lon;
let myData = {
        apiLink: [`https://api.openweathermap.org/data/2.5/weather?q=${ searchInput.val() }&units=imperial&appid=95d58ea334ba866f1b56ccbf029ea497`,`https://api.openweathermap.org/data/2.5/onecall?lat=${ lat }&lon=${ lon }&appid=95d58ea334ba866f1b56ccbf029ea497`],
         currentWeather: [], // currentCity, currentTemp, currentHumidity, currentWind, currentUv
         fiveDayForecast: [],  // date, icon, temp, humidity
         storedCities: []
 }


// ---------------------- fetch Current Weather ---------------

// searchButton.on("click", function(event){
//     event.preventDefault();






// })





searchButton.on("click", function(event){
    event.preventDefault();
     let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${ searchInput.val() }&units=imperial&appid=95d58ea334ba866f1b56ccbf029ea497`

    fetch(apiLink).then(function(response){
        if (response.status == 200) {
            response.json().then(function (data) {
                uvIndex(data.coord.lat,data.coord.lon);
                let today = new Date().toLocaleDateString()
                console.log(today)
                displayInfo(data)
            })
        } else {
            alert("Please enter valid city name")
        }
    })
    .catch(function(){
        console.log("Bad Request")
    })
})

// -------------------------- UV Index fetch

function uvIndex(lat,lon){
  let uvApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${ lat }&lon=${ lon }&appid=95d58ea334ba866f1b56ccbf029ea497`
  fetch(uvApi).then(function(response){
    if (response.status == 200) {
        response.json().then(function (data) {
            console.log("second",data)
            let heroWeatherUV = $(".hero-weather-uv");
            heroWeatherUV.text("UV Index: " + data.current.uvi)
        })
    }
})
.catch(function(){
    console.log("Bad Request")
})
}

// ----------------------- Display Info

function displayInfo(rawData) {
    searchInput.val("")
    let heroWeatherIcon = "http://openweathermap.org/img/wn/" + rawData.weather[0].icon + '.png'
    heroWeatherCity.text(rawData.name + " (" + rawData.sys.country + ")" + ": " + "( " + new Date().toLocaleDateString() + " ) " + " - " + rawData.weather[0].description);
    $("<img>").addClass("current-weather-image").attr("src", heroWeatherIcon).appendTo(heroWeatherCity);
    heroWeatherTemp.text("Temperature: " +  rawData.main.temp + ' \u00B0' + "F");
    heroWeatherHumidity.text("Humidity: " + rawData.main.humidity);
    heroWeatherWind.text("Wind Speed: " + rawData.wind.speed + " mph")
    console.log(rawData)
}