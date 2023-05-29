import React from "react";
import { Canvas } from "@react-three/fiber";
import { Model } from "./Model";
import { Environment } from "@react-three/drei";
import { NonCanvas } from "./NonCanvas";
import * as THREE from "three";

export const Organize = () => {
  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
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
      </Canvas>
      <CloseButton />
    </div>
  );
};

const CloseButton = () => {
  return (
    <div
      style={{
        position: "absolute",
        left: "5%",
        top: "5%",
        width: "200px",
        height: "200px",
      }}
    >
      <button
        type="submit"
        style={{
          fontSize: "50px",
          width: "100px",
          aspectRatio: "auto",
          outline: "none",
          border: "none",
          cursor: "pointer",
          padding: "10px 20px 10px 20px",
          borderRadius: "50%",
        }}
      >
        X
      </button>
    </div>
  );
};
