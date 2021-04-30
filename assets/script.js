let searchButton = $("#button-addon2");
let searchInput = $("#search-input");
let heroWeatherUV;

//------------- Click Event
searchButton.on("click", function(event){
    event.preventDefault();
     let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${ searchInput.val() }&units=imperial&appid=95d58ea334ba866f1b56ccbf029ea497`
    
    
     fetch(apiLink).then(function(response){
        if (response.status == 200) {
            response.json().then(function (data) {
//////-------------------- Second Fetch  
            let uvApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${ data.coord.lat }&lon=${ data.coord.lon }&units=imperial&appid=95d58ea334ba866f1b56ccbf029ea497`
            fetch(uvApi).then(function(response){
            if (response.status == 200) {
                response.json().then(function (dataUv) {
                    console.log("second",dataUv)
                    heroWeatherUV = dataUv.current.uvi;
                    console.log("heroWeatherUV",heroWeatherUV)
                    fiveDayForecastDisplay(dataUv);
                    displayInfo(data);
                })
            }
            })
            .catch(function(){
             console.log("Bad Request")
        })
            })
        } else {
            alert("Please enter valid city name")
        }
    })
    .catch(function(){
        console.log("Bad Request")
    })
})

function fiveDayForecastDisplay(fiveDayData){
    let fiveDayForecast = [[],[],[],[]];
    console.log("Five Day Data", fiveDayData)
    let nextDay = new Date();
    if ($(".div-wrapper").length){
        $(".div-wrapper").empty();
        $(".div-wrapper").remove();
    }

    let divWrapper = $("<div>").addClass("div-wrapper").appendTo(document.body);
    $("<h2>").text("5 Day Forecast").appendTo(divWrapper);
    let cardDiv = $("<div>").addClass("container container-bottom").appendTo(divWrapper);
    let cardGroup = $("<div>").addClass("card-group").appendTo(cardDiv);

    for (i=0; i<5; i++){
        nextDay.setDate(nextDay.getDate() + 1);
        fiveDayForecast[0].push(nextDay.toLocaleDateString());
        fiveDayForecast[1].push(fiveDayData.daily[i].temp.day);
        fiveDayForecast[2].push(fiveDayData.daily[i].humidity);
        fiveDayForecast[3].push(fiveDayData.daily[i].weather[0].icon);
   
    console.log("fiveDayData.daily", fiveDayForecast)
}

    for (i=0; i < fiveDayForecast[0].length;i++){
            var cardBgPrimary = $("<div>").addClass("card bg-primary").appendTo(cardGroup);
            var cardBody = $("<div>").addClass("card-body text-center").appendTo(cardBgPrimary);
            $("<p>").addClass("card-text").text(fiveDayForecast[0][i]).appendTo(cardBody);
            $("<img>").attr("src", "http://openweathermap.org/img/wn/" + fiveDayForecast[3][i] + '.png').appendTo(cardBody);
            $("<span>").text("Temperature: " + fiveDayForecast[1][i]).appendTo(cardBody);
            $("<p>").text("Humidity: " + fiveDayForecast[2][i]).appendTo(cardBody);
        }
}

// ----------------------- Display Info

function displayInfo(rawData) {
    searchInput.val("")

    if($(".myCard").length){
        $(".myCard").empty();
        $(".myCard").remove();
    }
    
    let heroWeatherIcon = "http://openweathermap.org/img/wn/" + rawData.weather[0].icon + '.png';
    let rightCardDiv = $("<div>").addClass("card myCard").appendTo($(".infowrap"));
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

                
    console.log(rawData)
}