let searchButton = $("#button-addon2");
let searchInput = $("#search-input");
let cityList = $(".city-list");
let currentWeatherImage = $("#current-weather-image");
let heroWeatherCity = $(".hero-weather-city");
let heroWeatherTemp = $(".hero-weather-temp");
let heroWeatherHumidity = $(".hero-weather-humidity");
let heroWeatherWind = $(".hero-weather-wind");
let heroWeatherUV = $(".hero-weather-uv");
let fiveDayForecast = [[],[],[],[],[]];
searchButton.on("click", function(event){
    event.preventDefault();
     let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${ searchInput.val() }&units=imperial&appid=95d58ea334ba866f1b56ccbf029ea497`

    fetch(apiLink).then(function(response){
        if (response.status == 200) {
            response.json().then(function (data) {
                uvIndex(data.coord.lat,data.coord.lon);
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

function fiveDayForecastDisplay(fiveDayData){
    console.log("Five Day Data", fiveDayData)
    let nextDay = new Date();
    $("<h2>").text("5 Day Forecast").appendTo(document.body);
    let cardDiv = $("<div>").addClass("container container-bottom").appendTo(document.body);
    let cardGroup = $("<div>").addClass("card-group").appendTo(cardDiv);

    for (i=0; i<5; i++){
        nextDay.setDate(nextDay.getDate() + 1);
        fiveDayForecast[0].push(nextDay.toLocaleDateString());
        fiveDayForecast[1].push(fiveDayData.daily[i].temp.day);
        fiveDayForecast[2].push(fiveDayData.daily[i].humidity);
        fiveDayForecast[3].push(fiveDayData.daily[i].weather[0].icon);
   
    console.log("fiveDayData.daily", fiveDayForecast)
}

for(i=0; i < fiveDayForecast.length;i++){
    var cardBgPrimary = $("<div>").addClass("card bg-primary").appendTo(cardGroup);
    var cardBody = $("<div>").addClass("card-body text-center").appendTo(cardBgPrimary);
    $("<p>").addClass("card-text").text(fiveDayForecast[0][i]).appendTo(cardBody);
    $("<img>").attr("src", "http://openweathermap.org/img/wn/" + fiveDayForecast[3][i] + '.png').appendTo(cardBody);
    $("<span>").text("Temperature: " + fiveDayForecast[1][i]).appendTo(cardBody);
    $("<p>").text("Humidity: " + fiveDayForecast[2][i]).appendTo(cardBody);
    }
}


function uvIndex(lat,lon){
  let uvApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${ lat }&lon=${ lon }&units=imperial&appid=95d58ea334ba866f1b56ccbf029ea497`
  fetch(uvApi).then(function(response){
    if (response.status == 200) {
        response.json().then(function (data) {
            console.log("second",data)
            heroWeatherUV.text("UV Index: " + data.current.uvi)
            fiveDayForecastDisplay(data);
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
    let heroWeatherIcon = "http://openweathermap.org/img/wn/" + rawData.weather[0].icon + '.png';
    heroWeatherCity.text(rawData.name + " (" + rawData.sys.country + ")" + ": " + "( " + new Date().toLocaleDateString() + " ) " + " - " + rawData.weather[0].description);
    $("<img>").addClass("current-weather-image").attr("src", heroWeatherIcon).appendTo(heroWeatherCity);
    heroWeatherTemp.text("Temperature: " +  rawData.main.temp + ' \u00B0' + "F");
    heroWeatherHumidity.text("Humidity: " + rawData.main.humidity);
    heroWeatherWind.text("Wind Speed: " + rawData.wind.speed + " mph")
    console.log(rawData)
}