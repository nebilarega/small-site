import React from "react";
import { Canvas } from "@react-three/fiber";
import { Model } from "./Model";
import { Environment } from "@react-three/drei";
import { NonCanvas } from "./NonCanvas";
import * as THREE from "three";

export const Organize = () => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      {/** @ts-ignore */}
      <Canvas shadows={true} shadowMapType={THREE.PCFSoftShadowMap}>
        {/* <OrbitControls minDistance={0.5} maxDistance={5.1} /> */}
        <fog attach="fog" args={["#ffffff", 0, 20]} />
        <ambientLight />

        {/* <Environment
          files={"./enviroment.674b683b6702c9423a03.hdr"}
          background
        /> */}
        <Model />
        <NonCanvas />
        <button type="submit">Click</button>
      </Canvas>
    </div>
  );
};