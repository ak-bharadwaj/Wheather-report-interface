const apiKey = 'ec9e6d1b62c823ba1bfb8131ff3f09de'; // Replace with your key
async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    document.getElementById("weatherResult").innerText = "Please enter a city name.";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();

    const { temp, humidity } = data.main;
    const condition = data.weather[0].main;
    const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const wind = data.wind.speed;

    document.getElementById("weatherResult").innerHTML = `
      <p><strong>City:</strong> ${data.name}</p>
      <p><strong>Temperature:</strong> ${temp} °C</p>
      <p><strong>Condition:</strong> ${condition}</p>
      <p><strong>Wind Speed:</strong> ${wind} m/s</p>
      <p><strong>Humidity:</strong> ${humidity}%</p>
      <img src="${icon}" alt="${condition}">
    `;
  } catch (error) {
    document.getElementById("weatherResult").innerText = error.message;
  }
}