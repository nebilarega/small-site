import React, { Dispatch, SetStateAction, useEffect } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

interface ModelProps {
  modelPath: string;
  modelType: string;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
export const Model: React.FC<ModelProps> = ({
  modelPath,
  modelType,
  setIsLoading,
}) => {
  useEffect(() => {
    setIsLoading(true); // Reset the loading state on component mount
  }, []);
  //@ts-ignore
  const gltf = useLoader(GLTFLoader, modelPath);
  useEffect(() => {
    setIsLoading(false); // Reset the loading state on component mount
  }, [gltf]);
  gltf.scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      // child.receiveShadow = true;
    }
  });
  // gltf.scene.position.z = 0.5;
  gltf.scene.position.y = -0.7;
  if (modelType === "extraExtraLarge") {
    gltf.scene.position.y = -1.4;
  } else if (modelType === "small") {
    gltf.scene.position.z = 0.5;
  }
  // else if (modelType === "extraExtraLarge") {
  //   gltf.scene.position.y = -0.4;
  else if (modelType === "large") {
    gltf.scene.position.y = -0.95;
    gltf.scene.position.z = 0.5;
  } else if (
    modelType === "extraLarge" ||
    modelType === "medium" ||
    modelType === "extraSmall"
  ) {
    gltf.scene.position.z = 0.5;
  }
  if (modelType === "extraLarge") {
    gltf.scene.position.y = -0.8;
  }
  return (
    <mesh castShadow receiveShadow>
      <primitive object={gltf.scene} />
    </mesh>
  );
};
