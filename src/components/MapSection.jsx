import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

const riverPath = [
  [-1.2921, 36.8219],
  [-1.2900, 36.8300],
  [-1.2850, 36.8400],
  [-1.2800, 36.8500],
  [-1.2750, 36.8600],
];

const trackers = [
  { id: 1, position: [-1.2921, 36.8219], status: "High Pollution" },
  { id: 2, position: [-1.2850, 36.8400], status: "Moderate" },
  { id: 3, position: [-1.2750, 36.8600], status: "Clean" },
];

const heatData = [
  [-1.2921, 36.8219, 0.9],
  [-1.2900, 36.8300, 0.7],
  [-1.2850, 36.8400, 0.8],
  [-1.2800, 36.8500, 0.6],
  [-1.2750, 36.8600, 0.4],
];

const HeatLayer = () => {
  const map = window._leaflet_map;

  useEffect(() => {
    if (!map) return;

    const heat = L.heatLayer(heatData, {
      radius: 25,
      blur: 20,
      maxZoom: 17,
    }).addTo(map);

    return () => map.removeLayer(heat);
  }, [map]);

  return null;
};

const MapSection = () => {
  return (
    <div className="map-section">
      <MapContainer
        center={[-1.286389, 36.817223]}
        zoom={13}
        className="map-container"
        whenCreated={(map) => (window._leaflet_map = map)}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* River Path */}
        <Polyline
          positions={riverPath}
          pathOptions={{
            color: "#0af",
            weight: 5,
            opacity: 0.8,
          }}
        />

        {/* Trackers */}
        {trackers.map((tracker) => (
          <Marker key={tracker.id} position={tracker.position}>
            <Popup>{tracker.status}</Popup>
          </Marker>
        ))}

        <HeatLayer />
      </MapContainer>

      {/* Floating Dashboard */}
      <div className="map-dashboard">
        <h3>🌊 Live River Stats</h3>
        <div className="stat">
          <span>Pollution Level</span>
          <strong>72%</strong>
        </div>
        <div className="stat">
          <span>Active Sensors</span>
          <strong>12</strong>
        </div>
        <div className="stat">
          <span>Water Quality</span>
          <strong>Moderate</strong>
        </div>
      </div>
    </div>
  );
};

export default MapSection;