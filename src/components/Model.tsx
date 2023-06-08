import React from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function Model(props: any) {
  //@ts-ignore
  const gltf = useLoader(GLTFLoader, "/models/RLarge2.glb");
  gltf.scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  gltf.scene.position.set(0, 0, 0.5);
  return (
    <mesh castShadow receiveShadow>
      <primitive object={gltf.scene} />
    </mesh>
  );
}
