import type { Location, WeatherData } from "./types";

const OPEN_METEO_BASE = "https://api.open-meteo.com/v1/forecast";

/** In-memory session cache: location id → WeatherData */
const cache = new Map<string, WeatherData>();

interface RawOpenMeteoResponse {
  current: {
    temperature_2m: number;
    weather_code: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

function buildUrl(location: Location): string {
  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current: "temperature_2m,weather_code",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    forecast_days: "4",
    timezone: "Europe/Rome",
  });
  return `${OPEN_METEO_BASE}?${params.toString()}`;
}

function parseResponse(raw: RawOpenMeteoResponse): WeatherData {
  return {
    current: {
      temperature: Math.round(raw.current.temperature_2m),
      weatherCode: raw.current.weather_code,
    },
    // daily[0] = today, daily[1] = tomorrow, daily[2] = day after → 3 forecast cards
    daily: raw.daily.time.slice(0, 3).map((date, i) => ({
      date,
      weatherCode: raw.daily.weather_code[i],
      maxTemp: Math.round(raw.daily.temperature_2m_max[i]),
      minTemp: Math.round(raw.daily.temperature_2m_min[i]),
    })),
  };
}

/**
 * Fetches weather data for the given location.
 * Returns cached data on subsequent calls within the same browser session.
 * Throws on network/HTTP errors.
 */
export async function fetchWeather(location: Location): Promise<WeatherData> {
  const cached = cache.get(location.id);
  if (cached) return cached;

  const response = await fetch(buildUrl(location));
  if (!response.ok) {
    throw new Error(
      `Weather API error ${response.status}: ${response.statusText}`,
    );
  }

  const raw = (await response.json()) as RawOpenMeteoResponse;
  const data = parseResponse(raw);

  cache.set(location.id, data);
  return data;
}
