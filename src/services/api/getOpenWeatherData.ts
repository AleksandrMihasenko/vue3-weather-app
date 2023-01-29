import axios from 'axios';
import { CityWeather } from '@/types/CityWeather';
import { LocationCoordinates } from '@/types/LocationInfo';

const openWeatherApiKey = import.meta.env.VITE_APP_OPEN_WEATHER_API_KEY;

export async function getWeeklyWeather(query: LocationCoordinates): Promise<CityWeather[]> {
  return await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${query.lat}&lon=${query.lng}&appid=${openWeatherApiKey}&units=metric`
  )
  .then((data) => data.data)
  .catch(error => console.log(error));
}

export async function getHourlyWeather(query: LocationCoordinates): Promise<CityWeather[]> {
  return await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${query.lat}&lon=${query.lng}&appid=${openWeatherApiKey}&units=metric`
  )
  .then((data) => data.data.list)
  .catch(error => {
    return { message: error.message };
  });
}
