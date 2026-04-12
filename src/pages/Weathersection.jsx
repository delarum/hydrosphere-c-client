// client/src/components/WeatherSection.jsx
import React, { useState, useEffect, useCallback } from 'react';
import '../styles/weathersection.css';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';

const LOCATIONS = [
  { name: 'Westlands',  lat: -1.2667, lon: 36.8000 },
  { name: 'Kamkunji',   lat: -1.2833, lon: 36.8500 },
  { name: 'Embakasi',   lat: -1.3167, lon: 36.8833 },
  { name: 'Starehe',    lat: -1.2833, lon: 36.8167 },
  { name: 'Kasarani',   lat: -1.2167, lon: 36.8833 },
];

const EAT_OFFSET = 3; // UTC+3

const WMO_CODES = {
  0:  { label: 'Clear sky',        icon: '☀️' },
  1:  { label: 'Mainly clear',     icon: '🌤️' },
  2:  { label: 'Partly cloudy',    icon: '⛅' },
  3:  { label: 'Overcast',         icon: '☁️' },
  45: { label: 'Foggy',            icon: '🌫️' },
  48: { label: 'Icy fog',          icon: '🌫️' },
  51: { label: 'Light drizzle',    icon: '🌦️' },
  53: { label: 'Drizzle',          icon: '🌦️' },
  55: { label: 'Heavy drizzle',    icon: '🌧️' },
  61: { label: 'Light rain',       icon: '🌧️' },
  63: { label: 'Rain',             icon: '🌧️' },
  65: { label: 'Heavy rain',       icon: '🌧️' },
  71: { label: 'Light snow',       icon: '🌨️' },
  73: { label: 'Snow',             icon: '❄️' },
  75: { label: 'Heavy snow',       icon: '❄️' },
  80: { label: 'Rain showers',     icon: '🌦️' },
  81: { label: 'Showers',          icon: '🌧️' },
  82: { label: 'Violent showers',  icon: '⛈️' },
  95: { label: 'Thunderstorm',     icon: '⛈️' },
  99: { label: 'Hail storm',       icon: '⛈️' },
};

const getWeatherMeta = (code) =>
  WMO_CODES[code] || { label: 'Unknown', icon: '🌡️' };

const getEATTime = () => {
  const now = new Date();
  const eat = new Date(now.getTime() + EAT_OFFSET * 3600 * 1000);
  return eat.toISOString().replace('T', ' ').slice(0, 19) + ' EAT';
};

const getUVLevel = (uv) => {
  if (uv <= 2)  return { label: 'Low',       color: '#27500A' };
  if (uv <= 5)  return { label: 'Moderate',  color: '#854F0B' };
  if (uv <= 7)  return { label: 'High',      color: '#993C1D' };
  if (uv <= 10) return { label: 'Very High', color: '#A32D2D' };
  return               { label: 'Extreme',   color: '#501313' };
};

