import React, { useState, useEffect } from 'react';
import './WeatherPage.css';

const WeatherPage = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeatherData = async (location) => {
    setLoading(true);
    setError('');
    try {
      // Substitua pela chamada real à sua API
      const response = await fetch(`/api/weather?city=${location}`);
      const data = await response.json();
      
      if (response.ok) {
        setWeatherData(data);
      } else {
        setError(data.message || 'Erro ao buscar dados do clima');
      }
    } catch (err) {
      setError('Falha na conexão com o servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeatherData(city);
    }
  };

  // Efeito para buscar clima da localização atual (opcional)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherData(`${position.coords.latitude},${position.coords.longitude}`);
        },
        (err) => {
          console.error("Erro ao obter localização:", err);
          // Pode buscar uma cidade padrão aqui
        }
      );
    }
  }, []);

  return (
    <div className="weather-container">
      <h1>Previsão do Tempo</h1>
      
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Digite uma cidade..."
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {weatherData && (
        <div className="weather-card">
          <div className="weather-header">
            <h2>{weatherData.location.name}, {weatherData.location.country}</h2>
            <p>{new Date(weatherData.location.localtime).toLocaleDateString()}</p>
          </div>
          
          <div className="weather-main">
            <div className="temperature">
              <img 
                src={`https:${weatherData.current.condition.icon}`} 
                alt={weatherData.current.condition.text} 
              />
              <span>{weatherData.current.temp_c}°C</span>
            </div>
            <p className="condition">{weatherData.current.condition.text}</p>
          </div>
          
          <div className="weather-details">
            <div className="detail-item">
              <span>Sensação Térmica</span>
              <span>{weatherData.current.feelslike_c}°C</span>
            </div>
            <div className="detail-item">
              <span>Umidade</span>
              <span>{weatherData.current.humidity}%</span>
            </div>
            <div className="detail-item">
              <span>Vento</span>
              <span>{weatherData.current.wind_kph} km/h</span>
            </div>
            <div className="detail-item">
              <span>Pressão</span>
              <span>{weatherData.current.pressure_mb} hPa</span>
            </div>
          </div>
          
          {/* Previsão para os próximos dias (se disponível na API) */}
          {weatherData.forecast && (
            <div className="forecast">
              <h3>Próximos Dias</h3>
              <div className="forecast-days">
                {weatherData.forecast.forecastday.map((day, index) => (
                  <div key={index} className="forecast-day">
                    <p>{new Date(day.date).toLocaleDateString('pt-BR', { weekday: 'short' })}</p>
                    <img src={`https:${day.day.condition.icon}`} alt={day.day.condition.text} />
                    <p>{day.day.maxtemp_c}° / {day.day.mintemp_c}°</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherPage;