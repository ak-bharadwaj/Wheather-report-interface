async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = 'ec9e6d1b62c823ba1bfb8131ff3f09de'; // Use your real API key

  if (!city) {
    document.getElementById("weatherResult").innerText = "Please enter a city name.";
    return;
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response not ok');
    const data = await response.json();

    if (data.error) {
      document.getElementById("weatherResult").innerText = data.error.message;
      return;
    }

    const { temp_c, condition, wind_kph, humidity } = data.current;
    document.getElementById("weatherResult").innerHTML = `
      <p><strong>City:</strong> ${data.location.name}</p>
      <p><strong>Temperature:</strong> ${temp_c} °C</p>
      <p><strong>Condition:</strong> ${condition.text}</p>
      <p><strong>Wind Speed:</strong> ${wind_kph} kph</p>
      <p><strong>Humidity:</strong> ${humidity}%</p>
      <img src="https:${condition.icon}" alt="${condition.text}">
    `;
  } catch (error) {
    console.error(error);
    document.getElementById("weatherResult").innerText = "Error fetching data.";
  }
}