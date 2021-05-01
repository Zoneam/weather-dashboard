let searchButton = $("#button-addon2");
let searchInput = $("#search-input");
let listUl = $(".city-list");
let cityList = $(".list-group-item");
let heroWeatherUV;
let storedCities = [];
let searchCity;
//--------------- get from local storage
function getStoredCities() {
    storedCities = JSON.parse(localStorage.getItem("Recent Cities"))
        if (storedCities !== null) {
            renderCities();
        } else {
            storedCities = [];
        }
}

//--------------- render Cities
function renderCities() {
    if ($(".list-group-item").length){
        $(".list-group-item").remove()
    }
    storedCities.forEach(element => {
        $("<li>").addClass("list-group-item").text(element).appendTo(listUl);
    });
}

$(".city-list").on("click", "li" , function(event){
    event.preventDefault();
    searchCity = $(this).text();
    fetchApis();
})

//------------- Click Event
searchButton.on("click", function(event){
    event.preventDefault();
    searchCity = searchInput.val()
    fetchApis();
})

// ------------- fetch APIs
function fetchApis(){
    let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${ searchCity }&units=imperial&appid=95d58ea334ba866f1b56ccbf029ea497`
    fetch(apiLink).then(function(response){
       if (response.status == 200) {
           response.json().then(function (data) {
//-------------------- Second Fetch  
           let uvApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${ data.coord.lat }&lon=${ data.coord.lon }&units=imperial&appid=95d58ea334ba866f1b56ccbf029ea497`
           fetch(uvApi).then(function(response){
           if (response.status == 200) {
               response.json().then(function (dataUv) {
                   console.log("second",dataUv);
                   heroWeatherUV = dataUv.current.uvi;
                   console.log("heroWeatherUV",heroWeatherUV);
                   fiveDayForecastDisplay(dataUv);
                    if  (!storedCities.includes(searchCity.trim())){
                            storedCities.unshift(searchCity.trim());
                        }
                    if (storedCities.length >= 6){
                            storedCities.splice(6);
                        }
                    localStorage.setItem("Recent Cities", JSON.stringify(storedCities));
                    console.log("storedCities click", storedCities);
                    renderCities();
                    displayInfo(data);
               })
           }
           })
           .catch(function(){
            console.log("Bad Request");
       })
           })
       } else {
           searchInput.val("");
           alert("Please enter valid city name")
       }
   })
   .catch(function(){
       console.log("Bad Request")
   })
}

// ----------------------- Display Info for next 5 days
function fiveDayForecastDisplay(fiveDayData){
    let fiveDayForecast = [[],[],[],[],[]];
    console.log("Five Day Data", fiveDayData)
    let nextDay = new Date();
    if ($(".div-wrapper").length){
        $(".div-wrapper").empty();
        $(".div-wrapper").remove();
    }

    let divWrapper = $("<div>").addClass("div-wrapper").appendTo(document.body);
    $("<h2>").text("5 Day Forecast").appendTo(divWrapper);
    let cardDiv = $("<div>").addClass("container-bottom").appendTo(divWrapper);
    let cardGroup = $("<div>").addClass("card-group").appendTo(cardDiv);
   
    for (i=0; i<fiveDayForecast.length; i++){
            nextDay.setDate(nextDay.getDate() + 1);
            fiveDayForecast[i].push(nextDay.toLocaleDateString());
            fiveDayForecast[i].push(fiveDayData.daily[i].weather[0].icon);
            fiveDayForecast[i].push(fiveDayData.daily[i].temp.day);
            fiveDayForecast[i].push(fiveDayData.daily[i].humidity);      
    }
    for (i=0; i < fiveDayForecast.length;i++){
            var cardBgPrimary = $("<div>").addClass("myspdiv").appendTo(cardGroup);
            var cardBody = $("<div>").addClass("card-body-div text-center").appendTo(cardBgPrimary);
            $("<p>").addClass("card-text").text(fiveDayForecast[i][0]).appendTo(cardBody);
            $("<img>").attr("src", "http://openweathermap.org/img/wn/" + fiveDayForecast[i][1] + '.png').appendTo(cardBody);
            $("<p>").text("Temperature: " + fiveDayForecast[i][2] + ' \u00B0' + "F").appendTo(cardBody);
            $("<p>").text("Humidity: " + fiveDayForecast[i][3]).appendTo(cardBody);
        }
}

// ----------------------- Display Info for Today
function displayInfo(rawData) {
    searchInput.val("");
    console.log(rawData);

    if($(".rightInfoCard").length){
        $(".rightInfoCard").empty();
        $(".rightInfoCard").remove();
    }
    
    let heroWeatherIcon = "http://openweathermap.org/img/wn/" + rawData.weather[0].icon + '.png';
    let rightCardDiv = $("<div>").addClass("rightInfoCard").appendTo($(".infowrap"));
    let rightCardDivChild = $("<div>").addClass("card-body main-card").appendTo(rightCardDiv);
    let rightCardUl = $("<ul>").addClass("hero-weather-list").appendTo(rightCardDivChild);
          let  iconLi =   $("<li>").addClass("hero-weather-city")
          .text(rawData.name + " (" + rawData.sys.country + ")" + ": " + "( " + new Date().toLocaleDateString() + " ) " + " - " + rawData.weather[0].description)
          .appendTo(rightCardUl);
                    $("<img>").addClass("current-weather-image").attr("src", heroWeatherIcon).appendTo(iconLi);
                    $("<li>").addClass("hero-weather-temp").text("Temperature: " +  rawData.main.temp + ' \u00B0' + "F").appendTo(rightCardUl);
                    $("<li>").addClass("hero-weather-humidity").text("Humidity: " + rawData.main.humidity).appendTo(rightCardUl);
                    $("<li>").addClass("hero-weather-wind").text("Wind Speed: " + rawData.wind.speed + " mph").appendTo(rightCardUl);
                    $("<li>").addClass("hero-weather-uv").text("UV Index: " + heroWeatherUV).appendTo(rightCardUl);
}
getStoredCities();
// ---------- displays last searched city 
if (storedCities.length){
    fetchApis(searchCity=$( "li" ).first().text())
}