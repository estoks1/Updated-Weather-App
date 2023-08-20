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

function search(event) {
  event.preventDefault();
  let input = document.querySelector("#search-text-input");
  console.log(input.value);
  let h2 = document.querySelector("h2");
  h2.innerHTML = input.value;
  let city = input.value;
  let units = "metric";
  let apiKey = "667d9f573c8af4c33457be5d561a9148";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiURL).then(displayTemperature);
}

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKeyGeo = `7de13162f1f290fa9b7e98c86d849836`;
  let apiUrlGeo = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKeyGeo}&units=metric`;
  axios.get(apiUrlGeo).then(showTempGeo);
}

function displayTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  h1.innerHTML = temperature;
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
}

let form = document.querySelector("form");
form.addEventListener("submit", search);

navigator.geolocation.getCurrentPosition(getPosition);

function showTempGeo(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${temperature}`;
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
}
