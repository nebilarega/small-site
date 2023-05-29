import React, { useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Model } from "./Model";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Environment } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";

export const NonCanvas = () => {
  const bboxMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
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

  const handleClick = (event: THREE.Event) => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const int_obj = intersects[0].object;
      if (int_obj.name !== "floor") {
        // createBoundingBox(int_obj);
        createBoundingBoxHelper(int_obj, 0x000000, 0.2);
        console.log(int_obj);
      }
    }
  };

  function createBoundingBox(object: THREE.Object3D) {
    const bbox = new THREE.Box3().setFromObject(object);
    const bboxHelper = new THREE.Box3Helper(bbox, new THREE.Color(0x000000));
    bboxHelper.visible = true; // Set initial visibility to false
    object.userData.boundingBox = bboxHelper; // Store the bounding box helper in object's user data
    scene.add(bboxHelper);
  }

  function createBoundingBoxHelper(
    object: THREE.Object3D,
    color: number | string,
    thickness: number
  ) {
    const box = new THREE.Box3().setFromObject(object);

    const vertices = [
      box.min, // Vertex 0
      new THREE.Vector3(box.min.x, box.min.y, box.max.z), // Vertex 1
      new THREE.Vector3(box.min.x, box.max.y, box.max.z), // Vertex 2
      new THREE.Vector3(box.min.x, box.max.y, box.min.z), // Vertex 3
      new THREE.Vector3(box.max.x, box.min.y, box.min.z), // Vertex 4
      new THREE.Vector3(box.max.x, box.min.y, box.max.z), // Vertex 5
      box.max, // Vertex 6
      new THREE.Vector3(box.max.x, box.max.y, box.min.z), // Vertex 7
    ];

    const edges = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0], // Bottom edges
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 4], // Top edges
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7], // Vertical edges
    ];

    const geometry = new THREE.BufferGeometry();
    const verticesArray = new Float32Array(edges.length * 2 * 3);

    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i];
      const vertex1 = vertices[edge[0]];
      const vertex2 = vertices[edge[1]];

      verticesArray[i * 6 + 0] = vertex1.x;
      verticesArray[i * 6 + 1] = vertex1.y;
      verticesArray[i * 6 + 2] = vertex1.z;
      verticesArray[i * 6 + 3] = vertex2.x;
      verticesArray[i * 6 + 4] = vertex2.y;
      verticesArray[i * 6 + 5] = vertex2.z;
    }

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(verticesArray, 3)
    );

    const material = new THREE.LineBasicMaterial({
      color,
      linewidth: thickness,
    });
    const lines = new THREE.LineSegments(geometry, material);

    scene.add(lines);
  }
  useEffect(() => {
    gl.domElement.addEventListener("pointerup", handleClick);

    return () => {
      gl.domElement.removeEventListener("pointerup", handleClick);
    };
  }, [gl]);

  return (
    <mesh
      position={[0, -1, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      castShadow
      receiveShadow
      name="floor"
    >
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial
        // color={0x000000}
        side={THREE.DoubleSide}
        map={diffuseMap}
        alphaMap={map}
        roughness={1}
        // roughnessMap={roughnessMap}
        // metalness={1}
        // metalnessMap={metalic}
        // normalMap={normalMap}
      />
    </mesh>
  );
};
