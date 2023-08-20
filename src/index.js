let date = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[date.getDay()];
let hour = date.getHours().toString().padStart(2, "0");
let minutes = date.getMinutes().toString().padStart(2, "0");
let time = `${hour}:${minutes}`;
let p2 = document.querySelector("p2");
p2.innerHTML = `${currentDay} ${time}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col">
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
          <img
            src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt="Clear"
            id="icon"
          />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-max">${Math.round(
              forecastDay.temp.max
            )}°F</span> |<span class="weather-forecast-min"> ${Math.round(
          forecastDay.temp.min
        )}°F</span>
          </div>
        </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function search(event) {
  event.preventDefault();
  let input = document.querySelector("#search-text-input");
  let h2 = document.querySelector("h2");
  h2.innerHTML = input.value;
  let city = input.value;
  let units = "imperial";
  let apiKey = "667d9f573c8af4c33457be5d561a9148";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiURL).then(displayTemperature);
}

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKeyGeo = `7de13162f1f290fa9b7e98c86d849836`;
  let apiUrlGeo = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKeyGeo}&units=imperial`;
  axios.get(apiUrlGeo).then(showTempGeo);
}

function displayTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = temperature;
  let descriptionElement = document.querySelector("p3");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

navigator.geolocation.getCurrentPosition(getPosition);

function showTempGeo(response) {
  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;
  let geoName = response.data.name;
  let h2 = document.querySelector("h2");
  h2.innerHTML = geoName;
  let descriptionElement = document.querySelector("p3");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

let celsiusTemperature = null;

let form = document.querySelector("form");
form.addEventListener("submit", search);
