export interface CityWeather {
  dt: number,
  weather: WeatherDescription[],
  main: TemperatureInfo[]
}

interface TemperatureInfo {
  feels_like: number,
  grnd_level: number,
  humidity: number,
  pressure: number,
  sea_level: number,
  temp: number,
  temp_kf: number,
  temp_max: number,
  temp_min: number
}

interface WeatherDescription {
  id: number
  main: string
  description: string,
  icon: string
}
