import React, { Ref, RefObject, useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Model } from "./Model";
import { OrbitControls, useHelper } from "@react-three/drei";
import * as THREE from "three";
import { Environment } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { createBoundingBoxHelper } from "../utils/utils";
import { collections } from "../assets/collections";

export const NonCanvas = () => {
  const lightRef = useRef<THREE.DirectionalLight>(null);
  //@ts-ignore
  useHelper(lightRef.current, THREE.DirectionalLightHelper, "red");
  //   useFrame(() => {
  //     // Rotate the light or perform other animations
  //     if (lightRef.current) {
  //       lightRef.current.rotation.x += 0.001;
  //       //   lightRef.current.rotation.y += 0.01;
  //     }
  //   });
  useEffect(() => {
    if (lightRef.current) {
      lightRef.current.lookAt(0, 0, 0);
    }
  }, []);

  const repeatX = 100;
  const repeatY = 100;
  const diffuseMap = useLoader(
    TextureLoader,
    "/gold_diffuse.9518ece6829ad2910cf3.jpg"
  );
  const map = useLoader(
    TextureLoader,
    "/floor_texture_tiles.a670558a303d44de40da.jpg"
  );
  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(repeatX, repeatY); // Adjust the repeat values as needed
  const metalic = useLoader(
    TextureLoader,
    "/gold_metallic.bd511176e5d174d2e0c7.jpg"
  );
  metalic.wrapS = metalic.wrapT = THREE.RepeatWrapping;
  metalic.repeat.set(repeatX, repeatY);
  const normalMap = useLoader(
    TextureLoader,
    "/gold_normal.ab9edd48fea5bb9b5e96.jpg"
  );
  normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.set(repeatX, repeatY);
  const roughnessMap = useLoader(
    TextureLoader,
    "/gold_roughness.86d280ca1c35de33b5c4.jpg"
  );
  roughnessMap.wrapS = roughnessMap.wrapT = THREE.RepeatWrapping;
  roughnessMap.repeat.set(repeatX, repeatY);

  const { camera, scene, raycaster, mouse, gl } = useThree();

  useEffect(() => {
    camera.position.x = 0.7;
  }, []);

  const handleClick = (event: THREE.Event) => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const int_obj = intersects[0].object;
      if (int_obj.name !== "floor") {
        createBoundingBoxHelper(int_obj, 0x000000, 1, scene);
        console.log(int_obj);
      }
    }
  };

  let isDomDragged = false;
  const handleDomClick = (event: Event) => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (!isDomDragged) {
      //   const enableOrbitControl =
      //     intersects.length === 0 ||
      //     !intersects.some((intersect) => intersect.object.type === "Mesh");

      if (intersects.length > 0) {
        const int_obj = intersects[0].object;
        if (!["Stand", "Barb"].includes(int_obj.name)) {
          // createBoundingBox(int_obj);
          if (int_obj.parent) {
            createBoundingBoxHelper(int_obj.parent, 0x000000, 1, scene);
          }
        }
      }
    } else {
      event.stopPropagation();
      if (intersects.length > 0) {
        const int_obj = intersects[0].object;
        if (!["Stand", "Barb"].includes(int_obj.name)) {
          // createBoundingBox(int_obj);
          const parent = int_obj.parent;
          if (parent) {
            const collectionName = Object.keys(collections).find((value) =>
              parent.name.includes(value)
            );
            if (collectionName) {
              const value =
                collections[collectionName as keyof typeof collections];
              value.forEach((groupName) => {
                const obj = scene.getObjectByName(groupName);
                // obj?.position.set(1, 0, 0);
                console.log(obj?.getWorldPosition(new THREE.Vector3()));
              });
            }
          }
        }
      }
      isDomDragged = false;
    }
  };
  const handleDomDragStart = (event: Event) => {
    isDomDragged = false;
  };
  const handleDomDragEnd = (event: Event) => {
    isDomDragged = true;
  };

  useEffect(() => {
    gl.domElement.addEventListener("mousedown", handleDomDragStart);
    gl.domElement.addEventListener("mousemove", handleDomDragEnd);
    gl.domElement.addEventListener("click", handleDomClick);

    return () => {
      gl.domElement.removeEventListener("mousedown", handleDomDragStart);
      gl.domElement.removeEventListener("mousemove", handleDomDragEnd);
      gl.domElement.removeEventListener("click", handleDomClick);
    };
  }, [gl]);

  return (
    <group>
      <directionalLight
        ref={lightRef}
        position={[-3, 3, 6]}
        args={[0xffffff, 1]}
        castShadow
      />
      {lightRef.current && (
        <directionalLightHelper
          args={[lightRef.current as THREE.DirectionalLight, 2, 0xff0000]}
        />
      )}
      <mesh
        position={[0, -0.8, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        castShadow={true}
        receiveShadow={true}
        name="floor"
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial
          side={THREE.DoubleSide}
          roughnessMap={roughnessMap}
          metalness={1}
          metalnessMap={metalic}
          normalMap={normalMap}
        />
      </mesh>
    </group>
  );
};
