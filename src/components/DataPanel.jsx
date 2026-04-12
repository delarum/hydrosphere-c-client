export default function DataPanel({ location, data }) {
  return (
    <div className="panel">
      <h1>{location}</h1>
      <div className="grid">
        <div>Pollution: {data.pollution}%</div>
        <div>pH: {data.ph}</div>
        <div>Temp: {data.temp}°C</div>
        <div>Turbidity: {data.turbidity} NTU</div>
        <div>Oxygen: {data.oxygen} mg/L</div>
        <div className={`status ${data.status}`}>
          {data.status}
        </div>
      </div>
    </div>
  );
}