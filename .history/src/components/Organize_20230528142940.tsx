import React from "react";
import { Canvas } from "@react-three/fiber";
import { Model } from "./Model";
import { OrbitControls } from "@react-three/drei";
import { Environment } from "@react-three/drei";
import { NonCanvas } from "./NonCanvas";
import * as THREE from "three";

export const Organize = () => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      {/** @ts-ignore */}
      <Canvas shadows={true}>
        {/* <OrbitControls minDistance={0.5} maxDistance={5.1} /> */}
        <ambientLight />
        <OrbitControls />
        <Environment
          files={"./enviroment.674b683b6702c9423a03.hdr"}
          background
        />
        <Model />
        <NonCanvas />
      </Canvas>
    </div>
  );
};
