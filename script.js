async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = 'ec9e6d1b62c823ba1bfb8131ff3f09de'; 

  if (!city) {
    document.getElementById("weatherResult").innerText = "Please enter a city name.";
    return;
  }


⁵
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      document.getElementById("weatherResult").innerText = data.error.message;
      return;
    }

    const temp = data.current.temp_c;
    const condition = data.current.condition.text;
    const icon = data.current.condition.icon;
    const wind = data.current.wind_kph;
    const humidity = data.current.humidity;

    document.getElementById("weatherResult").innerHTML = `
      <p><strong>City:</strong> ${data.location.name}</p>
      <p><strong>Temperature:</strong> ${temp} °C</p>
      <p><strong>Condition:</strong> ${condition}</p>
      <p><strong>Wind Speed:</strong> ${wind} kph</p>
      <p><strong>Humidity:</strong> ${humidity}%</p>
      <img src="https:${icon}" alt="${condition}">
    `;
  } catch (error) {
    console.error(error);
    document.getElementById("weatherResult").innerText = "Error fetching data.";
  }
}
