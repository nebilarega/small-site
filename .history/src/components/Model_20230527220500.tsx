import React from "react";
import { useState, useEffect, useRef } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export function Model(props: any) {
  //@ts-ignore
  // const { nodes, materials } = useGLTF("/RMinefFinal.glb");
  const gltf = useLoader(GLTFLoader, "/RMinefFinal.glb");
  return <primitive object={gltf.scene} />;
}
