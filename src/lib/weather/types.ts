export type WeatherLabelKey =
  | "sunny"
  | "mainlySunny"
  | "partlyCloudy"
  | "overcast"
  | "foggy"
  | "drizzle"
  | "rain"
  | "snow"
  | "thunderstorm";

export interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export interface CurrentWeather {
  temperature: number;
  weatherCode: number;
}

export interface DailyForecast {
  /** ISO date string "YYYY-MM-DD" */
  date: string;
  weatherCode: number;
  maxTemp: number;
  minTemp: number;
}

export interface WeatherData {
  current: CurrentWeather;
  /** Today + next 2 days (3 entries total) */
  daily: DailyForecast[];
}

export interface WeatherInfo {
  svgPath: string;
  label: string;
}

/** All weather-related labels, keyed by WeatherLabelKey */
export type WeatherLabels = Record<WeatherLabelKey, string>;

export interface WeatherTranslations extends WeatherLabels {
  liveFrom: string;
  selectLocation: string;
  today: string;
  tomorrow: string;
  loading: string;
  error: string;
  retry: string;
  locationSuffix: string;
  /** Day names Sun–Sat (index 0 = Sunday) */
  days: string[];
}
