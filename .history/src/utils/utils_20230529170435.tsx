import * as THREE from "three";
import { Line2 } from "three/examples/jsm/lines/Line2";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";
import { collections } from "../assets/data";

export function createBoundingBox(
  object: THREE.Object3D,
  color: number,
  scene: THREE.Scene
) {
  removeExistingBoundingBox(scene);
  const bbox = new THREE.Box3().setFromObject(object);
  const bboxHelper = new THREE.Box3Helper(bbox, new THREE.Color(color));
  bboxHelper.name = "boundingBox";
  scene.add(bboxHelper);
}
//   function createBoundingBox(
//     object: THREE.Object3D,
//     color: THREE.Color,
//     thickness: number
//   ) {
//     const box = new THREE.Box3().setFromObject(object);

//     const bboxHelper = new THREE.Box3Helper(box, color);
//     bboxHelper.visible = false;
//     bboxHelper.scale.set(1 + thickness, 1 + thickness, 1 + thickness); // Scale the helper

//     return bboxHelper;
//   }

export function createBoundingBoxHelper(
  object: THREE.Object3D,
  color: number | string,
  thickness: number,
  scene: THREE.Scene,
  type?: undefined | "clicked"
) {
  removeExistingBoundingBox(scene);
  const box = new THREE.Box3().setFromObject(object);
  const center = new THREE.Vector3();
  box.getCenter(center);
  const textureLoader = new THREE.TextureLoader();

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

  if (type) {
    const twelveInch = textureLoader.load("/12 inches.png");
    const fifteenInch = textureLoader.load("/15 inches.png");
    const eighteenInch = textureLoader.load("/18 inches.png");

    const planeGeometry = new THREE.PlaneGeometry(0.3, 0.08);

    const twelvePlane = new THREE.Mesh(
      planeGeometry,
      new THREE.MeshStandardMaterial({
        map: twelveInch,
        color: "black",
        depthTest: false,
      })
    );
    const fifteenPlane = new THREE.Mesh(
      planeGeometry,
      new THREE.MeshStandardMaterial({
        map: fifteenInch,
        color: "black",
      })
    );
    const eighteenPlane = new THREE.Mesh(
      planeGeometry,
      new THREE.MeshStandardMaterial({
        map: eighteenInch,
        color: "black",
      })
    );
    const twelvePosition = new THREE.Vector3();
    // twelvePosition.addVectors(
    //   box.min,
    //   new THREE.Vector3(box.max.x, box.min.y, box.min.z).multiplyScalar(0.5)
    // ); // Vertex 0
    twelvePosition.copy(center);

    twelvePlane.position.set(
      twelvePosition.x,
      twelvePosition.y,
      twelvePosition.z
    );
    const fifteenPosition = new THREE.Vector3();
    fifteenPosition.addVectors(
      box.min,
      new THREE.Vector3(box.max.x, box.min.y, box.min.z).multiplyScalar(0.5)
    ); // Vertex 0

    twelvePlane.position.copy(fifteenPosition);
    twelvePlane.rotateY(Math.PI / 2);
    const eighteenPosition = new THREE.Vector3();
    eighteenPosition.addVectors(
      box.max,
      new THREE.Vector3(box.max.x, box.min.y, box.min.z).multiplyScalar(0.5)
    ); // Vertex 0

    twelvePlane.position.copy(eighteenPosition);

    const infoGroup = new THREE.Group();
    infoGroup.name = "informationGroup";
    infoGroup.add(twelvePlane);
    // infoGroup.position.copy(object.position.clone());

    scene.add(infoGroup);
  }

  const edges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 4],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
  ];

  const edge2 = [
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
  ];

  const geometry = new THREE.BufferGeometry();
  const newGeometry = new LineGeometry();
  const verticesArray = new Float32Array(edges.length * 2 * 3);
  const verticesArray2 = new Float32Array(edge2.length * 2 * 3);

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

  newGeometry.setPositions(verticesArray);

  const matLine = new LineMaterial({
    linewidth: 0.002, // in world units with size attenuation, pixels otherwise
    wireframe: false,
    color: color as number,
    depthTest: false,
    //resolution:  // to be set by renderer, eventually
    dashed: false,
  });

  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(verticesArray, 3)
  );

  const material = new THREE.LineBasicMaterial({ color: color });
  const lines = new THREE.LineSegments(geometry, material);

  const line2 = new Line2(newGeometry, matLine);
  line2.name = "boundingBox";

  scene.add(line2);
}

export function removeExistingBoundingBox(scene: THREE.Scene) {
  const existingBoundingBox = scene.getObjectByName("boundingBox");
  const existingInformation = scene.getObjectByName("informationGroup");
  if (existingBoundingBox) {
    scene.remove(existingBoundingBox);
  }
  if (existingInformation) {
    // scene.remove(existingInformation);
  }
}
