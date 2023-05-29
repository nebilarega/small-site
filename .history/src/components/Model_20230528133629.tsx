import React from "react";
import { useState, useEffect, useRef } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function Model(props: any) {
  //@ts-ignore
  // const { nodes, materials } = useGLTF("/RMinefFinal.glb");
  const gltf = useLoader(GLTFLoader, "/RMineRotated.glb");
  return (
    <mesh position={[0, 0, 2.4]} castShadow receiveShadow>
      <primitive object={gltf.scene} />
    </mesh>
  );
}
