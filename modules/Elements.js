import Http from "./Http";
import proxyHandler from "./Proxy.js";
import WeatherData from "./Weather_Data.js";

class Elements {
	constructor() {
		this.searchButton = document.querySelector("button");
		this.searchCity = document.querySelector("#city");
		this.loadingText = document.querySelector("#load");
		this.weatherBox = document.querySelector("#weather");
		this.weatherCity = this.weatherBox.firstElementChild;
		this.weatherDescription = document.querySelector("#weatherDescription");
		this.weatherTemperature = this.weatherBox.lastElementChild;
		this.appID = "29df9d66bf4a561534889da82bb068cd";
		this.city();
	}

	city() {
		this.searchButton.addEventListener("click", () => {
			const cityName = this.searchCity.value.trim();
			if (cityName) {
				this.loadingText.style.display = "block";
				this.weatherBox.style.display = "none";
				const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${
					this.appID
				}`;
				Http.fetchData(URL)
					.then(response => {
						const weatherData = new WeatherData(
							cityName,
							response.weather[0].description.toUpperCase()
						);
						const weatherProxy = new Proxy(
							weatherData,
							proxyHandler
						);
						weatherProxy.temperature = response.main.temp;
						this.updateWeather(weatherProxy);
					})
					.catch(error => alert(error));
			} else {
				return alert("Please enter a city name");
			}
		});
	}

	updateWeather(weatherData) {
		this.weatherCity.textContent = weatherData.cityName;
		this.weatherDescription.textContent = weatherData.description;
		this.weatherTemperature.textContent = weatherData.temperature;
		this.loadingText.style.display = "none";
		this.weatherBox.style.display = "block";
	}
}

export default Elements;
