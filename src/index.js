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

function displayTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let h1 = document.querySelector("h1");
  h1.innerHTML = temperature;
}

let form = document.querySelector("form");
form.addEventListener("submit", search);
