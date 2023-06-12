import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useHelper } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { OrbitControls } from "@react-three/drei";
import TWEEN from "@tweenjs/tween.js";
import {
  createBoundingBoxHelper,
  hideBlocks,
  removeExistingBoundingBox,
  viewBlocks,
} from "../utils/utils";
import { collections, maps } from "../assets/data";

interface Props {
  setCloseVisible: Dispatch<SetStateAction<boolean>>;
  setCloseClicked: Dispatch<SetStateAction<boolean>>;
  closeClicked: boolean;
  transformState:
    | null
    | "clockwise"
    | "counterclockwise"
    | "zoomin"
    | "zoomout";
  setTransformState: Dispatch<
    SetStateAction<
      null | "clockwise" | "counterclockwise" | "zoomin" | "zoomout"
    >
  >;
  viewButtonState: "front" | "top" | "left" | "bird";
  setViewButtonState: Dispatch<
    SetStateAction<"front" | "top" | "left" | "bird">
  >;
}

export const NonCanvas: React.FC<Props> = ({
  setCloseVisible,
  closeClicked,
  setCloseClicked,
  transformState,
  setTransformState,
  viewButtonState,
  setViewButtonState,
}) => {
  const lightRef = useRef<THREE.DirectionalLight>(null);
  //@ts-ignore
  useHelper(lightRef.current, THREE.DirectionalLightHelper, "red");
  useFrame(() => {
    TWEEN.update();
  });
  useEffect(() => {
    if (lightRef.current) {
      //   lightRef.current.lookAt(0, 0, 2.4);
      lightRef.current.shadow.camera.left = -10;
      lightRef.current.shadow.camera.right = 10;
      lightRef.current.shadow.camera.top = 10;
      lightRef.current.shadow.camera.bottom = -10;
      lightRef.current.shadow.camera.updateProjectionMatrix();
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

  const { camera, scene, raycaster, mouse, gl, size } = useThree();
  const previousMousePosition = useRef<[number, number]>([mouse.x, mouse.y]);
  const originalPosition = useRef(camera.position.clone());
  const originalRotation = useRef(camera.rotation.clone());
  const originalFOV = useRef((camera as THREE.PerspectiveCamera).fov);
  const currentObject = useRef<THREE.Object3D | null>(null);

  const resetCamera = () => {
    new TWEEN.Tween(camera.position)
      .to(originalPosition.current, 500) // Set the duration of the animation in milliseconds
      .easing(TWEEN.Easing.Quadratic.InOut) // Set the easing function for the animation
      //   .onUpdate(() => {
      //     camera.position.copy(startPosition);
      //     camera.lookAt(intersects[0].point);
      //   })
      .start();
    //   camera.position.copy(originalPosition.current);
    new TWEEN.Tween(camera.rotation)
      .to(
        {
          x: originalRotation.current.x,
          y: originalRotation.current.y,
          z: originalRotation.current.z,
        },
        1000
      )
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();

    // camera.rotation.copy(originalRotation.current);
    (camera as THREE.PerspectiveCamera).fov = originalFOV.current;
    camera.updateProjectionMatrix();
  };

  useEffect(() => {
    if (closeClicked) {
      resetCamera();
      removeExistingBoundingBox(scene);
      setCloseClicked(false);
      viewBlocks(scene);
    }
  }, [closeClicked]);

  const cameraRotation = (state: "clockwise" | "counterclockwise") => {
    const cameraPosition = camera.position.clone();
    const spherical = new THREE.Spherical().setFromVector3(cameraPosition);
    const scale = state === "clockwise" ? -0.4 : 0.4;
    spherical.theta -= scale;
    spherical.phi += 0;
    const targetPosition = new THREE.Vector3().setFromSpherical(spherical);
    // spherical.phi = Math.max(0, Math.min(Math.PI, spherical.phi));
    new TWEEN.Tween(camera.position);
    // .to(
    //   { x: targetPosition.x, y: targetPosition.y, z: targetPosition.z },
    //   100
    // )
    // .easing(TWEEN.Easing.Linear.None)
    // .start();

    camera.position.setFromSpherical(spherical);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
  };

  useEffect(() => {
    if (transformState) {
      switch (transformState) {
        case "zoomin":
          if ((camera as THREE.PerspectiveCamera).fov > 15)
            (camera as THREE.PerspectiveCamera).fov -= 5;
          break;
        case "zoomout":
          if ((camera as THREE.PerspectiveCamera).fov < 75)
            (camera as THREE.PerspectiveCamera).fov += 5;
          break;
        case "clockwise":
          cameraRotation("clockwise");
          break;
        case "counterclockwise":
          cameraRotation("counterclockwise");
          break;
      }
      setTransformState(null);
    }
  }, [transformState]);

  useEffect(() => {
    if (viewButtonState) {
      setCloseVisible(false);
      switch (viewButtonState) {
        case "front":
          resetCamera();
          new TWEEN.Tween(camera.position)
            .to(new THREE.Vector3(0, 0, 3), 1000) // Set the duration of the animation in milliseconds
            .easing(TWEEN.Easing.Quadratic.InOut) // Set the easing function for the animation
            //   .onUpdate(() => {
            //     camera.position.copy(startPosition);
            //     camera.lookAt(intersects[0].point);
            //   })
            .start();
          camera.rotation.copy(new THREE.Euler(0, 0, 0));
          break;
        case "top":
          resetCamera();
          new TWEEN.Tween(camera.position)
            .to(new THREE.Vector3(0, 4, 0), 1000) // Set the duration of the animation in milliseconds
            .easing(TWEEN.Easing.Quadratic.InOut) // Set the easing function for the animation
            //   .onUpdate(() => {
            //     camera.position.copy(startPosition);
            //     camera.lookAt(intersects[0].point);
            //   })
            .start();
          new TWEEN.Tween(camera.rotation)
            .to({ x: -Math.PI / 2, y: 0, z: 0 }, 1000)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start();
          // .onUpdate(() => {
          //   camera.rotation.x = oldRot.x;
          //   camera.rotation.y = oldRot.y;
          //   camera.rotation.z = oldRot.z;
          // });
          // camera.rotation.copy(new THREE.Euler(-Math.PI / 2, 0, 0));
          break;
        case "left":
          resetCamera();
          new TWEEN.Tween(camera.position)
            .to(new THREE.Vector3(-3.4, 0, 0), 1000) // Set the duration of the animation in milliseconds
            .easing(TWEEN.Easing.Quadratic.InOut) // Set the easing function for the animation
            //   .onUpdate(() => {
            //     camera.position.copy(startPosition);
            //     camera.lookAt(intersects[0].point);
            //   })
            .start();
          new TWEEN.Tween(camera.rotation)
            .to({ x: 0, y: -Math.PI / 2, z: 0 }, 1000)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start();
          break;
        case "bird":
        default:
          new TWEEN.Tween(camera.position)
            .to(originalPosition.current, 1000) // Set the duration of the animation in milliseconds
            .easing(TWEEN.Easing.Quadratic.InOut) // Set the easing function for the animation
            //   .onUpdate(() => {
            //     camera.position.copy(startPosition);
            //     camera.lookAt(intersects[0].point);
            //   })
            .start();
          //   camera.position.copy(originalPosition.current);
          new TWEEN.Tween(camera.rotation)
            .to(
              {
                x: originalRotation.current.x,
                y: originalRotation.current.y,
                z: originalRotation.current.z,
              },
              1000
            )
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start();
          (camera as THREE.PerspectiveCamera).fov = originalFOV.current;
          camera.updateProjectionMatrix();
      }
    }
  }, [viewButtonState]);

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
            createBoundingBoxHelper(
              int_obj.parent,
              0xff0000,
              1,
              scene,
              "clicked"
            );
            if (int_obj.parent.name.includes("SC_2")) {
              hideBlocks("SC_1", scene);
            }
            if (int_obj.parent.name.includes("SC_3")) {
              hideBlocks("SC_1", scene);
              hideBlocks("SC_2", scene);
            }
            // createBoundingBox(int_obj.parent, 0xff0000, scene);
            // camera.lookAt(
            //   int_obj.parent.position.add(
            //     new THREE.Vector3(mouse.x, mouse.y, 0)
            //   )
            // );
            const startPosition = camera.position.clone();
            const endPosition = intersects[0].point
              .clone()
              .add(new THREE.Vector3(-1.5, 0, 2));

            // Create a Tween for the camera's position
            new TWEEN.Tween(startPosition)
              .to(endPosition, 1000) // Set the duration of the animation in milliseconds
              .easing(TWEEN.Easing.Quadratic.InOut) // Set the easing function for the animation
              .onUpdate(() => {
                camera.position.copy(startPosition);
                camera.lookAt(intersects[0].point);
              })
              .start();

            (camera as THREE.PerspectiveCamera).fov = 25;
            // camera.position.set(-1, 1, 3);
            setCloseVisible(true);
            camera.updateProjectionMatrix();
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
  const handleMouseDown = (event: Event) => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
      currentObject.current = intersects[0].object;
    }
    isDomDragged = false;
    isMovable = true;
    previousMousePosition.current = [mouse.x, mouse.y];
    const cursor = document.getElementById("content__container");
    if (cursor) cursor!.style.cursor = "pointer";
  };
  const handleMouseMove = (event: MouseEvent) => {
    isDomDragged = true;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (isMovable) {
      removeExistingBoundingBox(scene);
      if (
        currentObject.current &&
        !["Stand", "Barb", "floor"].includes(currentObject.current.name)
      ) {
        const int_obj = currentObject.current;
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
            const pointIntersect =
              intersects.length > 0 && intersects[0].point.x;
            if (
              mapVal.position &&
              (mapVal.position.x < mapVal.max ||
                mapVal.position.x > mapVal.min) &&
              pointIntersect
            ) {
              value.forEach((groupName) => {
                const obj = scene.getObjectByName(groupName);
                if (obj?.position) {
                  if (
                    pointIntersect > obj.position.x &&
                    mapVal.position.x < mapVal.max
                  ) {
                    if (mapVal.left) {
                      const left = maps[mapVal.left as keyof typeof maps];
                      left.max = obj.position.x - 0.48;
                    }
                    obj.position.x = pointIntersect;
                  } else if (
                    pointIntersect < obj.position.x &&
                    mapVal.position.x > mapVal.min
                  ) {
                    if (mapVal.right) {
                      const right = maps[mapVal.right as keyof typeof maps];
                      right.min = obj.position.x + 0.49;
                    }
                    obj.position.x = pointIntersect;
                  }
                  // if (obj.position.x >= mapVal.max)
                  //   obj.position.x = pointIntersect;
                }
              });
              mapVal.position.x = pointIntersect;
              // if (mapVal.right) {
              //   if (mapVal.max <= pointIntersect){

              //   }
              // }

              // if (mapVal.left) {
              //   const left = maps[mapVal.left as keyof typeof maps];
              //   left.max += 0.02;
              // }
            }
          }
        }
      } else if (
        intersects.length === 0 ||
        (currentObject.current &&
          ["floor"].includes(currentObject.current.name))
      ) {
        // camera.rotation.y -= event.movementX * 0.001 * 10;
        // camera.rotation.x -= event.movementY * 0.001 * 10;
        // camera.position.x = -5 * Math.sin(-event.clientX * 0.1);
        // camera.position.z = -5 * Math.cos(-event.clientX * 0.1);
        // camera.lookAt(new THREE.Vector3(0, 0, 0));
        const [prevX, prevY] = previousMousePosition.current;
        const cameraPosition = camera.position.clone();
        const cameraRadius = cameraPosition.length();
        const spherical = new THREE.Spherical().setFromVector3(cameraPosition);
        spherical.theta -= (mouse.x - prevX) * 1.5;
        spherical.phi += (mouse.y - prevY) * 1.5;

        spherical.phi = Math.max(0, Math.min(Math.PI / 2, spherical.phi));

        camera.position.setFromSpherical(spherical);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        previousMousePosition.current = [mouse.x, mouse.y];
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
    currentObject.current = null;
    const cursor = document.getElementById("content__container");
    if (cursor) cursor!.style.cursor = "default";
  };

  useEffect(() => {
    gl.domElement.addEventListener("mousedown", handleMouseDown);
    gl.domElement.addEventListener("mousemove", handleMouseMove);
    gl.domElement.addEventListener("mouseup", handleMouseUp);
    gl.domElement.addEventListener("click", handleDomClick);

    return () => {
      gl.domElement.removeEventListener("mousedown", handleMouseDown);
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
    </group>
  );
};
