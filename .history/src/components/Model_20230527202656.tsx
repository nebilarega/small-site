import React from "react";
import { useState, useEffect, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Model = () => {
  const { scene, camera, gl } = useThree();
  const gltf = useLoader(GLTFLoader, "/RMinefFinal.glb");
  return <primitive object={gltf.scene} />;
};

export default Model;
