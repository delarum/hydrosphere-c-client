import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const getColor = (status) => {
  switch (status) {
    case "CLEAN": return "#00ffcc";
    case "STABLE": return "#00c3ff";
    case "WARNING": return "#ffcc00";
    case "CRITICAL": return "#ff3b3b";
    default: return "#00c3ff";
  }
};

export default function Tracker3D({ status }) {
  const group = useRef();
  const pulse = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    group.current.rotation.y += 0.003;
    group.current.position.y = Math.sin(t) * 0.1;

    const scale = 1 + Math.sin(t * 2) * 0.3;
    pulse.current.scale.set(scale, scale, scale);
  });

  const color = getColor(status);

  return (
    <group ref={group}>

      {/* BODY */}
      <mesh>
        <cylinderGeometry args={[0.5, 0.5, 2.2, 64]} />
        <meshStandardMaterial color="#0f3b3f" metalness={0.9} />
      </mesh>

      {/* CORE GLOW */}
      <mesh>
        <cylinderGeometry args={[0.3, 0.3, 1.6, 64]} />
        <meshStandardMaterial emissive={color} emissiveIntensity={2} color="#111" />
      </mesh>

      {/* ANTENNA */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.8, 16]} />
        <meshStandardMaterial color="#c1d9de" />
      </mesh>

      {/* PULSE RING */}
      <mesh ref={pulse} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.6, 0.8, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>

    </group>
  );
}