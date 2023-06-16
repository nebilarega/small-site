import React from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

interface ModelProps {
  modelPath: string;
  modelType: string;
}
export const Model: React.FC<ModelProps> = ({ modelPath, modelType }) => {
  //@ts-ignore
  const gltf = useLoader(GLTFLoader, modelPath);
  gltf.scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  gltf.scene.position.z = 0.5;
  if (modelType === "extraLarge") {
    gltf.scene.position.y = -0.1;
  } else if (modelType === "extraExtraLarge") {
    gltf.scene.position.y = -0.4;
  }
  return (
    <mesh castShadow receiveShadow>
      <primitive object={gltf.scene} />
    </mesh>
  );
};
