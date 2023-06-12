import React from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { Model } from "./Model";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Environment } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";

export const Organize = () => {
  const metalic = useLoader(
    TextureLoader,
    "/gold_metallic.bd511176e5d174d2e0c7.jpg"
  );
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas>
        <OrbitControls />
        <ambientLight />
        <directionalLight position={[0, 2, 0]} />
        <Environment
          files={"./enviroment.674b683b6702c9423a03.hdr"}
          background
        />
        <Model position={[0, 0, 2]} rotation={[0, -Math.PI / 2, 0]} />
        <mesh
          position={[0, -1, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
          receiveShadow
        >
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial
            // color={0x000000}
            side={THREE.DoubleSide}
            map={}
          />
        </mesh>
      </Canvas>
    </div>
  );
};