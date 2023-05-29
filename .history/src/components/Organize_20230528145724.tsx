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
      <Canvas shadows={true} shadowMapType={THREE.PCFSoftShadowMap}>
        {/* <OrbitControls minDistance={0.5} maxDistance={5.1} /> */}
        <fog attach="fog" args={["#ffffff", 0, 20]} />
        <ambientLight />
        <pointLight args={["white", 0.5]} position={[0, 0.5, 2]} />
        <OrbitControls enableDamping={false} />
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
