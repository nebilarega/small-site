import React from "react";
import { Canvas } from "@react-three/fiber";
import { Model } from "./Model";
import { OrbitControls } from "@react-three/drei";
import { Environment } from "@react-three/drei";
import { NonCanvas } from "./NonCanvas";

export const Organize = () => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas>
        {/* <OrbitControls minDistance={0.5} maxDistance={5.1} /> */}
        <directionalLight
          position={[0, 4, 6]}
          args={[0xffffff, 1]}
          castShadow
        />
        <ambientLight />
        <OrbitControls />
        {/* <Environment
          files={"./enviroment.674b683b6702c9423a03.hdr"}
          background
        /> */}
        <Model />
        <NonCanvas />
      </Canvas>
    </div>
  );
};
