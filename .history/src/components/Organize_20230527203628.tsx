import React from "react";
import { Canvas } from "@react-three/fiber";
import { Model } from "./Model";
import { OrbitControls } from "@react-three/drei";

export const Organize = () => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas>
        <camera position={[0, 0, 2]} />
        <OrbitControls />

        {/* <pointLight position={[10, 10, 10]} /> */}
        <ambientLight />
        <directionalLight />
        <Model position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
      </Canvas>
    </div>
  );
};
