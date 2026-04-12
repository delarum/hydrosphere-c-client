import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import Tracker3D from "../components/Tracker3D";
import DataPanel from "../components/DataPanel";
import { trackers } from "../data/trackersData";
import Navbar from "../components/navbar";
import "../styles/trackers.css";
import Footer from "../components/Footer";

export default function Trackers() {
  const [index, setIndex] = useState(0);
  const [stateIndex, setStateIndex] = useState(0);

  const current = trackers[index];
  const data = current.states[stateIndex];

  // AUTO SWITCH DATA
  useEffect(() => {
    const interval = setInterval(() => {
      setStateIndex((prev) => (prev + 1) % 2);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // AUTO SWITCH LOCATION
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % trackers.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <Navbar />
    <div className="tracker-page">

      <div className="left">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} />
          <Tracker3D status={data.status} />
        </Canvas>
      </div>

      <div className="right">
        <DataPanel location={current.name} data={data} />
      </div>

    </div>
    <Footer />
    </>
  );
}