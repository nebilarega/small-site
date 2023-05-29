import React, { useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Model } from "./Model";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Environment } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { NonCanvas } from "./NonCanvas";

export const Organize = () => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas>
        <OrbitControls minDistance={0.5} maxDistance={5.1} />
        <ambientLight />
        <directionalLight position={[0, 2, 0]} />
        <Environment
          files={"./enviroment.674b683b6702c9423a03.hdr"}
          background
        />
        <Model position={[0, 0, 2]} rotation={[0, -Math.PI / 2, 0]} />
        <NonCanvas />
      </Canvas>
    </div>
  );
};
