import * as THREE from "three";
import { Line2 } from "three/examples/jsm/lines/Line2";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";
// import { dataMap } from "../assets/data/largeData";

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

export function hideBlocks(block_id: string, scene: THREE.Scene, dataMap: any) {
  if (block_id.includes("SC_1")) {
    const block = [
      "SC_11",
      "SC_12",
      "SC_13",
      "SC_14",
      "SC_15",
      "SC_16",
      "SC_17",
    ];
    block.forEach((cell_id) => {
      const cell =
        dataMap.collections[cell_id as keyof typeof dataMap.collections];
      if (cell) {
        cell.forEach((cell_block: any) => {
          const cell_block_ = scene.getObjectByName(cell_block);
          if (cell_block_) {
            cell_block_.visible = false;
          }
        });
      }
    });
  } else if (block_id.includes("SC_2")) {
    const block = [
      "SC_21",
      "SC_22",
      "SC_23",
      "SC_24",
      "SC_25",
      "SC_26",
      "SC_27",
    ];
    block.forEach((cell_id) => {
      const cell =
        dataMap.collections[cell_id as keyof typeof dataMap.collections];
      if (cell) {
        cell.forEach((cell_block: any) => {
          const cell_block_ = scene.getObjectByName(cell_block);
          if (cell_block_) {
            cell_block_.visible = false;
          }
        });
      }
    });
  }
}

export function viewBlocks(scene: THREE.Scene, dataMap: any) {
  // maybe inefficeint
  const block = [
    "SC_21",
    "SC_22",
    "SC_23",
    "SC_24",
    "SC_25",
    "SC_26",
    "SC_27",
    "SC_11",
    "SC_12",
    "SC_13",
    "SC_14",
    "SC_15",
    "SC_16",
    "SC_17",
    // "SC_14",
  ];
  block.forEach((cell_id) => {
    const cell =
      dataMap.collections[cell_id as keyof typeof dataMap.collections];
    if (cell) {
      cell.forEach((cell_block: any) => {
        const cell_block_ = scene.getObjectByName(cell_block);
        if (cell_block_) {
          cell_block_.visible = true;
        }
      });
    }
  });
}

export function createBoundingBoxHelper(
  object: THREE.Object3D,
  color: number | string,
  thickness: number,
  scene: THREE.Scene,
  dataMap: any,
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
    const widthInch = textureLoader.load(dataMap.sizeInfo.width);
    const heightInch = textureLoader.load(dataMap.sizeInfo.height);
    const breadthInch = textureLoader.load(dataMap.sizeInfo.breadth);

    const planeGeometry = new THREE.PlaneGeometry(0.3, 0.08);

    const widthPlane = new THREE.Mesh(
      planeGeometry.clone(),
      new THREE.MeshStandardMaterial({
        map: widthInch,
        side: THREE.DoubleSide,
        depthTest: false,
      })
    );
    const heightPlane = new THREE.Mesh(
      planeGeometry.clone(),
      new THREE.MeshStandardMaterial({
        map: heightInch,
        side: THREE.DoubleSide,
        depthTest: false,
      })
    );
    const breadthPlane = new THREE.Mesh(
      planeGeometry.clone(),
      new THREE.MeshStandardMaterial({
        map: breadthInch,
        side: THREE.DoubleSide,
        depthTest: false,
      })
    );

    const widthPosition = new THREE.Vector3();
    widthPosition
      .addVectors(box.min, new THREE.Vector3(box.max.x, box.min.y, box.min.z))
      .multiplyScalar(0.5)
      .add(new THREE.Vector3(0, 0.08 / 2));

    const breadthPosition = new THREE.Vector3();
    breadthPosition
      .addVectors(
        new THREE.Vector3(box.max.x, box.min.y, box.min.z),
        new THREE.Vector3(box.max.x, box.min.y, box.max.z)
      )
      .multiplyScalar(0.5)
      .add(new THREE.Vector3(0, 0.08 / 2));
    const heightPosition = new THREE.Vector3();
    heightPosition.copy(
      new THREE.Vector3(boxCenter.x, boxCenter.y + 0.05, boxCenter.z)
    );

    widthPlane.position.copy(widthPosition);
    heightPlane.position.copy(heightPosition);
    heightPlane.rotateY(-Math.PI / 4);
    breadthPlane.position.copy(breadthPosition);
    breadthPlane.rotateY(-Math.PI / 2);

    const infoGroup = new THREE.Group();
    infoGroup.name = "informationGroup";
    infoGroup.add(widthPlane, heightPlane, breadthPlane);
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
