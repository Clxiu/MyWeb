import React, {useEffect, useState} from "react";
import axios from "axios";
import "./WeatherFetcher.css";

const API_KEY = "d5147fcc963f5ff345b99f909923d4ea";

const weatherIcons = {
    clear: "☀️",
    clouds: "☁️",
    rain: "🌧️",
    snow: "❄️",
    thunderstorm: "🌩️",
    drizzle: "🌦️",
    mist: "🌫️",
    wind: "💨",
    unknown: "❔"
};

const WeatherFetcher = ({onWeatherChange}) => {
    const [inputCity, setInputCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);

    // fetch weather data using OpenWeatherMap
    const fetchWeather = async (targetCity) => {
        try {
            const res = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${targetCity}&appid=${API_KEY}&units=metric`
            );
            const main = res.data.weather[0].main.toLowerCase();
            setWeatherData({
                name: res.data.name,
                temp: res.data.main.temp.toFixed(1),
                temp_min: res.data.main.temp_min.toFixed(1),
                temp_max: res.data.main.temp_max.toFixed(1),
                condition: res.data.weather[0].main,
                icon: weatherIcons[main] || weatherIcons.unknown,
            });
            // update parent with current weather
            onWeatherChange(main);
        } catch (err) {
            console.error("Fetch failed:", err);
            setWeatherData(null);
            onWeatherChange("unknown");
        }
    };

    // fetch default weather when mount
    useEffect(() => {
        fetchWeather("Auckland");
    }, []);

    // handle search
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputCity.trim()) {
            fetchWeather(inputCity);
            setInputCity("");
        }
    };

    // random weather
    const handleChangeWeather = () => {
        const weatherKeys = Object.keys(weatherIcons).filter(key => key !== "unknown");
        const randomWeather = weatherKeys[Math.floor(Math.random() * weatherKeys.length)];

        // inform parent, update widget
        onWeatherChange(randomWeather);
        const temp = (-15 + Math.random() * 30).toFixed(1)
        const temp2 = (-10 + Math.random() * 30).toFixed(1)
        setWeatherData({
            name: "My Weather",
            temp: (Math.min(temp, temp2) + Math.random() * Math.abs(temp - temp2)).toFixed(1),
            temp_min: Math.min(temp, temp2),
            temp_max: Math.max(temp, temp2),
            condition: randomWeather.charAt(0).toUpperCase() + randomWeather.slice(1),
            icon: weatherIcons[randomWeather],
        });
    };


    return (
        <div className="weather-widget">
            {weatherData && (
                <div className="weather-info">
                    <div className="weather-header">
                        <h4>{weatherData.name}</h4>
                        <div className="temp-icon">
                            <span className="icon">{weatherData.icon}</span>
                            <span className="temp">{weatherData.temp}°C</span>
                        </div>
                        <p className="min-max">
                            L: {weatherData.temp_min}°C H: {weatherData.temp_max}°C
                        </p>
                    </div>
                </div>
            )}

            <form className="weather-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter city"
                    value={inputCity}
                    onChange={(e) => setInputCity(e.target.value)}
                />
                <button type="submit">Get</button>
            </form>
            <div className="weather-actions">
                <button onClick={handleChangeWeather}>Change the Weather</button>
            </div>
        </div>
    );
};

export default WeatherFetcher;
