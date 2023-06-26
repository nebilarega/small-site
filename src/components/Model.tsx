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
  // gltf.scene.position.z = 0.5;
  gltf.scene.position.y = -0.7;
  if (modelType === "extraExtraLarge") {
    gltf.scene.position.y = -1.1;
  } else if (modelType === "small") {
    gltf.scene.position.z = 0.5;
  }
  // else if (modelType === "extraExtraLarge") {
  //   gltf.scene.position.y = -0.4;
  else if (modelType === "large") {
    gltf.scene.position.y = -0.65;
  }
  return (
    <mesh castShadow receiveShadow>
      <primitive object={gltf.scene} />
    </mesh>
  );
};
