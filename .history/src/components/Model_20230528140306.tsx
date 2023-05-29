import React from "react";
import * as THREE from "three";
import { useLoader, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function Model(props: any) {
  //@ts-ignore
  // const { nodes, materials } = useGLTF("/RMinefFinal.glb");
  const gltf = useLoader(GLTFLoader, "/RMineRotated.glb");
  gltf.scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  return (
    <mesh position={[0, 0, 2.4]} castShadow receiveShadow>
      <primitive object={gltf.scene} />
    </mesh>
  );
}
