//APOD API
document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "SsnrM5ME2maRBwdDka5Y8WghZs7rFD8hQEhQ69y6";
    let apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
  
    const dateInput = document.getElementById("date-input");
  
    const submitButton = document.getElementById("submit-btn");
    submitButton.addEventListener("click", () => {
      apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
      const date = dateInput.value;
      apiUrl += `&date=${date}`;
  
      fetchAPOD(apiUrl);
    });
  
    const currentDateButton = document.getElementById("current-date-btn");
    currentDateButton.addEventListener("click", () => {
      apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
  
      fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
        .then(response => {
          if (!response.ok) {
            throw new Error("APOD image not found");
          }
          return response.json();
        })
        .then(data => {
          const today = data.date;
          dateInput.value = today;
          apiUrl += `&date=${today}`;
  
          fetchAPOD(apiUrl);
        })
        .catch(error => {
          const apodContainer = document.getElementById("apod-container");
          apodContainer.textContent = error.message;
          console.error(error);
        });
    });
  
    function fetchAPOD(apiUrl) {
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error("APOD image not found");
          }
          return response.json();
        })
        .then(data => {
          const apodContainer = document.getElementById("apod-container");
          apodContainer.innerHTML = "";
          const image = document.createElement("img");
          image.src = data.url;
          apodContainer.appendChild(image);
        })
        .catch(error => {
          const apodContainer = document.getElementById("apod-container");
          apodContainer.textContent = error.message;
          console.error(error);
        });
    }
  });

  //Insight Mars Weather API
  function getMarsWeather() {
    const apiKey = "SsnrM5ME2maRBwdDka5Y8WghZs7rFD8hQEhQ69y6";
    const apiUrl = `https://api.nasa.gov/insight_weather/?api_key=${apiKey}&feedtype=json&ver=1.0`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const latestSol = data.sol_keys[data.sol_keys.length - 1];
        const latestData = data[latestSol];
  
        const weatherInfo = `
          <p>Sol ${latestSol}</p>
          <p>Atmospheric Temperature (°F): ${latestData.AT.av}</p>
          <p>Horizontal Wind Speed (mph): ${latestData.HWS.av}</p>
          <p>Pressure (Pa): ${latestData.PRE.av}</p>
          <p>Season: ${latestData.Season}</p>
        `;
  
        const weatherInfoContainer = document.getElementById("weather-info");
        weatherInfoContainer.innerHTML = weatherInfo;
      })
      .catch(error => console.log(error));
  }
    //call api on page load
    window.onload = function() {
    getMarsWeather();
  }
  
  //ISS Location 
  fetch('http://api.open-notify.org/iss-now.json')
  .then(response => response.json())
  .then(data => {
    const location = data.iss_position;
    const latitude = location.latitude;
    const longitude = location.longitude;

    const locationText = `Latitude: ${latitude}, Longitude: ${longitude}`;
    document.getElementById('location').textContent = locationText;
  })
  .catch(error => console.error(error));

  //Leaflet Map
// Define the map
var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([-0.09, 51.505]),
    zoom: 13
  })
});

// Add a marker to the map
var marker = new ol.Feature({
  geometry: new ol.geom.Point(
    ol.proj.fromLonLat([longitude, latitude])
  ),
});

var vectorSource = new ol.source.Vector({
  features: [marker]
});

var markerVectorLayer = new ol.layer.Vector({
  source: vectorSource,
});

map.addLayer(markerVectorLayer);
