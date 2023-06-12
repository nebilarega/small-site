import React from "react";
import { Canvas, useThree } from "@react-three/fiber";
import Model from "./Model";

export const Organize = () => {
  const { scene, camera, gl } = useThree();
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas>
        <camera position={[0, 0, 2]} />
        <pointLight position={[10, 10, 10]} />
        <Model />
      </Canvas>
    </div>
  );
};