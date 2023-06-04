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
  // removeExistingBoundingBox(scene);
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
  const boxCenter = new THREE.Vector3();
  box.getCenter(boxCenter);
  const textureLoader = new THREE.TextureLoader();

  const vertices = [
    box.min, // Vertex 0
    new THREE.Vector3(box.min.x, box.min.y, box.max.z), // Vertex 1
    new THREE.Vector3(box.max.x, box.min.y, box.max.z), // Vertex 2
    new THREE.Vector3(box.max.x, box.min.y, box.min.z), // Vertex 3
    new THREE.Vector3(box.min.x, box.max.y, box.min.z), // Vertex 4
    new THREE.Vector3(box.min.x, box.max.y, box.max.z), // Vertex 5
    box.max, // Vertex 6
    new THREE.Vector3(box.max.x, box.max.y, box.min.z), // Vertex 7
  ];

  if (type) {
    const twelveInch = textureLoader.load("/15 inches.png");
    const fifteenInch = textureLoader.load("/12 inches.png");
    const eighteenInch = textureLoader.load("/18 inches.png");

    const planeGeometry = new THREE.PlaneGeometry(0.3, 0.08);

    const twelvePlane = new THREE.Mesh(
      planeGeometry.clone(),
      new THREE.MeshStandardMaterial({
        map: twelveInch,
        side: THREE.DoubleSide,
        depthTest: false,
      })
    );
    const fifteenPlane = new THREE.Mesh(
      planeGeometry.clone(),
      new THREE.MeshStandardMaterial({
        map: fifteenInch,
        side: THREE.DoubleSide,
        depthTest: false,
      })
    );
    const eighteenPlane = new THREE.Mesh(
      planeGeometry.clone(),
      new THREE.MeshStandardMaterial({
        map: eighteenInch,
        side: THREE.DoubleSide,
        depthTest: false,
      })
    );

    const twelvePosition = new THREE.Vector3();
    twelvePosition
      .addVectors(box.min, new THREE.Vector3(box.max.x, box.min.y, box.min.z))
      .multiplyScalar(0.5)
      .add(new THREE.Vector3(0, 0.08 / 2));

    const fifteenPosition = new THREE.Vector3();
    fifteenPosition
      .addVectors(
        new THREE.Vector3(box.max.x, box.min.y, box.min.z),
        new THREE.Vector3(box.max.x, box.min.y, box.max.z)
      )
      .multiplyScalar(0.5)
      .add(new THREE.Vector3(0, 0.08 / 2));
    const eighteenPosition = new THREE.Vector3();
    eighteenPosition.copy(boxCenter);

    twelvePlane.position.copy(twelvePosition);
    fifteenPlane.position.copy(fifteenPosition);
    fifteenPlane.rotateY(-Math.PI / 2);
    eighteenPlane.position.copy(eighteenPosition);
    eighteenPlane.rotateY(-Math.PI / 4);

    const infoGroup = new THREE.Group();
    infoGroup.name = "informationGroup";
    infoGroup.add(twelvePlane, fifteenPlane, eighteenPlane);
    scene.add(infoGroup);
  }
  const top = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
  ];

  const bottom = [
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 4],
  ];

  const side1 = [
    [0, 1],
    [1, 5],
    [5, 4],
    [4, 0],
  ];

  const side2 = [
    [2, 6],
    [6, 7],
    [7, 3],
    [3, 2],
  ];

  const lineMaterial = new LineMaterial({
    linewidth: 0.002, // in world units with size attenuation, pixels otherwise
    wireframe: false,
    color: color as number,
    depthTest: false,
    dashed: false,
  });

  const topArray = new Float32Array(top.length * 2 * 3);
  const bottomArray = new Float32Array(top.length * 2 * 3);
  const side1Array = new Float32Array(top.length * 2 * 3);
  const side2Array = new Float32Array(top.length * 2 * 3);
  for (let i = 0; i < top.length; i++) {
    const top_ = top[i];
    const vertex1 = vertices[top_[0]];
    const vertex2 = vertices[top_[1]];

    topArray[i * 6 + 0] = vertex1.x;
    topArray[i * 6 + 1] = vertex1.y;
    topArray[i * 6 + 2] = vertex1.z;
    topArray[i * 6 + 3] = vertex2.x;
    topArray[i * 6 + 4] = vertex2.y;
    topArray[i * 6 + 5] = vertex2.z;
  }
  for (let i = 0; i < top.length; i++) {
    const bottom_ = bottom[i];
    const vertex1 = vertices[bottom_[0]];
    const vertex2 = vertices[bottom_[1]];

    bottomArray[i * 6 + 0] = vertex1.x;
    bottomArray[i * 6 + 1] = vertex1.y;
    bottomArray[i * 6 + 2] = vertex1.z;
    bottomArray[i * 6 + 3] = vertex2.x;
    bottomArray[i * 6 + 4] = vertex2.y;
    bottomArray[i * 6 + 5] = vertex2.z;
  }
  for (let i = 0; i < side1.length; i++) {
    const side1_ = side1[i];
    const vertex1 = vertices[side1_[0]];
    const vertex2 = vertices[side1_[1]];

    side1Array[i * 6 + 0] = vertex1.x;
    side1Array[i * 6 + 1] = vertex1.y;
    side1Array[i * 6 + 2] = vertex1.z;
    side1Array[i * 6 + 3] = vertex2.x;
    side1Array[i * 6 + 4] = vertex2.y;
    side1Array[i * 6 + 5] = vertex2.z;
  }

  for (let i = 0; i < side2.length; i++) {
    const side2_ = side2[i];
    const vertex1 = vertices[side2_[0]];
    const vertex2 = vertices[side2_[1]];

    side2Array[i * 6 + 0] = vertex1.x;
    side2Array[i * 6 + 1] = vertex1.y;
    side2Array[i * 6 + 2] = vertex1.z;
    side2Array[i * 6 + 3] = vertex2.x;
    side2Array[i * 6 + 4] = vertex2.y;
    side2Array[i * 6 + 5] = vertex2.z;
  }

  const topGeometry = new LineGeometry();
  const bottomGeometry = new LineGeometry();
  const side1Geometry = new LineGeometry();
  const side2Geometry = new LineGeometry();

  topGeometry.setPositions(topArray);
  bottomGeometry.setPositions(bottomArray);
  side1Geometry.setPositions(side1Array);
  side2Geometry.setPositions(side2Array);

  const topLine = new Line2(topGeometry, lineMaterial);
  const bottomLine = new Line2(bottomGeometry, lineMaterial);
  const side1Line = new Line2(side1Geometry, lineMaterial);
  const side2Line = new Line2(side2Geometry, lineMaterial);

  const boundingBox = new THREE.Group();
  boundingBox.add(topLine, side1Line, bottomLine, side2Line);
  boundingBox.name = "boundingBox";

  scene.add(boundingBox);
}

export function removeExistingBoundingBox(scene: THREE.Scene) {
  const existingBoundingBox = scene.getObjectByName("boundingBox");
  const existingInformation = scene.getObjectByName("informationGroup");
  if (existingBoundingBox) {
    scene.remove(existingBoundingBox);
  }
  if (existingInformation) {
    scene.remove(existingInformation);
  }
}
