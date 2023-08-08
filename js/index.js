//https://api.weatherapi.com/v1/forecast.json?key=81800bc5a7434748b7c184614230708&q=lond&days=7
let menu_icon = document.querySelector("#menu-icon");
let mobile_menu = document.querySelectorAll(".menu-vertical")[0];
let location_field = document.querySelector("#location_field");
let forecast_cards = document.querySelectorAll(".forecast_cards")[0];

(function () {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const gioApi = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
      fetch(gioApi)
        .then((res) => res.json())
        .then((data) => {
          getForecastDetails(data.city);
        });
    },
    (error = () => {
      console.log("cannot get position");
    })
  );
})();
// EVENTS
menu_icon.addEventListener("click", showMobileMenu);
location_field.addEventListener("input", function () {
  getForecastDetails(location_field.value);
});

// FUNCTIONS
function showMobileMenu() {
  mobile_menu.classList.contains("d-none")
    ? mobile_menu.classList.replace("d-none", "d-block")
    : mobile_menu.classList.replace("d-block", "d-none");
}
async function getForecastDetails(city) {
  let result = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=81800bc5a7434748b7c184614230708&q=${city}&days=3`
  );
  let data = await result.json();
  displayForecastData(data);
}
function displayForecastData(data) {
  let daysName = [];
  let location = data.location;
  let current = data.current;
  let direction = getDirection(current.wind_dir);
  let forecast = data.forecast.forecastday;
  let current_day = monthName(forecast[0].date);

  for (let i = 0; i < forecast.length; i++) {
    daysName.push(dayName(forecast[i].date));
  }

  let template = `<div class="forecast col-md-4 p-0">
  <div class="card_header d-flex justify-content-between align-items-center">
      <p>${daysName[0]}</p>
      <p>${current_day.day}  ${current_day.month}</p>
  </div>
  <div class="card_content">
      <p class="mt-1">${location.name}</p>
      <div class="d-flex align-items-center justify-content-between">
          <h2 class="text-white me-4">${forecast[0].day.maxtemp_c}<sup>o</sup>C</h2>
          <div>
              <img src="${forecast[0].day.condition.icon}" alt="${forecast[0].day.condition.text}" class="w-100">
          </div>

      </div>
      <small>${forecast[0].day.condition.text}</small>
      <ul class="list-unstyled mt-3 d-flex">
          <li><img src="./images/icon-umberella.png" class="me-1">${forecast[0].day.daily_chance_of_rain}%</li>
          <li><img src="./images/icon-wind.png" class="me-1">${forecast[0].day.avgvis_km} km/h</li>
          <li><img src="./images/icon-compass.png" class="me-1">${direction}</li>
      </ul>
  </div>

</div>
<div class="forecast middel_card text-center col-md-4 p-0">
  <div class="card_header d-flex justify-content-center align-items-center">
  <p>${daysName[1]}</p>
  </div>
  <div class="card_content py-5">
      <div>
          <img src="${forecast[1].day.condition.icon}">
      </div>
      <h3>${forecast[1].day.maxtemp_c}<sup>o</sup>C</h3>
      <h4>${forecast[1].day.mintemp_c}<sup>o</sup></h4>
      <small>${forecast[1].day.condition.text}</small>
  </div>
</div>
<div class="forecast  text-center col-md-4 p-0">
  <div class="card_header d-flex justify-content-center align-items-center">
  <p>${daysName[2]}</p>
  </div>
  <div class="card_content py-5">
      <div>
          <img src="${forecast[2].day.condition.icon}">
      </div>
      <h3>${forecast[2].day.maxtemp_c}<sup>o</sup>C</h3>
      <h4>${forecast[2].day.mintemp_c}<sup>o</sup></h4>
      <small>${forecast[2].day.condition.text}</small>
  </div>
</div>`;

  forecast_cards.innerHTML = template;
}
function getDirection(wind_dir) {
  switch (wind_dir) {
    case "N":
      return "North";
      break;
    case "W":
      return "West";
      break;
    case "E":
      return "East";
      break;
    case "S":
      return "South";
      break;
    case "SW":
      return "South West";
      break;
    case "NW":
      return "Nourth West";
      break;
    case "NE":
      return "Nourth East";
      break;
    case "SE":
      return "South East";
      break;
    case "NNW":
      return "North North West";
      break;
    case "NNE":
      return "North North East";
      break;
    case "WNW":
      return "West North West";
      break;
    case "ENE":
      return "East North East";
      break;
    case "WSW":
      return "West North West";
      break;
    case "SSW":
      return "South South West";
      break;
    case "SSE":
      return "South South East";
      break;
    case "ESE":
      return "East South East";
      break;

    default:
      break;
  }
}
function dayName(dayString) {
  let date = new Date(dayString);
  return date.toLocaleString("en-us", { weekday: "long" });
}
function monthName(dayString) {
  let date = new Date(dayString);
  return {
    day: date.getDate(),
    month: date.toLocaleString("default", { month: "long" }),
  };
}
