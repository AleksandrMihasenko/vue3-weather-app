import axios from 'axios';
import { LocationQueryValue } from 'vue-router';
import { CityWeather } from '@/types/CityWeather';

const openWeatherApiKey = import.meta.env.VITE_APP_OPEN_WEATHER_API_KEY;

export async function getHourlyWeather(
  lat: LocationQueryValue | LocationQueryValue[],
  lng: LocationQueryValue | LocationQueryValue[]
): Promise<CityWeather[]> {
  return await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${openWeatherApiKey}&units=metric`
  )
  .then((data) => data.data.list)
  .catch(error => {
    return { message: error.message };
  });
}
