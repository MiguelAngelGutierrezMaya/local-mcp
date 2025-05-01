// Tipos para mejorar la legibilidad y mantenibilidad
export interface WeatherData {
  latitude: number;
  longitude: number;
  timezone: string;
  current: {
    temperature_2m: number;
    precipitation: number;
    is_day: number;
    rain: number;
  };
}

export interface GeocodingResult {
  results?: Array<{
    latitude: number;
    longitude: number;
    name: string;
  }>;
}
