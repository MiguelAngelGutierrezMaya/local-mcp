import { GeocodingResult, WeatherData } from './interfaces.js';

// External urls
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

export const getWeather = async (city: string) => {
  if (!city) {
    throw new Error('City is required');
  }

  // Obtener las coordenadas geográficas de la ciudad
  const geocodingUrl = `${GEOCODING_URL}?name=${encodeURIComponent(
    city
  )}&count=10&language=en&format=json`;

  const response = await fetch(geocodingUrl);
  const data = (await response.json()) as GeocodingResult;

  if (!data.results || data.results.length === 0) {
    return {
      content: [
        {
          type: 'text',
          text: `Data for ${city} not found`,
        },
      ],
    };
  }

  const { latitude, longitude } = data.results[0];

  // Obtener los datos del clima usando las coordenadas
  const weatherUrl = `${WEATHER_URL}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current=temperature_2m,precipitation,is_day,rain&timezone=auto&forecast_days=1`;

  const weatherResponse = await fetch(weatherUrl);
  return (await weatherResponse.json()) as WeatherData;
};
