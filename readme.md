## Weather Dashboard

---

### https://zoneam.github.io/weather-dashboard/

---

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

#### JS

     [x] When page loads search bar displays and if there are recent searches displays weather
     [x] Once we input city to search for weather we fetch 2 API's to get 5 day data and UV index
     [x] Once fetched ok we check if city name already exists in our recent search and rearranging our recent searches
     [x] We limit our recent searches to 6 after 6th item we dump the last search
     [x] Once fetch is ok we save to local storage
     [x] Once fetch ok we dynamicly render all data on the screen
     [x] After we render everything on the screen we call addClickListener() function to add click listener for next 5 day forecast divs
     [x] Once any of 5 day forecast clicked we convert Fahrenheit to Celsius
     [x] We color UV index by its value
     [x] adding click listener to our city list and if clicked calling fetch function again and rearranging our hystory list

---

![My Portfolio Page Screenshot](./assets/screenshot.png)
