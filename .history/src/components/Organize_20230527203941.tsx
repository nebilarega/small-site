import React from "react";
import { Canvas } from "@react-three/fiber";
import { Model } from "./Model";
import { OrbitControls } from "@react-three/drei";

export const Organize = () => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas>
        <OrbitControls />
        <ambientLight />
        <directionalLight />
        <Model position={[0, 0, 2]} rotation={[0, -Math.PI / 2, 0]} />
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color={0xffffff} />
        </mesh>
      </Canvas>
    </div>
  );
};