const fetchWeather = async ({ lat, lon }) => {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,` +
    `weather_code,uv_index,apparent_temperature,precipitation` +
    `&wind_speed_unit=kmh&timezone=Africa%2FNairobi`;
  const res  = await fetch(url);
  const data = await res.json();
  return data.current;
};

export default function WeatherSection() {
  const [weather, setWeather]       = useState({});
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState('');
  const [active, setActive]         = useState(null);
  const [lastUpdated, setLastUpdated] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const loadAll = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    setError('');
    try {
      const results = await Promise.all(
        LOCATIONS.map(async (loc) => {
          const data = await fetchWeather(loc);
          return { name: loc.name, data };
        })
      );
      const map = {};
      results.forEach(({ name, data }) => { map[name] = data; });
      setWeather(map);
      setLastUpdated(getEATTime());
      if (!active) setActive(LOCATIONS[0].name);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
    const interval = setInterval(() => loadAll(true), 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [loadAll]);

  const activeData = active && weather[active];
  const activeMeta = activeData ? getWeatherMeta(activeData.weather_code) : null;

  return (
    <>
    <Navbar />
    <section className="weather-section">
      <div className="weather-container">

        {/* Header */}
        <div className="weather-header">
          <div className="weather-header-text">
            <span className="weather-eyebrow">
              <span className="weather-dot" />
              Live Environmental Data
            </span>
            <h2>Nairobi Weather <span>Monitoring</span></h2>
            <p>
              Real-time atmospheric conditions across HYDROS-C tracker locations.
              Weather conditions influence water pollution spread, oxygen levels,
              and ecosystem recovery in the Nairobi River Basin.
            </p>
          </div>
          <div className="weather-meta-row">
            {lastUpdated && (
              <span className="weather-updated">
                <span className="updated-dot" />
                Updated {lastUpdated}
              </span>
            )}
            <button
              className={`weather-refresh-btn ${refreshing ? 'spinning' : ''}`}
              onClick={() => loadAll(true)}
              disabled={refreshing}
              aria-label="Refresh weather data"
            >
              ↻
            </button>
          </div>
        </div>

        {/* Location tabs */}
        <div className="weather-tabs">
          {LOCATIONS.map((loc) => {
            const d = weather[loc.name];
            const meta = d ? getWeatherMeta(d.weather_code) : null;
            return (
              <button
                key={loc.name}
                className={`weather-tab ${active === loc.name ? 'active' : ''}`}
                onClick={() => setActive(loc.name)}
              >
                {meta && <span className="tab-icon" style={{ fontSize: 16 }}>{meta.icon}</span>}
                <span className="tab-name">{loc.name}</span>
                {d && (
                  <span className="tab-temp">{Math.round(d.temperature_2m)}°</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        {loading && (
          <div className="weather-loading">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="weather-skeleton" />
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="weather-error">
            <span>⚠️</span>
            <p>{error}</p>
            <button onClick={() => loadAll()}>Try again</button>
          </div>
        )}

        {!loading && !error && activeData && (
          <div className="weather-detail">

            {/* Hero card */}
            <div className="weather-hero-card">
              <div className="hero-left">
                <span className="hero-icon" style={{ fontSize: 16 }}>
                  {activeMeta.icon}
                </span>
                <div>
                  <div className="hero-temp">
                    {Math.round(activeData.temperature_2m)}
                    <span className="hero-unit">°C</span>
                  </div>
                  <div className="hero-label">{activeMeta.label}</div>
                  <div className="hero-feels">
                    Feels like {Math.round(activeData.apparent_temperature)}°C
                  </div>
                </div>
              </div>
              <div className="hero-location">
                <span className="hero-pin">📍</span>
                <span>{active}</span>
                <span className="hero-sublabel">Nairobi, Kenya</span>
              </div>
            </div>

            {/* Stats grid */}
            <div className="weather-stats">
              <div className="weather-stat">
                <div className="stat-icon">💨</div>
                <div className="stat-body">
                  <div className="stat-value">{Math.round(activeData.wind_speed_10m)} km/h</div>
                  <div className="stat-label">Wind speed</div>
                </div>
              </div>
              <div className="weather-stat">
                <div className="stat-icon">🧭</div>
                <div className="stat-body">
                  <div className="stat-value">{Math.round(activeData.wind_direction_10m)}°</div>
                  <div className="stat-label">Wind direction</div>
                </div>
              </div>
              <div className="weather-stat">
                <div className="stat-icon">💧</div>
                <div className="stat-body">
                  <div className="stat-value">{Math.round(activeData.relative_humidity_2m)}%</div>
                  <div className="stat-label">Humidity</div>
                </div>
              </div>
              <div className="weather-stat">
                <div className="stat-icon">🌂</div>
                <div className="stat-body">
                  <div className="stat-value">{activeData.precipitation.toFixed(1)} mm</div>
                  <div className="stat-label">Precipitation</div>
                </div>
              </div>
              <div className="weather-stat">
                <div className="stat-icon">☀️</div>
                <div className="stat-body">
                  <div
                    className="stat-value"
                    style={{ color: getUVLevel(activeData.uv_index).color }}
                  >
                    {activeData.uv_index.toFixed(1)}
                    <span className="stat-badge" style={{
                      background: getUVLevel(activeData.uv_index).color + '18',
                      color: getUVLevel(activeData.uv_index).color,
                    }}>
                      {getUVLevel(activeData.uv_index).label}
                    </span>
                  </div>
                  <div className="stat-label">UV index</div>
                </div>
              </div>
            </div>

            {/* All locations mini grid */}
            <div className="weather-all-label">All locations</div>
            <div className="weather-grid">
              {LOCATIONS.map((loc) => {
                const d = weather[loc.name];
                if (!d) return null;
                const meta = getWeatherMeta(d.weather_code);
                const isActive = active === loc.name;
                return (
                  <button
                    key={loc.name}
                    className={`weather-card ${isActive ? 'weather-card--active' : ''}`}
                    onClick={() => setActive(loc.name)}
                  >
                    <div className="card-top">
                      <span className="card-name">{loc.name}</span>
                      <span className="card-weather-icon" style={{ fontSize: 16 }}>
                        {meta.icon}
                      </span>
                    </div>
                    <div className="card-temp">{Math.round(d.temperature_2m)}°C</div>
                    <div className="card-condition">{meta.label}</div>
                    <div className="card-stats">
                      <span>💨 {Math.round(d.wind_speed_10m)} km/h</span>
                      <span>💧 {Math.round(d.relative_humidity_2m)}%</span>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>
        )}

      </div>
    </section>
    <Footer />
    </>
  );
}
