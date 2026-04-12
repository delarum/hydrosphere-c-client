import React from 'react'
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Html } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";

const trackerDataSets = [
  [
    {
      location: "Westlands",
      pollution: 42,
      ph: 6.8,
      condition: "Moderate",
      nextTreatment: "Filtration - 2h",
      temperature: 24,
      turbidity: 18,
      visibility: 65,
      bio: "Low algae"
    },
    {
      location: "Kamukunji",
      pollution: 60,
      ph: 6.2,
      condition: "Poor",
      nextTreatment: "Chemical - 1h",
      temperature: 26,
      turbidity: 25,
      visibility: 50,
      bio: "Algae bloom"
    },
    {
      location: "Embakasi",
      pollution: 35,
      ph: 7.1,
      condition: "Good",
      nextTreatment: "None",
      temperature: 23,
      turbidity: 12,
      visibility: 75,
      bio: "Healthy"
    },
    {
      location: "Starehe",
      pollution: 50,
      ph: 6.5,
      condition: "Moderate",
      nextTreatment: "Filtration",
      temperature: 25,
      turbidity: 20,
      visibility: 60,
      bio: "Moderate algae"
    },
    {
      location: "Kasarani",
      pollution: 45,
      ph: 6.9,
      condition: "Stable",
      nextTreatment: "Monitoring",
      temperature: 24,
      turbidity: 15,
      visibility: 70,
      bio: "Balanced"
    }
  ],
  [
    {
      location: "Westlands",
      pollution: 55,
      ph: 6.3,
      condition: "Poor",
      nextTreatment: "Urgent Clean",
      temperature: 27,
      turbidity: 28,
      visibility: 45,
      bio: "Algae spike"
    },
    {
      location: "Kamukunji",
      pollution: 48,
      ph: 6.7,
      condition: "Moderate",
      nextTreatment: "Filtration",
      temperature: 25,
      turbidity: 19,
      visibility: 58,
      bio: "Improving"
    },
    {
      location: "Embakasi",
      pollution: 30,
      ph: 7.2,
      condition: "Good",
      nextTreatment: "None",
      temperature: 22,
      turbidity: 10,
      visibility: 80,
      bio: "Healthy"
    },
    {
      location: "Starehe",
      pollution: 58,
      ph: 6.4,
      condition: "Poor",
      nextTreatment: "Chemical",
      temperature: 26,
      turbidity: 24,
      visibility: 52,
      bio: "Algae growth"
    },
    {
      location: "Kasarani",
      pollution: 40,
      ph: 7.0,
      condition: "Stable",
      nextTreatment: "Monitoring",
      temperature: 24,
      turbidity: 14,
      visibility: 72,
      bio: "Balanced"
    }
  ]
];


function Tracker3D({data}) {
  return (
    <Float speed={2} rotationIntensity={1}>
      <mesh rotation={[0.3, 0.4, 0]}>
        <boxGeometry args={[2.5, 2.5, 2.5]} />
        <meshStandardMaterial color="#297376" metalness={0.6} roughness={0.2} />

        <Html center>
          <div className="tracker-ui">
            <h2>{data.location}</h2>

            <div className="grid">
              <span>Pollution: {data.pollution}%</span>
              <span>pH: {data.ph}</span>
              <span>Temp: {data.temperature}°C</span>
              <span>Turbidity: {data.turbidity}</span>
              <span>Visibility: {data.visibility}%</span>
              <span>Bio: {data.bio}</span>
            </div>

            <p className="status">{data.condition}</p>
            <small>{data.nextTreatment}</small>
          </div>
        </Html>
      </mesh>
    </Float>
  );
}

export default function Trackers() {
  const [setIndex, setSetIndex] = useState(0);
  const [trackerIndex, setTrackerIndex] = useState(0);

  useEffect(() => {
    const interval1 = setInterval(() => {
      setTrackerIndex((prev) => (prev + 1) % 5);
    }, 5000);

    const interval2 = setInterval(() => {
      setSetIndex((prev) => (prev + 1) % 2);
    }, 9000);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, []);

  const current = trackerDataSets[setIndex][trackerIndex];

  return (
    <div className="trackers-page">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 3]} />

        <Tracker3D data={current} />

        <OrbitControls enableZoom={false} />
      </Canvas>

      <AnimatePresence>
        <motion.div
          key={current.location}
          className="location-label"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {current.location}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

