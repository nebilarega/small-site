import React from "react";
import { Canvas } from "@react-three/fiber";
import { Model } from "./Model";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
export const Organize = () => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas>
        <OrbitControls />
        <ambientLight />
        <directionalLight position={[0, 2, 0]} />
        <hemisphereLight />
        <Model position={[0, 0, 2]} rotation={[0, -Math.PI / 2, 0]} />
        <mesh position={[0, -1, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color={0x000000} side={THREE.DoubleSide} />
        </mesh>
      </Canvas>
    </div>
  );
};