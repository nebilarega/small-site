import React, { Dispatch, SetStateAction, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Model } from "./Model";
import { Environment } from "@react-three/drei";
import { NonCanvas } from "./NonCanvas";
import * as THREE from "three";
import styles from "../css/styles.css";

export const Organize = () => {
  const [closeVisible, setCloseVisible] = useState(false);
  const [closeClicked, setCloseClicked] = useState(false);
  return (
    <div className={styles.main__container}>
      {/** @ts-ignore */}
      <Canvas shadows={true} shadowMapType={THREE.PCFSoftShadowMap}>
        {/* <OrbitControls minDistance={0.5} maxDistance={5.1} /> */}
        <fog attach="fog" args={["#ffffff", 0, 20]} />
        <ambientLight />

        {/* <Environment
          files={"./enviroment.674b683b6702c9423a03.hdr"}
          background
        /> */}
        <Model />
        <NonCanvas
          setCloseVisible={setCloseVisible}
          closeClicked={closeClicked}
          setCloseClicked={setCloseClicked}
        />
      </Canvas>
      {closeVisible && (
        <CloseButton
          setCloseClicked={setCloseClicked}
          setCloseVisible={setCloseVisible}
        />
      )}
    </div>
  );
};

interface Props {
  setCloseClicked: Dispatch<SetStateAction<boolean>>;
  setCloseVisible: Dispatch<SetStateAction<boolean>>;
}
const CloseButton: React.FC<Props> = ({ setCloseClicked, setCloseVisible }) => {
  return (
    <div className="close__button">
      <button
        type="submit"
        onClick={() => {
          setCloseClicked(true);
          setCloseVisible(false);
        }}
      >
        X
      </button>
    </div>
  );
};

const TransformationButtons = () => {};

const ViewButtons = () => {};
