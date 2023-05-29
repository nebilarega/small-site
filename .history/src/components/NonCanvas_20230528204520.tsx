import React, { useEffect, useRef, useState } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { useHelper } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { OrbitControls } from "@react-three/drei";
import {
  createBoundingBoxHelper,
  removeExistingBoundingBox,
} from "../utils/utils";
import { collections, maps } from "../assets/data";

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
      //   lightRef.current.lookAt(0, 0, 2.4);
      lightRef.current.shadow.camera.left = -10;
      lightRef.current.shadow.camera.right = 10;
      lightRef.current.shadow.camera.top = 10;
      lightRef.current.shadow.camera.bottom = -10;
      lightRef.current.shadow.camera.updateProjectionMatrix();
      if (camera) {
        (camera as THREE.PerspectiveCamera).fov = 25;
      }
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
  const [enableOrbitControl, setEnableOrbitControl] = useState(true);

  useEffect(() => {
    camera.position.x = 0.7;
    camera.position.y = 0.8;
    // @ts-ignore
    camera.fov = 20;
  }, [camera]);

  const handleClick = (event: THREE.Event) => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const int_obj = intersects[0].object;
      if (int_obj.name !== "floor") {
        createBoundingBoxHelper(int_obj, 0x000000, 1, scene);
      }
    }
  };

  let isDomDragged = false;
  let isMovable = false;
  const handleDomClick = (event: Event) => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (!isDomDragged) {
      //   const enableOrbitControl =
      //     intersects.length === 0 ||
      //     !intersects.some((intersect) => intersect.object.type === "Mesh");

      if (intersects.length > 0) {
        const int_obj = intersects[0].object;
        if (
          !["Stand", "Barb", "floor"].includes(int_obj.name) &&
          !int_obj.name.includes("SROL")
        ) {
          // createBoundingBox(int_obj);

          if (
            int_obj.parent &&
            int_obj.parent.name !== "Scene" &&
            int_obj.parent.type !== "Scene"
          ) {
            createBoundingBoxHelper(int_obj.parent, 0xff0000, 1, scene);
            camera.lookAt(new THREE.Vector3(mouse.x, mouse.y, 2));
          }
        } else {
          removeExistingBoundingBox(scene);
        }
      }
    } else {
      event.stopPropagation();

      isDomDragged = false;
    }
  };
  const handleDomDragStart = (event: Event) => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    const enableOrbitControl =
      intersects.length === 0 || intersects[0].object.name === "floor";
    setEnableOrbitControl(enableOrbitControl);
    isDomDragged = false;
    isMovable = true;
  };
  const handleMouseMove = (event: Event) => {
    isDomDragged = true;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    const mouseX = mouse.x;
    if (isMovable) {
      removeExistingBoundingBox(scene);
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

              const mapVal = maps[collectionName as keyof typeof maps];
              if (mapVal.position.x < mapVal.max) {
                value.forEach((groupName) => {
                  const obj = scene.getObjectByName(groupName);
                  console.log(obj?.position);
                  if (obj?.position) {
                    obj.position.x += 0.02;
                  }
                });
                mapVal.position.x += 0.02;
                if (mapVal.left) {
                  const left = maps[mapVal.left as keyof typeof maps];
                  left.max += 0.02;
                }
              }
            }
          }
        }
      }
    } else {
      isMovable = false;
      if (intersects.length > 0) {
        const int_obj = intersects[0].object;
        if (
          !["Stand", "Barb", "floor"].includes(int_obj.name) &&
          !int_obj.name.includes("SROL")
        ) {
          // createBoundingBox(int_obj);

          if (
            int_obj.parent &&
            int_obj.parent.name !== "Scene" &&
            int_obj.parent.type !== "Scene"
          ) {
            createBoundingBoxHelper(int_obj.parent, 0x1a872e, 1, scene);
          }
        } else {
          removeExistingBoundingBox(scene);
        }
      }
    }
  };
  const handleMouseUp = (event: Event) => {
    isMovable = false;
  };

  useEffect(() => {
    gl.domElement.addEventListener("mousedown", handleDomDragStart);
    gl.domElement.addEventListener("mousemove", handleMouseMove);
    gl.domElement.addEventListener("mouseup", handleMouseUp);
    gl.domElement.addEventListener("click", handleDomClick);

    return () => {
      gl.domElement.removeEventListener("mousedown", handleDomDragStart);
      gl.domElement.removeEventListener("mousemove", handleMouseMove);
      gl.domElement.removeEventListener("mouseup", handleMouseUp);
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
      {/* {lightRef.current && (
        <directionalLightHelper
          args={[lightRef.current as THREE.DirectionalLight, 2, 0xff0000]}
        />
      )} */}
      <mesh
        position={[0, -0.9, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        castShadow={true}
        receiveShadow={true}
        name="floor"
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial
          side={THREE.DoubleSide}
          map={diffuseMap}
          alphaMap={map}
          roughnessMap={roughnessMap}
          metalness={1}
          metalnessMap={metalic}
          normalMap={normalMap}
        />
      </mesh>
      <OrbitControls
        enableDamping={false}
        minDistance={1}
        maxDistance={5.1}
        enableRotate={enableOrbitControl}
      />
    </group>
  );
};
