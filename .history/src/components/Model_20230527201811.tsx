import React from "react";
import { useState, useEffect, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Model = () => {
  const gltf = useLoader(GLTFLoader, "/Poimandres.gltf");
  return <primitive object={gltf.scene} />;
};

export default Model;
