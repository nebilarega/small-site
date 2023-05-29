import React from "react";
import { Canvas } from "@react-three/fiber";
import Model from "./Model";

export const Organize = () => {
  return (
    <div></div>
    <Canvas>
      <pointLight position={[10, 10, 10]} />
      <Model />
    </Canvas>
  );
};
