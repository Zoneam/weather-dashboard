/*
api --- https://openweathermap.org/api
95d58ea334ba866f1b56ccbf029ea497

*/
let searchButton = $("#button-addon2");
let searchInput = $("#search-input");
let cityList = $(".city-list");
let currentWeatherImage = $("#current-weather-image");


searchButton.on("click", function(event){
    event.preventDefault();
    let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.val()}&units=imperial&appid=95d58ea334ba866f1b56ccbf029ea497`

    fetch(apiLink).then(function(response){
        if (response.ok) {
            response.json().then(function (data) {
                displayInfo(data)
            })
        }
    })
    
})

function displayInfo(rawData) {
    searchInput.val("")
    let heroWeatherCity = $(".hero-weather-city");
    let heroWeatherTemp = $(".hero-weather-temp");
    let heroWeatherHumidity = $(".hero-weather-humidity");
    let heroWeatherWind = $(".hero-weather-wind");
    let heroWeatherPressure = $(".hero-weather-pressure");
    let heroWeatherIcon = "http://openweathermap.org/img/wn/" + rawData.weather[0].icon + '.png'
    heroWeatherCity.text(rawData.name + ": ");
    $("<img>").addClass("current-weather-image").attr("src", heroWeatherIcon).appendTo(heroWeatherCity);
    
    heroWeatherTemp.text("Temperature: " +  rawData.main.temp + ' \u00B0' + "F");
    heroWeatherHumidity.text("Humidity: " + rawData.main.humidity);
    heroWeatherWind.text("Wind Speed: " + rawData.wind.speed + " mph")
    heroWeatherPressure.text("Pressure: " + rawData.main.pressure)
    
    console.log(rawData)
    console.log($("current-weather-image").length)
}