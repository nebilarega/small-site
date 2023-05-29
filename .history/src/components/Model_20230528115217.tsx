import React from "react";
import { useState, useEffect, useRef } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function Model(props: any) {
  //@ts-ignore
  // const { nodes, materials } = useGLTF("/RMinefFinal.glb");
  const gltf = useLoader(GLTFLoader, "/RMinefFinal.glb");
  return (
    <mesh position={[0, 0, 2]} rotation={[0, -Math.PI / 2, 0]}>
      <primitive object={gltf.scene} />
    </mesh>
  );
}
